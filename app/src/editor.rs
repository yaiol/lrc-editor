//! The editor's state and every operation on it: the open documents (one tab per song), playback, stamping,
//! line edits, and the file operations. The views only draw this and call it.

use crate::{APP_NAME, APP_VERSION, audio, catalog::LbsToast, i18n, settings::Settings};
use dioxus::prelude::*;
use engine::{
    files,
    launch::{self, Launch},
    lrc::{self, Line, Lrc},
    tags,
};
use std::{
    cell::RefCell,
    collections::HashMap,
    fs,
    path::{Path, PathBuf},
    rc::Rc,
};
use tokio::sync::oneshot;

/// One open song: its lyrics, its audio, its notepad and its undo history.
#[derive(Clone, PartialEq)]
pub struct Doc {
    pub id: u32,
    pub lrc: Lrc,
    pub unsaved: bool,
    pub lrc_path: Option<String>,
    pub media_path: Option<String>,
    pub media_title: Option<String>,
    /// The playhead, kept here only while the tab is not the active one.
    pub position: f64,
    /// The selected line. -1 = none; `lines.len()` = the "end of lyrics" row.
    pub active_line: i32,
    pub notepad: String,
    /// The time the lyrics end at; saved as a trailing empty line. 0 = none.
    pub end_lyrics: f64,
    undo: Vec<Lrc>,
}

fn new_lrc() -> Lrc {
    Lrc { editor: APP_NAME.to_owned(), editor_version: APP_VERSION.to_owned(), ..Default::default() }
}

impl Doc {
    pub fn empty(id: u32) -> Doc {
        Doc {
            id,
            lrc: new_lrc(),
            unsaved: false,
            lrc_path: None,
            media_path: None,
            media_title: None,
            position: 0.0,
            active_line: -1,
            notepad: String::new(),
            end_lyrics: 0.0,
            undo: Vec::new(),
        }
    }

    /// The tab's label: the lyrics file, else the song file, else the song's title, else `untitled`.
    pub fn label(&self, untitled: &str) -> String {
        match self.lrc_path.as_ref().or(self.media_path.as_ref()) {
            Some(path) => file_name(path),
            None => self.media_title.clone().unwrap_or_else(|| untitled.to_owned()),
        }
    }

    fn is_blank(&self) -> bool {
        !self.unsaved && self.lrc_path.is_none() && self.media_path.is_none() && self.lrc.lines.is_empty()
    }

    // ⚠ the undo history is capped at 50 entries. Do not raise without the owner asking.
    fn push_undo(&mut self) {
        if self.undo.len() >= 50 {
            self.undo.remove(0);
        }
        self.undo.push(self.lrc.clone());
    }
}

pub fn file_name(path: &str) -> String {
    Path::new(path).file_name().map(|n| n.to_string_lossy().into_owned()).unwrap_or_default()
}

/// A place in a text given in UTF-16 units (the page's unit) as a byte index of the Rust string.
fn byte_at_utf16(text: &str, pos: usize) -> usize {
    let mut units = 0;
    for (i, c) in text.char_indices() {
        if units >= pos {
            return i;
        }
        units += c.len_utf16();
    }
    text.len()
}

#[derive(Clone, Copy, PartialEq)]
pub enum Answer {
    Yes,
    No,
    Cancel,
}

/// The question on screen (Cancel / No / Yes) and where its answer goes.
#[derive(Clone)]
pub struct Confirm {
    pub title: String,
    pub msg: String,
    reply: Rc<RefCell<Option<oneshot::Sender<Answer>>>>,
}

/// The editor. Every field is a signal, so the whole thing is `Copy` and can be captured by any handler.
#[derive(Clone, Copy)]
pub struct Ed {
    pub docs: Signal<Vec<Doc>>,
    pub active: Signal<u32>,
    pub next_id: Signal<u32>,
    pub settings: Signal<Settings>,
    pub playing: Signal<bool>,
    /// Verify mode: while playing, the player jumps to the next line after the verification delay.
    pub verify: Signal<bool>,
    /// Bumped whenever a pending verify jump must not happen any more.
    pub verify_epoch: Signal<u32>,
    pub position: Signal<f64>,
    pub duration: Signal<f64>,
    /// The row the playhead sits on (see `lrc::cursor_line`).
    pub cursor: Signal<i32>,
    pub volume: Signal<f64>,
    // The three values the player bar lets the user tune for the song at hand. They start from the
    // settings and are not written back.
    pub reaction: Signal<f64>,
    pub verification: Signal<f64>,
    pub seek: Signal<f64>,
    /// Time fields being typed in, by line.
    pub drafts: Signal<HashMap<usize, String>>,
    pub end_draft: Signal<Option<String>>,
    /// A caret to place once the list is drawn again: (line, position in UTF-16 units).
    pub caret: Signal<Option<(usize, usize)>>,
    pub confirm: Signal<Option<Confirm>>,
    pub show_meta: Signal<bool>,
    pub toast: LbsToast,
}

impl Ed {
    pub fn t(self, key: &str) -> String {
        i18n::t(&self.settings.peek().lang, key)
    }

    /// Read the active document, subscribing the caller (for a view).
    pub fn view<R>(self, f: impl FnOnce(&Doc) -> R) -> R {
        let id = (self.active)();
        let docs = self.docs.read();
        f(docs.iter().find(|d| d.id == id).unwrap_or(&docs[0]))
    }

    /// Read the active document without subscribing (for a handler).
    pub fn peek<R>(self, f: impl FnOnce(&Doc) -> R) -> R {
        let id = *self.active.peek();
        let docs = self.docs.peek();
        f(docs.iter().find(|d| d.id == id).unwrap_or(&docs[0]))
    }

    /// Change the active document. ⚠ Never call `view` / `peek` / `edit` from inside the closure.
    pub fn edit<R>(self, f: impl FnOnce(&mut Doc) -> R) -> R {
        let id = *self.active.peek();
        let mut docs = self.docs;
        let mut docs = docs.write();
        let i = docs.iter().position(|d| d.id == id).unwrap_or(0);
        f(&mut docs[i])
    }

    fn has_music(self) -> bool {
        self.peek(|d| d.media_path.is_some())
    }

    fn cancel_verify_jump(self) {
        let mut epoch = self.verify_epoch;
        *epoch.write() += 1;
    }

    // ─── Line edits ──────────────────────────────────────────────────────────────────────────────

    pub fn set_active_line(self, line: i32) {
        if self.peek(|d| d.active_line) != line {
            self.edit(|d| d.active_line = line);
        }
    }

    /// Give a line a new time (the neighbours are pushed to keep the order), as one undo step.
    pub fn set_time(self, idx: usize, time: f64) {
        self.edit(|d| {
            if idx < d.lrc.lines.len() {
                d.push_undo();
                d.lrc.lines = lrc::apply_time_change(&d.lrc.lines, idx, time);
                d.unsaved = true;
            }
        });
        let mut drafts = self.drafts;
        drafts.write().clear();
    }

    /// A time field was left: take what was typed, if it is a time.
    pub fn commit_time(self, idx: usize) {
        let mut drafts = self.drafts;
        let Some(text) = drafts.write().remove(&idx) else { return };
        if let Some(time) = lrc::from_lrc_time(text.trim()) {
            self.set_time(idx, time);
        }
    }

    pub fn commit_end_time(self) {
        let mut draft = self.end_draft;
        let Some(text) = draft.write().take() else { return };
        if let Some(time) = lrc::from_lrc_time(text.trim()) {
            self.edit(|d| {
                d.end_lyrics = time;
                d.unsaved = true;
            });
        }
    }

    pub fn shift_end_time(self, delta: f64) {
        self.edit(|d| {
            d.end_lyrics = (d.end_lyrics + delta).max(0.0);
            d.unsaved = true;
        });
    }

    pub fn update_text(self, idx: usize, text: String) {
        self.edit(|d| {
            if let Some(line) = d.lrc.lines.get_mut(idx) {
                line.text = text;
                d.unsaved = true;
            }
        });
    }

    pub fn undo(self) {
        self.edit(|d| {
            if let Some(prev) = d.undo.pop() {
                d.lrc = prev;
                d.unsaved = true;
            }
        });
    }

    /// Cut a line in two at the caret. A cut at the very start leaves an empty, unsynced line above and
    /// moves the time down with the text.
    pub fn split(self, idx: usize, caret: usize) {
        let done = self.edit(|d| {
            let Some(line) = d.lrc.lines.get(idx).cloned() else { return false };
            d.push_undo();
            let at = byte_at_utf16(&line.text, caret);
            let (before, after) = (line.text[..at].to_owned(), line.text[at..].to_owned());
            let at_start = at == 0;
            d.lrc.lines[idx] = Line { text: before, time: if at_start { 0.0 } else { line.time } };
            d.lrc.lines.insert(idx + 1, Line { text: after, time: if at_start { line.time } else { 0.0 } });
            d.active_line = idx as i32 + 1;
            d.unsaved = true;
            true
        });
        if done {
            let mut caret = self.caret;
            caret.set(Some((idx + 1, 0)));
        }
    }

    /// Join line `idx` to the end of the one above it (Backspace at the start of a line).
    pub fn merge(self, idx: usize) {
        let place = self.edit(|d| {
            if idx == 0 || idx >= d.lrc.lines.len() {
                return None;
            }
            d.push_undo();
            let cur = d.lrc.lines.remove(idx);
            let prev = &mut d.lrc.lines[idx - 1];
            let caret = prev.text.encode_utf16().count();
            if prev.text.is_empty() {
                prev.time = cur.time;
            }
            prev.text.push_str(&cur.text);
            d.active_line = idx as i32 - 1;
            d.unsaved = true;
            Some(caret)
        });
        if let Some(pos) = place {
            let mut caret = self.caret;
            caret.set(Some((idx - 1, pos)));
        }
    }

    /// Join the line below to the end of line `idx` (Delete at the end of a line).
    pub fn join(self, idx: usize) {
        let place = self.edit(|d| {
            if idx + 1 >= d.lrc.lines.len() {
                return None;
            }
            d.push_undo();
            let next = d.lrc.lines.remove(idx + 1);
            let line = &mut d.lrc.lines[idx];
            let caret = line.text.encode_utf16().count();
            line.text.push_str(&next.text);
            d.active_line = idx as i32;
            d.unsaved = true;
            Some(caret)
        });
        if let Some(pos) = place {
            let mut caret = self.caret;
            caret.set(Some((idx, pos)));
        }
    }

    pub fn set_lyrics_from_notepad(self) {
        self.edit(|d| {
            let lines = lrc::lines_from_notepad(&d.notepad);
            if !lines.is_empty() {
                d.lrc.lines = lines;
                d.active_line = 0;
                d.unsaved = true;
            }
        });
    }

    // ─── Playback ────────────────────────────────────────────────────────────────────────────────

    pub fn play_pause(self) {
        if !self.has_music() {
            return;
        }
        let (mut playing, mut verify) = (self.playing, self.verify);
        if *playing.peek() {
            if *verify.peek() {
                // from verify to plain play, without a pause
                verify.set(false);
                self.cancel_verify_jump();
            } else {
                audio::pause();
                playing.set(false);
            }
        } else {
            audio::play();
            playing.set(true);
            self.select_first_line_if_none();
        }
    }

    pub fn verify_play(self) {
        if !self.has_music() {
            return;
        }
        let (mut playing, mut verify) = (self.playing, self.verify);
        if *playing.peek() {
            if !*verify.peek() {
                // from plain play to verify, without a pause
                verify.set(true);
            } else {
                audio::pause();
                playing.set(false);
                verify.set(false);
                self.cancel_verify_jump();
            }
        } else {
            audio::play();
            playing.set(true);
            verify.set(true);
            self.select_first_line_if_none();
        }
    }

    fn select_first_line_if_none(self) {
        if self.peek(|d| d.active_line < 0 && !d.lrc.lines.is_empty()) {
            self.edit(|d| d.active_line = 0);
        }
    }

    pub fn stop(self) {
        if !self.has_music() {
            return;
        }
        audio::stop();
        self.mark_stopped();
        let mut position = self.position;
        position.set(0.0);
    }

    fn mark_stopped(self) {
        let (mut playing, mut verify) = (self.playing, self.verify);
        playing.set(false);
        verify.set(false);
        self.cancel_verify_jump();
    }

    pub fn seek_by(self, delta: f64) {
        if self.has_music() {
            audio::seek_by(delta);
        }
    }

    pub fn seek_to(self, seconds: f64) {
        if !self.has_music() {
            return;
        }
        audio::seek_to(seconds);
        let mut position = self.position;
        position.set(seconds.clamp(0.0, (*self.duration.peek()).max(0.0)));
    }

    /// Seek to a row's time and start playing if the player is not.
    pub fn play_from(self, seconds: f64) {
        self.seek_to(seconds);
        if !*self.playing.peek() {
            self.play_pause();
        }
    }

    pub fn prev_stamp(self) {
        let at = *self.position.peek();
        let target = self.peek(|d| {
            if d.media_path.is_none() || d.lrc.lines.is_empty() {
                return None;
            }
            let mut i = lrc::playing_line(&d.lrc.lines, at) - 1;
            while i >= 0 && d.lrc.lines[i as usize].time == 0.0 {
                i -= 1;
            }
            // stepping back past the first stamp goes to the start of the music
            Some(if i >= 0 { (d.lrc.lines[i as usize].time, i + 1) } else { (0.0, -1) })
        });
        if let Some((time, line)) = target {
            self.seek_to(time);
            self.set_active_line(line);
        }
    }

    pub fn next_stamp(self) {
        let at = *self.position.peek();
        let target = self.peek(|d| {
            if d.media_path.is_none() || d.lrc.lines.is_empty() {
                return None;
            }
            let n = d.lrc.lines.len();
            let mut i = (lrc::playing_line(&d.lrc.lines, at) + 1) as usize;
            while i < n && d.lrc.lines[i].time == 0.0 {
                i += 1;
            }
            if i < n {
                Some((d.lrc.lines[i].time, i as i32 + 1))
            } else if d.end_lyrics > 0.0 {
                Some((d.end_lyrics, n as i32))
            } else {
                None
            }
        });
        if let Some((time, line)) = target {
            self.seek_to(time);
            self.set_active_line(line);
        }
    }

    /// Stamp the selected line with the player's time `at` (taken at the key press), less the reaction
    /// delay, and select the next line.
    // ⚠ the reaction delay is in ms and `at` in seconds. Always the live value of the player bar,
    // never a fixed offset. The stamp goes through `apply_time_change` like every other time edit, so it
    // pushes BOTH ways and a line can never end up before the one above it.
    pub fn sync(self, at: f64) {
        let time = (at - *self.reaction.peek() / 1000.0).max(0.0);
        let stamped = self.edit(|d| {
            if d.media_path.is_none() || d.active_line < 0 {
                return false;
            }
            let (line, count) = (d.active_line as usize, d.lrc.lines.len());
            if line == count {
                d.end_lyrics = time;
                d.unsaved = true;
                return false;
            }
            if line > count {
                return false;
            }
            d.push_undo();
            d.lrc.lines = lrc::apply_time_change(&d.lrc.lines, line, time);
            d.unsaved = true;
            d.active_line += 1;
            true
        });
        if stamped {
            let mut drafts = self.drafts;
            drafts.write().clear();
        }
    }

    // ─── Documents (tabs) ────────────────────────────────────────────────────────────────────────

    /// Make a document the one on screen: the player takes its song, at the place it was left.
    fn activate(self, id: u32) {
        let (mut active, mut position, mut duration, mut cursor) = (self.active, self.position, self.duration, self.cursor);
        let (mut drafts, mut end_draft) = (self.drafts, self.end_draft);
        self.mark_stopped();
        active.set(id);
        drafts.write().clear();
        end_draft.set(None);
        duration.set(0.0);
        cursor.set(-1);
        let (song, at) = self.peek(|d| (d.media_path.clone(), d.position));
        position.set(at);
        match song {
            Some(song) => audio::load(&crate::server().audio_url(Path::new(&song)), at),
            None => audio::unload(),
        }
    }

    pub fn switch_doc(self, id: u32) {
        if *self.active.peek() == id || !self.docs.peek().iter().any(|d| d.id == id) {
            return;
        }
        let at = *self.position.peek();
        self.edit(|d| d.position = at);
        self.activate(id);
    }

    pub fn open_new_doc(self) {
        let (mut next_id, mut docs) = (self.next_id, self.docs);
        let id = *next_id.peek();
        next_id.set(id + 1);
        let at = *self.position.peek();
        self.edit(|d| d.position = at);
        docs.write().push(Doc::empty(id));
        self.activate(id);
    }

    /// A file arriving from outside (a second launch, Open, a drop) gets its own tab - unless the current
    /// tab is still blank, which it simply fills.
    fn prepare_incoming(self) {
        if !self.peek(Doc::is_blank) {
            self.open_new_doc();
        }
    }

    async fn close_active(self) {
        if !self.allow_unsaved().await {
            return;
        }
        let id = *self.active.peek();
        let mut docs = self.docs;
        let idx = docs.peek().iter().position(|d| d.id == id).unwrap_or(0);
        let next = {
            let mut docs = docs.write();
            docs.remove(idx);
            if docs.is_empty() {
                // closing the last tab leaves one blank tab
                docs.push(Doc::empty(id));
            }
            docs[idx.min(docs.len() - 1)].id
        };
        self.activate(next);
    }

    pub fn close_doc(self, id: u32) {
        if *self.active.peek() != id {
            let unsaved = self.docs.peek().iter().find(|d| d.id == id).map(|d| d.unsaved);
            match unsaved {
                None => return,
                Some(false) => {
                    let mut docs = self.docs;
                    docs.write().retain(|d| d.id != id);
                    return;
                }
                // an unsaved tab can only be saved while it is the one on screen: go to it, then ask
                Some(true) => self.switch_doc(id),
            }
        }
        spawn(async move { self.close_active().await });
    }

    // ─── The confirm dialog ──────────────────────────────────────────────────────────────────────

    async fn ask(self, title: String, msg: String) -> Answer {
        let (tx, rx) = oneshot::channel();
        let mut confirm = self.confirm;
        confirm.set(Some(Confirm { title, msg, reply: Rc::new(RefCell::new(Some(tx))) }));
        rx.await.unwrap_or(Answer::Cancel)
    }

    pub fn answer(self, answer: Answer) {
        let mut confirm = self.confirm;
        let asked = confirm.write().take();
        if let Some(tx) = asked.and_then(|c| c.reply.borrow_mut().take()) {
            let _ = tx.send(answer);
        }
    }

    /// May the current document be replaced or closed? Asks when it has unsaved changes.
    async fn allow_unsaved(self) -> bool {
        if !self.peek(|d| d.unsaved) {
            return true;
        }
        match self.ask(self.t("cfmAppUnsavedTitle"), self.t("cfmAppUnsavedMsg")).await {
            Answer::Yes => self.save().await,
            Answer::No => true,
            Answer::Cancel => false,
        }
    }

    // ─── Files ───────────────────────────────────────────────────────────────────────────────────

    fn dialog(self, key: &str, title: String) -> rfd::AsyncFileDialog {
        let mut dialog = rfd::AsyncFileDialog::new().set_title(title);
        if let Some(dir) = self.settings.peek().dialog_dirs.get(key).filter(|d| Path::new(d).is_dir()) {
            dialog = dialog.set_directory(dir);
        }
        dialog
    }

    fn remember_dir(self, key: &str, file: &Path) {
        if let Some(dir) = file.parent() {
            let mut settings = self.settings;
            settings.write().dialog_dirs.insert(key.to_owned(), dir.to_string_lossy().into_owned());
        }
    }

    async fn pick(self, key: &str, title: String, filter: &str, exts: &[&str]) -> Option<PathBuf> {
        let window = dioxus::desktop::window();
        let file = self.dialog(key, title).set_parent(&window.window).add_filter(filter, exts).pick_file().await?;
        let path = file.path().to_path_buf();
        self.remember_dir(key, &path);
        Some(path)
    }

    /// The document as the text of an `.lrc` file. Empty fields take the defaults from the settings.
    fn export_text(self) -> String {
        let settings = self.settings.peek().clone();
        let duration = *self.duration.peek();
        self.peek(|d| {
            let mut out = d.lrc.clone();
            let or_default = |field: &mut String, default: &str| {
                if field.is_empty() {
                    *field = default.to_owned();
                }
            };
            or_default(&mut out.artist, &settings.default_artist);
            or_default(&mut out.songwriter, &settings.default_songwriter);
            or_default(&mut out.lrc_by, &settings.default_lrc_by);
            if duration > 0.0 {
                out.length = lrc::to_lrc_time(duration);
            }
            out.editor = APP_NAME.to_owned();
            out.editor_version = APP_VERSION.to_owned();
            let mut text = lrc::export(&out);
            if d.end_lyrics > 0.0 {
                text.push_str(&format!("\n[{}] ", lrc::to_lrc_time(d.end_lyrics)));
            }
            text
        })
    }

    fn write_lrc(self, path: &Path) -> bool {
        let ok = fs::write(path, self.export_text()).is_ok();
        if ok {
            let path = path.to_string_lossy().into_owned();
            self.edit(|d| {
                d.lrc_path = Some(path);
                d.unsaved = false;
            });
            self.toast.show(self.t("tstAppSaved"));
        } else {
            self.toast.show(self.t("tstAppSaveError"));
        }
        ok
    }

    pub async fn save(self) -> bool {
        match self.peek(|d| d.lrc_path.clone()) {
            Some(path) => self.write_lrc(Path::new(&path)),
            None => self.save_as().await,
        }
    }

    pub async fn save_as(self) -> bool {
        let window = dioxus::desktop::window();
        let mut dialog = rfd::AsyncFileDialog::new().set_parent(&window.window).set_title(self.t("ttlOsdSaveLrcAs")).add_filter("LRC", &["lrc"]);
        // beside the song, under the song's name
        dialog = match self.peek(|d| d.media_path.clone()).map(|song| PathBuf::from(song).with_extension("lrc")) {
            Some(target) => {
                let name = target.file_name().map(|n| n.to_string_lossy().into_owned()).unwrap_or_default();
                match target.parent() {
                    Some(dir) => dialog.set_directory(dir).set_file_name(name),
                    None => dialog.set_file_name(name),
                }
            }
            None => dialog.set_file_name("lyrics.lrc"),
        };
        match dialog.save_file().await {
            Some(file) => self.write_lrc(file.path()),
            None => false,
        }
    }

    /// Export the lyrics alone, one line per line, as a text file.
    pub async fn save_txt(self) {
        let window = dioxus::desktop::window();
        let mut dialog = rfd::AsyncFileDialog::new().set_parent(&window.window).set_title(self.t("ttlOsdSaveTxt")).add_filter("TXT", &["txt"]);
        dialog = match self.peek(|d| d.lrc_path.clone().or(d.media_path.clone())).map(|p| PathBuf::from(p).with_extension("txt")) {
            Some(target) => {
                let name = target.file_name().map(|n| n.to_string_lossy().into_owned()).unwrap_or_default();
                match target.parent() {
                    Some(dir) => dialog.set_directory(dir).set_file_name(name),
                    None => dialog.set_file_name(name),
                }
            }
            None => dialog.set_file_name("lyrics.txt"),
        };
        if let Some(file) = dialog.save_file().await {
            let text = self.peek(|d| d.lrc.lines.iter().map(|l| l.text.as_str()).collect::<Vec<_>>().join("\n"));
            if fs::write(file.path(), text).is_err() {
                self.toast.show(self.t("tstAppSaveError"));
            }
        }
    }

    /// The current document takes a song: the player loads it and the title is read from its tags.
    fn apply_media(self, song: &Path) {
        let path = song.to_string_lossy().into_owned();
        self.mark_stopped();
        let (mut position, mut duration) = (self.position, self.duration);
        position.set(0.0);
        duration.set(0.0);
        self.edit(|d| {
            d.media_path = Some(path.clone());
            d.media_title = None;
            d.position = 0.0;
        });
        audio::load(&crate::server().audio_url(song), 0.0);
        let song = song.to_path_buf();
        spawn(async move {
            let read = song.clone();
            let Ok(found) = tokio::task::spawn_blocking(move || tags::read(&read)).await else { return };
            if let Some(title) = found.title {
                // the tab may have changed while the tags were read: only the document of that song takes the title
                let mut docs = self.docs;
                for d in docs.write().iter_mut().filter(|d| d.media_path.as_deref() == Some(path.as_str())) {
                    d.media_title = Some(title.clone());
                }
            }
        });
    }

    /// The current document takes lyrics. Plain text becomes unsynced lines; an `.lrc` replaces the whole
    /// document (its out-of-order times repaired). Returns how many times were repaired.
    fn apply_lyrics(self, text: &str, plain: bool, path: Option<&Path>) -> usize {
        if plain {
            let lines = lrc::lines_from_text(text);
            self.edit(|d| {
                d.active_line = if lines.is_empty() { -1 } else { 0 };
                d.lrc.lines = lines;
                d.end_lyrics = 0.0;
                d.unsaved = true;
            });
            return 0;
        }
        let mut parsed = lrc::parse(text);
        let end_lyrics = lrc::take_end_of_lyrics(&mut parsed.lines);
        if parsed.editor.is_empty() {
            parsed.editor = APP_NAME.to_owned();
        }
        if parsed.editor_version.is_empty() {
            parsed.editor_version = APP_VERSION.to_owned();
        }
        let (ordered, fixed) = lrc::normalize_times(&parsed.lines);
        parsed.lines = ordered;
        let path = path.map(|p| p.to_string_lossy().into_owned());
        self.edit(|d| {
            d.lrc = parsed;
            d.end_lyrics = end_lyrics;
            d.lrc_path = path;
            d.unsaved = fixed > 0;
            d.active_line = -1;
        });
        if fixed > 0 {
            self.toast.show(self.t("tstAppTimesFixed"));
        }
        fixed
    }

    /// Read a lyrics file into the current document. `false` = the file could not be read.
    fn apply_lyrics_file(self, path: &Path) -> bool {
        match files::read_text(path) {
            Ok(text) => {
                self.apply_lyrics(&text, files::ext(path) == "txt", Some(path));
                true
            }
            Err(_) => {
                self.toast.show(self.t("tstAppFileError"));
                false
            }
        }
    }

    /// The `.lrc` beside a song, loaded when there is one.
    fn try_auto_lrc(self, song: &Path) -> bool {
        let Some(path) = files::lrc_beside(song) else { return false };
        let Ok(text) = files::read_text(&path) else { return false };
        // the repair notice outranks "loaded automatically": it is not replaced
        if self.apply_lyrics(&text, false, Some(&path)) == 0 {
            self.toast.show(self.t("tstAppAutoLrcLoaded"));
        }
        true
    }

    /// The song beside a lyrics file, loaded when there is one.
    fn try_auto_media(self, lyrics: &Path) {
        if let Some(song) = files::song_beside(lyrics) {
            self.apply_media(&song);
        }
    }

    /// A brand-new LRC for a song just opened. With "fill the metadata automatically" on, it is filled from
    /// the song's tags right away, and is NOT marked unsaved: the user typed nothing.
    fn reset_lrc(self, song: &Path) {
        self.edit(|d| {
            d.lrc = new_lrc();
            d.lrc_path = None;
            d.end_lyrics = 0.0;
            d.unsaved = false;
            d.active_line = -1;
        });
        if self.settings.peek().meta_autofill {
            self.fill_meta(song, false);
        }
    }

    /// The ONE metadata fill, used by the dialog's button and by the automatic fill of a new LRC.
    fn fill_meta(self, song: &Path, mark_unsaved: bool) {
        let song = song.to_path_buf();
        spawn(async move {
            let path = song.to_string_lossy().into_owned();
            let Ok(found) = tokio::task::spawn_blocking(move || tags::read(&song)).await else { return };
            // only the document that still holds that song is filled
            if !self.peek(|d| d.media_path.as_deref() == Some(path.as_str())) {
                return;
            }
            self.edit(|d| {
                let set = |field: &mut String, value: Option<String>| {
                    if let Some(v) = value {
                        *field = v;
                    }
                };
                set(&mut d.lrc.title, found.title);
                set(&mut d.lrc.artist, found.artist);
                set(&mut d.lrc.album, found.album);
                set(&mut d.lrc.length, found.length);
                d.lrc.editor = APP_NAME.to_owned();
                d.lrc.editor_version = APP_VERSION.to_owned();
                if mark_unsaved {
                    d.unsaved = true;
                }
            });
        });
    }

    pub fn fill_meta_from_song(self) {
        if let Some(song) = self.peek(|d| d.media_path.clone()) {
            self.fill_meta(Path::new(&song), true);
        }
    }

    /// A song for the current tab: its `.lrc` beside it is loaded, else a new LRC starts.
    async fn take_song(self, song: &Path) {
        self.apply_media(song);
        if !self.allow_unsaved().await {
            return;
        }
        if !self.try_auto_lrc(song) {
            self.reset_lrc(song);
        }
    }

    /// A lyrics file, in a tab of its own, with the song beside it.
    fn take_lyrics(self, path: &Path) {
        self.prepare_incoming();
        if self.apply_lyrics_file(path) && files::ext(path) != "txt" {
            self.try_auto_media(path);
        }
    }

    pub async fn open_music(self) {
        if let Some(song) = self.pick("open-music", self.t("ttlOsdOpenMusic"), "Audio", &files::AUDIO_EXTS).await {
            self.take_song(&song).await;
        }
    }

    pub async fn open_lyrics(self) {
        if let Some(path) = self.pick("open-lyrics", self.t("ttlOsdOpenLyrics"), "LRC / TXT", &files::LYRICS_EXTS).await {
            self.take_lyrics(&path);
        }
    }

    /// A file dropped on the window, routed by its extension the way the two Open buttons are.
    pub async fn open_dropped(self, path: PathBuf) {
        if files::is_audio(&path) {
            self.take_song(&path).await;
        } else if files::is_lyrics(&path) {
            self.take_lyrics(&path);
        }
    }

    /// What a launch asks for: a hand-off from another app (a song, with its lyrics file or its plain
    /// lyrics), or an `.lrc` opened from the file manager. Each lands in its own tab.
    pub fn launch(self, asked: Launch) {
        if let Some(handoff) = asked.handoff.as_deref().and_then(launch::take_handoff) {
            self.prepare_incoming();
            let song = handoff.media_path.as_deref().map(PathBuf::from).filter(|p| p.is_file());
            if let Some(song) = &song {
                self.apply_media(song);
            }
            if let Some(path) = handoff.lrc_path.as_deref() {
                self.apply_lyrics_file(Path::new(path));
            } else if let Some(lyrics) = handoff.lyrics.as_deref() {
                self.apply_lyrics(lyrics, true, None);
                // lyrics without a timed file = a NEW lrc for that song
                if let Some(song) = song.filter(|_| self.settings.peek().meta_autofill) {
                    self.fill_meta(&song, false);
                }
            }
            return;
        }
        if let Some(path) = asked.lrc.as_deref().map(Path::new) {
            if files::read_text(path).is_ok() {
                self.prepare_incoming();
                self.apply_lyrics_file(path);
                self.try_auto_media(path);
            }
        }
    }

    // ─── The page's messages ─────────────────────────────────────────────────────────────────────

    pub fn on_page(self, msg: audio::Msg) {
        match msg.k.as_str() {
            "tick" => {
                // a tick still on its way from the song of the tab just left is not this document's
                if !self.has_music() {
                    return;
                }
                let (mut position, mut cursor) = (self.position, self.cursor);
                if *position.peek() != msg.t {
                    position.set(msg.t);
                }
                let row = self.peek(|d| lrc::cursor_line(&d.lrc.lines, d.end_lyrics, msg.t - d.lrc.offset_ms as f64 * 0.001));
                if *cursor.peek() != row {
                    cursor.set(row);
                }
            }
            "meta" => {
                let (mut position, mut duration) = (self.position, self.duration);
                duration.set(msg.d);
                position.set(msg.t);
            }
            "ended" => {
                let (mut playing, mut position) = (self.playing, self.position);
                playing.set(false);
                position.set(0.0);
            }
            "error" => {
                let mut playing = self.playing;
                playing.set(false);
                self.toast.show(format!("{} ({})", self.t("tstAppAudioError"), msg.c));
            }
            "esc" => {
                let mut show_meta = self.show_meta;
                if self.confirm.peek().is_some() {
                    self.answer(Answer::Cancel);
                } else if *show_meta.peek() {
                    show_meta.set(false);
                }
            }
            "playpause" => self.play_pause(),
            "stop" => self.stop(),
            "sync" => self.sync(msg.t),
            "undo" => self.undo(),
            "left" => self.seek_by(-*self.seek.peek()),
            "right" => self.seek_by(*self.seek.peek()),
            "split" => self.split(msg.i, msg.s),
            "merge" => self.merge(msg.i),
            "join" => self.join(msg.i),
            _ => {}
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn a_caret_in_page_units_lands_on_a_character() {
        assert_eq!(byte_at_utf16("abc", 2), 2);
        assert_eq!(byte_at_utf16("éa", 1), 2);
        assert_eq!(byte_at_utf16("😀a", 2), 4);
        assert_eq!(byte_at_utf16("ab", 9), 2);
    }
}
