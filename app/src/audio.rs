//! The page's side of the editor: the audio player and the keyboard.
//!
//! The song plays in the page, so everything that must be exact against the audio is decided in the page:
//! the time a line is stamped with is read at the key press itself and sent with the message, never asked
//! for afterwards (a round trip through Rust would add its own delay to every stamp).
//! The caret of a text field is known only to the page too, so the keys that split and join lines are read
//! there and sent with the caret's place.

use dioxus::prelude::*;
use serde::Deserialize;

/// A message from the page. `k` says what happened; the other fields are filled as that kind needs.
#[derive(Deserialize, Debug, Default)]
#[serde(default)]
pub struct Msg {
    pub k: String,
    /// A time in seconds (the player's position).
    pub t: f64,
    /// The song's length in seconds.
    pub d: f64,
    /// The player's error code.
    pub c: u32,
    /// A line's index.
    pub i: usize,
    /// The caret's place in that line, in UTF-16 units (the page's own unit).
    pub s: usize,
}

/// Installed once. It owns the audio element (`window.__lrce`) and the document's key listener.
pub const BRIDGE_JS: &str = r#"
if (!window.__lrce) {
  const a = new Audio();
  a.preload = 'auto';
  window.__lrce = a;
  window.__lrceResume = 0;
  const has = () => !!a.getAttribute('src');
  a.addEventListener('loadedmetadata', () => {
    const at = window.__lrceResume || 0;
    window.__lrceResume = 0;
    if (at > 0) a.currentTime = at;
    dioxus.send({ k: 'meta', d: isFinite(a.duration) ? a.duration : 0, t: at });
  });
  a.addEventListener('ended', () => { a.currentTime = 0; dioxus.send({ k: 'ended' }); });
  a.addEventListener('error', () => { if (has()) dioxus.send({ k: 'error', c: a.error ? a.error.code : 0 }); });
  setInterval(() => { if (has()) dioxus.send({ k: 'tick', t: a.currentTime }); }, 100);

  document.addEventListener('keydown', (e) => {
    const el = e.target;
    const cls = (name) => !!(el && el.classList && el.classList.contains(name));

    // A dialog is up: it keeps the focus inside itself and Escape leaves it. No editor shortcut acts.
    const back = document.querySelector('.uis-dl-backdrop');
    if (back) {
      if (e.key === 'Escape') { dioxus.send({ k: 'esc' }); return; }
      if (e.key === 'Tab') {
        const els = [...back.querySelectorAll('button, input')].filter((x) => !x.disabled && x.offsetParent !== null);
        if (!els.length) return;
        const first = els[0], last = els[els.length - 1];
        if (e.shiftKey) { if (document.activeElement === first) { e.preventDefault(); last.focus(); } }
        else if (document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
      return;
    }

    // A line's text: undo, split, join, and Enter to the next line.
    if (cls('lrc-text-input')) {
      const i = parseInt(el.dataset.idx, 10);
      const start = el.selectionStart ?? 0, end = el.selectionEnd ?? 0;
      const mod = e.ctrlKey || e.metaKey;
      if ((e.key === 'z' || e.key === 'Z') && mod) { e.preventDefault(); dioxus.send({ k: 'undo' }); return; }
      if (e.key === 'Enter' && (mod || e.shiftKey)) { e.preventDefault(); dioxus.send({ k: 'split', i, s: start }); return; }
      if (e.key === 'Enter') {
        e.preventDefault();
        const inputs = document.querySelectorAll('.lrc-text-input');
        if (i + 1 < inputs.length) inputs[i + 1].focus();
        return;
      }
      if (e.key === 'Backspace' && start === 0 && end === 0) { e.preventDefault(); if (i > 0) dioxus.send({ k: 'merge', i }); return; }
      if (e.key === 'Delete' && start === el.value.length && end === el.value.length) {
        if (i + 1 < document.querySelectorAll('.lrc-text-input').length) { e.preventDefault(); dioxus.send({ k: 'join', i }); }
      }
      return;
    }
    // A line's time: Enter ends the edit (leaving the field commits it).
    if (cls('lrc-time-input')) { if (e.key === 'Enter') { e.preventDefault(); el.blur(); } return; }

    const tag = el && el.tagName ? el.tagName.toLowerCase() : '';
    if (tag === 'input' || tag === 'textarea' || tag === 'select' || (el && el.isContentEditable)) return;
    switch (e.key) {
      case ' ': e.preventDefault(); dioxus.send({ k: 'playpause' }); break;
      case 'Escape': dioxus.send({ k: 'stop' }); break;
      // the stamp: the player's time is read HERE, at the key press
      case 'Enter': e.preventDefault(); dioxus.send({ k: 'sync', t: a.currentTime }); break;
      case 'z': case 'Z': if (e.ctrlKey || e.metaKey) { e.preventDefault(); dioxus.send({ k: 'undo' }); } break;
      case 'ArrowLeft': e.preventDefault(); dioxus.send({ k: 'left' }); break;
      case 'ArrowRight': e.preventDefault(); dioxus.send({ k: 'right' }); break;
      default: break;
    }
  });
}
"#;

fn run(js: &str) {
    let _ = document::eval(js);
}

/// Give the player a song. `resume` is the position to start from once the song is readable (0 = the start).
pub fn load(url: &str, resume: f64) {
    let url = serde_json::to_string(url).unwrap_or_else(|_| "\"\"".to_owned());
    run(&format!("const a = window.__lrce; if (a) {{ window.__lrceResume = {resume}; a.src = {url}; a.load(); }}"));
}

/// Take the song away from the player.
pub fn unload() {
    run("const a = window.__lrce; if (a) { a.pause(); a.removeAttribute('src'); a.load(); }");
}

pub fn play() {
    run("window.__lrce?.play().catch(() => {});");
}

pub fn pause() {
    run("window.__lrce?.pause();");
}

pub fn stop() {
    run("const a = window.__lrce; if (a) { a.pause(); if (a.getAttribute('src')) a.currentTime = 0; }");
}

pub fn seek_to(seconds: f64) {
    run(&format!("const a = window.__lrce; if (a && a.getAttribute('src')) a.currentTime = Math.max(0, Math.min(a.duration || 0, {seconds}));"));
}

pub fn seek_by(seconds: f64) {
    run(&format!("const a = window.__lrce; if (a && a.getAttribute('src')) a.currentTime = Math.max(0, Math.min(a.duration || 0, a.currentTime + ({seconds})));"));
}

/// `volume` is 0 to 100.
pub fn volume(volume: f64) {
    run(&format!("if (window.__lrce) window.__lrce.volume = {};", (volume / 100.0).clamp(0.0, 1.0)));
}

/// The player's position now, for a stamp made with the mouse (the key press sends its own).
pub async fn now() -> f64 {
    let mut ask = document::eval("dioxus.send(window.__lrce ? window.__lrce.currentTime : 0);");
    ask.recv::<f64>().await.unwrap_or(0.0)
}

/// Put the caret in a line's text field, at `pos` (UTF-16 units).
pub fn caret(line: usize, pos: usize) {
    run(&format!("requestAnimationFrame(() => {{ const el = document.querySelectorAll('.lrc-text-input')[{line}]; if (el) {{ el.focus(); el.setSelectionRange({pos}, {pos}); }} }});"));
}

/// Bring a row of the list into view. Row 0 is the "start of music" row, so line `n` is row `n + 1`.
pub fn reveal_row(row: usize) {
    run(&format!("document.querySelectorAll('.lrc-out-line')[{row}]?.scrollIntoView({{ block: 'nearest' }});"));
}
