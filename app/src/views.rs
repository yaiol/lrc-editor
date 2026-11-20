// ⚠ NO HARDCODED UI STRINGS IN THIS FILE.
//   Every string a user can read - text, title, aria-label - MUST go through the t() lookup, and
//   the key MUST be a string literal at the call site.

//! What the editor draws: the header's buttons, the tab strip, the notepad and the lyric list, the player
//! bar, the two dialogs and the app's two settings pages. Each view reads the editor (`Ed`) from the context
//! and calls its operations; none holds editor state of its own.

use crate::{
    catalog::{UisNum, UisPnlSplitter, UisPnlToggle},
    editor::{Answer, Ed, file_name},
    i18n,
    icons::LdSavePlus,
};
use dioxus::prelude::*;
use dioxus_free_icons::{
    Icon,
    icons::ld_icons::{
        LdChevronLeft, LdChevronRight, LdFilePlus, LdFolderOpen, LdMusic, LdPause, LdPlay, LdSave, LdSkipBack, LdSkipForward, LdSquare, LdUpload, LdVolume1, LdVolume2,
        LdVolumeX, LdX,
    },
};
use engine::lrc::{format_clock, to_lrc_time};

// ─── Header ─────────────────────────────────────────────────────────────────────────────────────

/// The header's work buttons: one welded group of file actions (new, open lyrics, open music, save,
/// save as), then the metadata dialog and the text export.
#[component]
pub fn HeaderButtons() -> Element {
    let ed = use_context::<Ed>();
    let code = ed.settings.read().lang.clone();
    let t = |key: &str| i18n::t(&code, key);
    let (tip_new, tip_lyrics, tip_music, tip_save, tip_save_as) = (t("tipHdrNew"), t("tipHdrOpenLyrics"), t("tipHdrOpenMusic"), t("tipHdrSaveLrc"), t("tipHdrSaveLrcAs"));
    let (tip_meta, btn_meta, tip_txt) = (t("tipHdrMeta"), t("btnHdrMeta"), t("tipHdrSaveTxt"));
    let mut show_meta = ed.show_meta;
    rsx! {
        div { class: "uis-barh-grp",
            button { class: "uis-btn ico", title: "{tip_new}", onclick: move |_| ed.open_new_doc(),
                Icon { width: 14, height: 14, icon: LdFilePlus }
            }
            button {
                class: "uis-btn ico",
                title: "{tip_lyrics}",
                onclick: move |_| {
                    spawn(async move { ed.open_lyrics().await });
                },
                Icon { width: 14, height: 14, icon: LdFolderOpen }
            }
            button {
                class: "uis-btn ico",
                title: "{tip_music}",
                onclick: move |_| {
                    spawn(async move { ed.open_music().await });
                },
                Icon { width: 14, height: 14, icon: LdMusic }
            }
            button {
                class: "uis-btn ico",
                title: "{tip_save}",
                onclick: move |_| {
                    spawn(async move {
                        ed.save().await;
                    });
                },
                Icon { width: 14, height: 14, icon: LdSave }
            }
            button {
                class: "uis-btn ico",
                title: "{tip_save_as}",
                onclick: move |_| {
                    spawn(async move {
                        ed.save_as().await;
                    });
                },
                Icon { width: 14, height: 14, icon: LdSavePlus }
            }
        }
        button { class: "uis-btn", title: "{tip_meta}", onclick: move |_| show_meta.set(true), "{btn_meta}" }
        button {
            class: "uis-btn ico",
            title: "{tip_txt}",
            onclick: move |_| {
                spawn(async move { ed.save_txt().await });
            },
            Icon { width: 14, height: 14, icon: LdUpload }
        }
    }
}

// ─── Tabs ───────────────────────────────────────────────────────────────────────────────────────

/// A tab's inline style, as the Electron app writes it.
fn tab_style(active: bool) -> String {
    format!(
        "display: flex; align-items: center; flex-shrink: 0; height: 30px; padding: 0 6px 0 12px; cursor: pointer; background: {}; border-right: 1px solid var(--uis-border); border-bottom: {}; color: {}; font-size: 13px; min-width: 80px; max-width: 200px; overflow: hidden;",
        if active { "var(--uis-bg)" } else { "transparent" },
        if active { "2px solid var(--uis-accent)" } else { "2px solid transparent" },
        if active { "var(--uis-text)" } else { "var(--uis-text-mute)" },
    )
}

const PANE_HEAD: &str = "padding: 4px 10px; border-bottom: 1px solid var(--uis-border); font-size: 11px; color: var(--uis-text-dim); background: var(--uis-bg-elev); flex-shrink: 0;";
const FIXED_ROW: &str = "cursor: default; user-select: none;";
const FIXED_TIME: &str = "width: 9ch; color: var(--uis-accent); font-family: monospace; flex-shrink: 0; padding: 0 2px; font-size: 12px;";
const FIXED_GAP: &str = "width: 18px; flex-shrink: 0;";
const FIXED_TEXT: &str = "flex: 1; padding: 0 2px; font-size: 12px; color: var(--uis-text-mute); font-family: Consolas, monospace; font-style: italic;";

/// One tab per open song.
#[component]
pub fn Tabs() -> Element {
    let ed = use_context::<Ed>();
    let code = ed.settings.read().lang.clone();
    let t = |key: &str| i18n::t(&code, key);
    let untitled = t("lblAppTabUntitled");
    let tip_close = t("tipAppTabClose");
    let active = (ed.active)();
    let tabs: Vec<(u32, String, bool)> = ed.docs.read().iter().map(|d| (d.id, d.label(&untitled), d.unsaved)).collect();
    rsx! {
        div { style: "display: flex; align-items: center; flex-shrink: 0; background: var(--uis-bg-elev); border-bottom: 1px solid var(--uis-border); overflow-x: auto; overflow-y: hidden;",
            for (id, label, unsaved) in tabs {
                // ⚠ the key carries the active state on purpose. Dioxus applies a CHANGED `style` string by setting
                // it and then putting back every longhand the new string left empty - and a `var()` shorthand
                // (`background: var(--uis-bg)`) leaves its longhands empty to the browser, so the OLD background and
                // border came back and the active tab never looked active. A new key is a new element, set once.
                div {
                    key: "{id}-{id == active}",
                    style: "{tab_style(id == active)}",
                    onclick: move |_| ed.switch_doc(id),
                    if unsaved {
                        span { style: "color: var(--uis-accent); margin-right: 4px; font-size: 10px;", "●" }
                    }
                    span { style: "flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;", "{label}" }
                    button {
                        class: "uis-btn ico small subtle",
                        title: "{tip_close}",
                        onclick: move |e| {
                            e.stop_propagation();
                            ed.close_doc(id);
                        },
                        Icon { width: 14, height: 14, icon: LdX }
                    }
                }
            }
        }
    }
}

// ─── Workspace: the notepad and the lyric list ──────────────────────────────────────────────────

#[component]
pub fn Workspace(theme: String) -> Element {
    let ed = use_context::<Ed>();
    let code = ed.settings.read().lang.clone();
    let t = |key: &str| i18n::t(&code, key);
    let mut show_notepad = use_signal(|| true);
    let mut notepad_width = use_signal(|| 240.0_f64);
    let (lbl_notepad, plh_notepad, btn_set, tip_set) = (t("lblNotepad"), t("plhNotepad"), t("btnNotepadSetLyrics"), t("tipNotepadSetLyrics"));
    let tip_toggle = if show_notepad() { t("tipNotepadHide") } else { t("tipNotepadShow") };
    let notepad = ed.view(|d| d.notepad.clone());

    // Dragging the divider: the page follows the pointer and says where it is until the button is let go.
    let start_resize = move |e: MouseEvent| {
        let start_x = e.client_coordinates().x;
        let start_w = *notepad_width.peek();
        spawn(async move {
            let mut drag = document::eval(
                "const mv = (e) => dioxus.send(e.clientX); const up = () => { window.removeEventListener('mousemove', mv); window.removeEventListener('mouseup', up); dioxus.send(null); }; window.addEventListener('mousemove', mv); window.addEventListener('mouseup', up);",
            );
            while let Ok(Some(x)) = drag.recv::<Option<f64>>().await {
                notepad_width.set((start_w + x - start_x).clamp(160.0, 520.0));
            }
        });
    };

    rsx! {
        div { style: "flex: 1; display: flex; overflow: hidden;",
            if show_notepad() {
                div { style: "width: {notepad_width()}px; display: flex; flex-direction: column; flex-shrink: 0;",
                    div { style: PANE_HEAD, "{lbl_notepad}" }
                    div { style: "flex: 1; display: flex; flex-direction: column; padding: 8px; gap: 8px; overflow: hidden;",
                        textarea {
                            class: "uis-txt-area",
                            style: "flex: 1; resize: none;",
                            value: "{notepad}",
                            placeholder: "{plh_notepad}",
                            spellcheck: false,
                            oninput: move |e| ed.edit(|d| d.notepad = e.value()),
                        }
                        div {
                            button { class: "uis-btn primary", title: "{tip_set}", onclick: move |_| ed.set_lyrics_from_notepad(), "{btn_set}" }
                        }
                    }
                }
                UisPnlSplitter { theme, on_resize_start: start_resize }
            }
            UisPnlToggle { open: show_notepad(), on_toggle: move |_| show_notepad.toggle(), side: "left", title: tip_toggle }
            Lines {}
        }
    }
}

/// The lyric list: a "start of music" row, one row per line (seek, time, earlier / later, text), an
/// "end of lyrics" row whose time is saved, and an "end of music" row that only shows the song's length.
#[component]
fn Lines() -> Element {
    let ed = use_context::<Ed>();
    let code = ed.settings.read().lang.clone();
    let t = |key: &str| i18n::t(&code, key);
    let (lbl_new, lbl_lines, emp, lbl_start, lbl_end_lyrics, lbl_end_music) =
        (t("lblSyncNewFile"), t("lblSyncLines"), t("empSyncNoLrc"), t("lblSyncStartOfMusic"), t("lblSyncEndOfLyrics"), t("lblSyncEndOfMusic"));
    let (tip_earlier, tip_later) = (t("tipSyncEarlier"), t("tipSyncLater"));

    let (lines, active, end_lyrics, has_music, file, unsaved) =
        ed.view(|d| (d.lrc.lines.clone(), d.active_line, d.end_lyrics, d.media_path.is_some(), d.lrc_path.as_deref().map(file_name), d.unsaved));
    // a document without a song has no playhead
    let cursor = if has_music { (ed.cursor)() } else { -2 };
    let playing = (ed.playing)();
    let duration = (ed.duration)();
    let drafts = ed.drafts.read().clone();
    let end_draft = (ed.end_draft)();
    let shift = ed.settings.read().shift_delay / 1000.0;
    let count = lines.len();
    let end_row = count as i32;
    let mut drafts_sig = ed.drafts;
    let mut end_draft_sig = ed.end_draft;

    let head = format!("{}{} - {count} {lbl_lines}", file.unwrap_or(lbl_new), if unsaved { " *" } else { "" });
    let row_class = |selected: bool, at_cursor: bool| format!("lrc-out-line{}{}", if selected { " active" } else { "" }, if at_cursor { " cursor" } else { "" });
    let end_time = end_draft.clone().unwrap_or_else(|| to_lrc_time(end_lyrics));
    let music_end = if duration > 0.0 { to_lrc_time(duration) } else { "-".to_owned() };

    rsx! {
        div { style: "flex: 1; display: flex; flex-direction: column; overflow: hidden;",
            div { style: PANE_HEAD, "{head}" }
            div { class: if playing { "is-playing" } else { "" }, style: "flex: 1; overflow-y: auto;",
                if count == 0 {
                    div { class: "empty-state", "{emp}" }
                }
                // The start of the music: shown only, never saved.
                div { class: "{row_class(false, cursor == -1 && has_music)}", style: FIXED_ROW,
                    button {
                        class: "lrc-seek-btn",
                        style: "margin-right: 4px;",
                        title: "00:00.00",
                        onclick: move |e| {
                            e.stop_propagation();
                            ed.play_from(0.0);
                        },
                        "▶"
                    }
                    span { style: FIXED_TIME, "00:00.00" }
                    span { style: FIXED_GAP }
                    span { style: FIXED_GAP }
                    span { style: FIXED_TEXT, "{lbl_start}" }
                }
                {
                    lines
                        .into_iter()
                        .enumerate()
                        .map(|(idx, line)| {
                            let time = line.time;
                            let stamp = to_lrc_time(time);
                            let shown = drafts.get(&idx).cloned().unwrap_or_else(|| stamp.clone());
                            let line_no = idx as i32;
                            let text_empty = line.text.is_empty();
                            rsx! {
                                div {
                                    key: "{idx}",
                                    class: "{row_class(line_no == active, line_no == cursor)}",
                                    onclick: move |_| ed.set_active_line(line_no),
                                    button {
                                        class: "lrc-seek-btn",
                                        title: "{stamp}",
                                        disabled: idx > 0 && time == 0.0,
                                        onclick: move |e| {
                                            e.stop_propagation();
                                            ed.play_from(time);
                                        },
                                        "▶"
                                    }
                                    input {
                                        class: "lrc-time-input",
                                        value: "{shown}",
                                        onfocus: move |_| ed.set_active_line(line_no),
                                        oninput: move |e| {
                                            drafts_sig.write().insert(idx, e.value());
                                        },
                                        onblur: move |_| ed.commit_time(idx),
                                    }
                                    button {
                                        class: "lrc-nudge-btn",
                                        title: "{tip_earlier}",
                                        onclick: move |e| {
                                            e.stop_propagation();
                                            ed.set_active_line(line_no);
                                            ed.set_time(idx, time - shift);
                                        },
                                        "‹"
                                    }
                                    button {
                                        class: "lrc-nudge-btn",
                                        title: "{tip_later}",
                                        onclick: move |e| {
                                            e.stop_propagation();
                                            ed.set_active_line(line_no);
                                            ed.set_time(idx, time + shift);
                                        },
                                        "›"
                                    }
                                    input {
                                        class: "lrc-text-input",
                                        "data-idx": "{idx}",
                                        value: "{line.text}",
                                        placeholder: "-",
                                        style: if text_empty { "color: var(--uis-text-mute);" } else { "color: var(--uis-text);" },
                                        onfocus: move |_| ed.set_active_line(line_no),
                                        oninput: move |e| ed.update_text(idx, e.value()),
                                    }
                                }
                            }
                        })
                }
                // The end of the lyrics: its time can be set and is saved (as a last, empty line); its text is fixed.
                div {
                    class: "{row_class(active == end_row, cursor == end_row)}",
                    style: FIXED_ROW,
                    onclick: move |_| ed.set_active_line(end_row),
                    button {
                        class: "lrc-seek-btn",
                        title: "{end_time}",
                        onclick: move |e| {
                            e.stop_propagation();
                            ed.play_from(end_lyrics);
                        },
                        "▶"
                    }
                    input {
                        class: "lrc-time-input",
                        value: "{end_time}",
                        oninput: move |e| end_draft_sig.set(Some(e.value())),
                        onblur: move |_| ed.commit_end_time(),
                    }
                    button { class: "lrc-nudge-btn", title: "{tip_earlier}", onclick: move |_| ed.shift_end_time(-shift), "‹" }
                    button { class: "lrc-nudge-btn", title: "{tip_later}", onclick: move |_| ed.shift_end_time(shift), "›" }
                    span { style: FIXED_TEXT, "{lbl_end_lyrics}" }
                }
                // The end of the music: the song's length, shown only.
                div { class: "lrc-out-line", style: FIXED_ROW,
                    button {
                        class: "lrc-seek-btn",
                        title: "{music_end}",
                        onclick: move |_| {
                            if duration > 0.0 {
                                ed.play_from(duration);
                            }
                        },
                        "▶"
                    }
                    span { style: FIXED_TIME, "{music_end}" }
                    span { style: FIXED_GAP }
                    span { style: FIXED_GAP }
                    span { style: FIXED_TEXT, "{lbl_end_music}" }
                }
            }
        }
    }
}

// ─── Player bar ─────────────────────────────────────────────────────────────────────────────────

#[component]
pub fn PlayerBar() -> Element {
    let ed = use_context::<Ed>();
    let code = ed.settings.read().lang.clone();
    let t = |key: &str| i18n::t(&code, key);
    let (tip_sync, btn_sync, lbl_reaction) = (t("tipFtrSyncTime"), t("btnFtrSyncTime"), t("lblFtrReactionDelay"));
    let (tip_play, tip_stop, tip_verify, lbl_verification) = (t("tipFtrPlayPause"), t("tipFtrStop"), t("tipFtrVerify"), t("lblFtrVerificationDelay"));
    let (tip_prev, tip_next, lbl_seek, tip_back, tip_forward) = (t("tipFtrPrevStamp"), t("tipFtrNextStamp"), t("lblFtrSeekDelay"), t("tipFtrSeekBack"), t("tipFtrSeekNext"));

    let (has_music, active, song_path, song_name) = ed.view(|d| {
        let name = d.media_path.as_deref().map(|p| d.media_title.clone().unwrap_or_else(|| file_name(p)));
        (d.media_path.is_some(), d.active_line, d.media_path.clone().unwrap_or_default(), name.unwrap_or_else(|| "-".to_owned()))
    });
    let playing = (ed.playing)();
    let verify = (ed.verify)();
    let plain_on = playing && !verify;
    let verify_on = playing && verify;
    let (mut reaction, mut verification, mut seek, mut volume) = (ed.reaction, ed.verification, ed.seek, ed.volume);
    let vol = volume();

    rsx! {
        div { class: "uis-barh-footer",
            button {
                class: "uis-btn primary",
                title: "{tip_sync}",
                disabled: !playing || active < 0,
                onclick: move |_| {
                    spawn(async move {
                        let at = crate::audio::now().await;
                        ed.sync(at);
                    });
                },
                "{btn_sync}"
            }
            // ⚠ these three number fields are intentional - they let the user tune per song without
            // opening Settings. Do NOT remove them even though Settings > Time has the same values.
            UisNum {
                value: Some(reaction()),
                min: Some(0.0),
                step: 100.0,
                width: "70px",
                title: lbl_reaction,
                on_change: move |v: Option<f64>| {
                    if let Some(v) = v {
                        reaction.set(v);
                    }
                },
            }
            div { class: "uis-barh-grp",
                // ⚠ a one-item list, so that its key (the on / off state) is honoured and the button is a NEW element
                // each time it flips: a changed `style` string keeps the old `color`, see the tab strip.
                for on in [plain_on] {
                    button {
                        key: "{on}",
                        class: "uis-btn ico",
                        style: if on { "background: var(--uis-accent); color: #fff;" } else { "" },
                        title: "{tip_play}",
                        disabled: !has_music,
                        onclick: move |_| ed.play_pause(),
                        if on {
                            Icon { width: 14, height: 14, icon: LdPause }
                        } else {
                            Icon { width: 14, height: 14, icon: LdPlay }
                        }
                    }
                }
                button { class: "uis-btn ico", style: "color: var(--uis-danger);", title: "{tip_stop}", disabled: !has_music, onclick: move |_| ed.stop(),
                    Icon { width: 14, height: 14, icon: LdSquare }
                }
            }
            div { class: "uis-barh-grp",
                for on in [verify_on] {
                    button {
                        key: "{on}",
                        class: "uis-btn ico",
                        style: if on { "background: var(--uis-accent); color: #fff;" } else { "" },
                        title: "{tip_verify}",
                        disabled: !has_music,
                        onclick: move |_| ed.verify_play(),
                        if on {
                            Icon { width: 14, height: 14, icon: LdPause }
                        } else {
                            Icon { width: 14, height: 14, icon: LdPlay }
                        }
                    }
                }
                UisNum {
                    value: Some(verification()),
                    min: Some(0.0),
                    step: 100.0,
                    width: "70px",
                    title: lbl_verification,
                    on_change: move |v: Option<f64>| {
                        if let Some(v) = v {
                            verification.set(v);
                        }
                    },
                }
                button { class: "uis-btn ico", title: "{tip_prev}", disabled: !has_music, onclick: move |_| ed.prev_stamp(),
                    Icon { width: 14, height: 14, icon: LdSkipBack }
                }
                button { class: "uis-btn ico", title: "{tip_next}", disabled: !has_music, onclick: move |_| ed.next_stamp(),
                    Icon { width: 14, height: 14, icon: LdSkipForward }
                }
            }
            div { class: "uis-barh-grp",
                UisNum {
                    value: Some(seek()),
                    min: Some(0.0),
                    step: 1.0,
                    width: "54px",
                    title: lbl_seek,
                    on_change: move |v: Option<f64>| {
                        if let Some(v) = v {
                            seek.set(v);
                        }
                    },
                }
                button {
                    class: "uis-btn ico",
                    title: "{tip_back}",
                    disabled: !has_music,
                    onclick: move |_| ed.seek_by(-*ed.seek.peek()),
                    Icon { width: 14, height: 14, icon: LdChevronLeft }
                }
                button {
                    class: "uis-btn ico",
                    title: "{tip_forward}",
                    disabled: !has_music,
                    onclick: move |_| ed.seek_by(*ed.seek.peek()),
                    Icon { width: 14, height: 14, icon: LdChevronRight }
                }
            }
            span {
                style: "font-weight: 600; color: var(--uis-text); flex-shrink: 0; max-width: 180px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;",
                title: "{song_path}",
                "{song_name}"
            }
            Position { has_music }
            div { class: "uis-barh-sep" }
            if vol == 0.0 {
                Icon { width: 14, height: 14, class: "uis-bar-glyph", style: "color: var(--uis-text-dim);", icon: LdVolumeX }
            } else if vol < 50.0 {
                Icon { width: 14, height: 14, class: "uis-bar-glyph", style: "color: var(--uis-text-dim);", icon: LdVolume1 }
            } else {
                Icon { width: 14, height: 14, class: "uis-bar-glyph", style: "color: var(--uis-text-dim);", icon: LdVolume2 }
            }
            input {
                r#type: "range",
                class: "uis-sld",
                style: "width: 65px;",
                min: "0",
                max: "100",
                value: "{vol}",
                oninput: move |e| {
                    if let Ok(v) = e.value().parse::<f64>() {
                        volume.set(v);
                    }
                },
            }
        }
    }
}

/// The position slider and the two times. Its own view because it is the one part redrawn ten times a
/// second while a song plays. While the slider is dragged it shows the dragged time and the player is not
/// touched; the seek happens once, when it is let go.
#[component]
fn Position(has_music: bool) -> Element {
    let ed = use_context::<Ed>();
    let mut dragged = use_signal(|| None::<f64>);
    let duration = (ed.duration)();
    let shown = dragged().unwrap_or((ed.position)());
    let clock = format!("{} / {}", format_clock(shown), format_clock(duration));
    rsx! {
        input {
            r#type: "range",
            class: "uis-sld",
            style: "flex: 1;",
            min: "0",
            max: "{duration.max(1.0)}",
            step: "0.1",
            value: "{shown}",
            disabled: !has_music,
            oninput: move |e| dragged.set(e.value().parse::<f64>().ok()),
            onchange: move |e| {
                if let Ok(v) = e.value().parse::<f64>() {
                    ed.seek_to(v);
                }
                dragged.set(None);
            },
        }
        span { class: "uis-hnt mono", style: "min-width: 88px; text-align: center; font-variant-numeric: tabular-nums;", "{clock}" }
    }
}

// ─── Dialogs ────────────────────────────────────────────────────────────────────────────────────

/// The question asked before unsaved changes are lost: Cancel / No / Yes. Cancel has the focus.
#[component]
pub fn ConfirmDialog() -> Element {
    let ed = use_context::<Ed>();
    let Some(asked) = ed.confirm.read().as_ref().map(|c| (c.title.clone(), c.msg.clone())) else {
        return rsx! {};
    };
    let code = ed.settings.read().lang.clone();
    let t = |key: &str| i18n::t(&code, key);
    let (btn_cancel, btn_no, btn_yes) = (t("btnGlbCancel"), t("btnGlbNo"), t("btnGlbYes"));
    let (title, msg) = asked;
    rsx! {
        div { class: "uis-dl-backdrop", style: "z-index: 900;",
            div { class: "uis-dlp",
                button { class: "uis-dl-close", onclick: move |_| ed.answer(Answer::Cancel),
                    Icon { width: 14, height: 14, icon: LdX }
                }
                div { class: "uis-dlp-title", "{title}" }
                div { class: "uis-dlp-sub", "{msg}" }
                div { class: "uis-dlp-foot",
                    button {
                        class: "uis-btn subtle",
                        onmounted: move |e| async move {
                            let _ = e.set_focus(true).await;
                        },
                        onclick: move |_| ed.answer(Answer::Cancel),
                        "{btn_cancel}"
                    }
                    button { class: "uis-btn subtle", onclick: move |_| ed.answer(Answer::No), "{btn_no}" }
                    button { class: "uis-btn primary", onclick: move |_| ed.answer(Answer::Yes), "{btn_yes}" }
                }
            }
        }
    }
}

/// The song's metadata: the tags written at the top of the `.lrc`. An empty field shows the default from
/// the settings, which is what a save writes.
#[component]
pub fn MetaDialog() -> Element {
    let ed = use_context::<Ed>();
    let code = ed.settings.read().lang.clone();
    let t = |key: &str| i18n::t(&code, key);
    let ttl = t("ttlDlgMeta");
    let (lbl_artist, lbl_album, lbl_title, lbl_songwriter, lbl_by, lbl_offset) =
        (t("lblDlgMetaArtist"), t("lblDlgMetaAlbum"), t("lblDlgMetaTitle"), t("lblDlgMetaSongwriter"), t("lblDlgMetaLrcBy"), t("lblDlgMetaOffsetMs"));
    let (plh_artist, plh_album, plh_title, plh_songwriter, plh_by) =
        (t("plhDlgMetaArtist"), t("plhDlgMetaAlbum"), t("plhDlgMetaTitle"), t("plhDlgMetaSongwriter"), t("plhDlgMetaLrcBy"));
    let (btn_fill, tip_fill) = (t("btnDlgMetaAutoFill"), t("tipDlgMetaAutoFill"));
    let (lrc, has_music) = ed.view(|d| (d.lrc.clone(), d.media_path.is_some()));
    let (def_artist, def_songwriter, def_by) = {
        let s = ed.settings.read();
        (s.default_artist.clone(), s.default_songwriter.clone(), s.default_lrc_by.clone())
    };
    let or = |default: String, hint: String| if default.is_empty() { hint } else { default };
    let (plh_artist, plh_songwriter, plh_by) = (or(def_artist, plh_artist), or(def_songwriter, plh_songwriter), or(def_by, plh_by));
    let mut show_meta = ed.show_meta;
    rsx! {
        div { class: "uis-dl-backdrop", onmousedown: move |_| show_meta.set(false),
            div { class: "uis-dlg", onmousedown: move |e| e.stop_propagation(),
                div { class: "uis-dlg-head",
                    span { class: "uis-dlg-title", "{ttl}" }
                    button {
                        class: "uis-dl-close",
                        onmounted: move |e| async move {
                            let _ = e.set_focus(true).await;
                        },
                        onclick: move |_| show_meta.set(false),
                        Icon { width: 14, height: 14, icon: LdX }
                    }
                }
                div { class: "uis-dlg-body", style: "display: flex; flex-direction: column; gap: 14px;",
                    div { class: "uis-fld-labelled",
                        label { class: "uis-fld-labelled-label", "{lbl_artist}" }
                        input {
                            class: "uis-txt",
                            value: "{lrc.artist}",
                            placeholder: "{plh_artist}",
                            oninput: move |e| ed.edit(|d| {
                                d.lrc.artist = e.value();
                                d.unsaved = true;
                            }),
                        }
                    }
                    div { class: "uis-fld-labelled",
                        label { class: "uis-fld-labelled-label", "{lbl_album}" }
                        input {
                            class: "uis-txt",
                            value: "{lrc.album}",
                            placeholder: "{plh_album}",
                            oninput: move |e| ed.edit(|d| {
                                d.lrc.album = e.value();
                                d.unsaved = true;
                            }),
                        }
                    }
                    div { class: "uis-fld-labelled",
                        label { class: "uis-fld-labelled-label", "{lbl_title}" }
                        input {
                            class: "uis-txt",
                            value: "{lrc.title}",
                            placeholder: "{plh_title}",
                            oninput: move |e| ed.edit(|d| {
                                d.lrc.title = e.value();
                                d.unsaved = true;
                            }),
                        }
                    }
                    div { class: "uis-fld-labelled",
                        label { class: "uis-fld-labelled-label", "{lbl_songwriter}" }
                        input {
                            class: "uis-txt",
                            value: "{lrc.songwriter}",
                            placeholder: "{plh_songwriter}",
                            oninput: move |e| ed.edit(|d| {
                                d.lrc.songwriter = e.value();
                                d.unsaved = true;
                            }),
                        }
                    }
                    div { class: "uis-fld-labelled",
                        label { class: "uis-fld-labelled-label", "{lbl_by}" }
                        input {
                            class: "uis-txt",
                            value: "{lrc.lrc_by}",
                            placeholder: "{plh_by}",
                            oninput: move |e| ed.edit(|d| {
                                d.lrc.lrc_by = e.value();
                                d.unsaved = true;
                            }),
                        }
                    }
                    div { class: "uis-fld-labelled",
                        label { class: "uis-fld-labelled-label", "{lbl_offset}" }
                        UisNum {
                            value: Some(lrc.offset_ms as f64),
                            width: "90px",
                            on_change: move |v: Option<f64>| {
                                if let Some(v) = v {
                                    ed.edit(|d| {
                                        d.lrc.offset_ms = v.round() as i64;
                                        d.unsaved = true;
                                    });
                                }
                            },
                        }
                    }
                    div { style: "display: flex; justify-content: flex-end;",
                        button { class: "uis-btn primary", title: "{tip_fill}", disabled: !has_music, onclick: move |_| ed.fill_meta_from_song(), "{btn_fill}" }
                    }
                }
            }
        }
    }
}

// ─── Settings pages ─────────────────────────────────────────────────────────────────────────────

/// Settings > Time: the four delays.
#[component]
pub fn SettingsTime() -> Element {
    let ed = use_context::<Ed>();
    let code = ed.settings.read().lang.clone();
    let t = |key: &str| i18n::t(&code, key);
    let (lbl_shift, lbl_reaction, lbl_verification, lbl_seek) = (t("lblStgTimeShiftDelay"), t("lblStgTimeReactionDelay"), t("lblStgTimeVerificationDelay"), t("lblStgTimeSeekDelay"));
    let (shift, reaction, verification, seek) = {
        let s = ed.settings.read();
        (s.shift_delay, s.reaction_delay, s.verification_delay, s.seek_delay)
    };
    let mut settings = ed.settings;
    rsx! {
        div { class: "uis-fld-labelled",
            label { class: "uis-fld-labelled-label", "{lbl_shift}" }
            div { style: "display: flex; align-items: center; gap: 8px;",
                UisNum {
                    value: Some(shift),
                    min: Some(100.0),
                    step: 100.0,
                    width: "64px",
                    on_change: move |v: Option<f64>| {
                        if let Some(v) = v {
                            settings.write().shift_delay = v;
                        }
                    },
                }
                span { class: "uis-hnt", "ms" }
            }
        }
        div { class: "uis-fld-labelled divider",
            label { class: "uis-fld-labelled-label", "{lbl_reaction}" }
            div { style: "display: flex; align-items: center; gap: 8px;",
                UisNum {
                    value: Some(reaction),
                    min: Some(0.0),
                    step: 100.0,
                    width: "64px",
                    on_change: move |v: Option<f64>| {
                        if let Some(v) = v {
                            settings.write().reaction_delay = v;
                        }
                    },
                }
                span { class: "uis-hnt", "ms" }
            }
        }
        div { class: "uis-fld-labelled divider",
            label { class: "uis-fld-labelled-label", "{lbl_verification}" }
            div { style: "display: flex; align-items: center; gap: 8px;",
                UisNum {
                    value: Some(verification),
                    min: Some(0.0),
                    step: 100.0,
                    width: "64px",
                    on_change: move |v: Option<f64>| {
                        if let Some(v) = v {
                            settings.write().verification_delay = v;
                        }
                    },
                }
                span { class: "uis-hnt", "ms" }
            }
        }
        div { class: "uis-fld-labelled divider",
            label { class: "uis-fld-labelled-label", "{lbl_seek}" }
            div { style: "display: flex; align-items: center; gap: 8px;",
                UisNum {
                    value: Some(seek),
                    min: Some(1.0),
                    step: 1.0,
                    width: "64px",
                    on_change: move |v: Option<f64>| {
                        if let Some(v) = v {
                            settings.write().seek_delay = v;
                        }
                    },
                }
                span { class: "uis-hnt", "s" }
            }
        }
    }
}

/// Settings > Meta Data: the automatic fill, and the defaults a save writes into empty fields.
#[component]
pub fn SettingsMeta() -> Element {
    let ed = use_context::<Ed>();
    let code = ed.settings.read().lang.clone();
    let t = |key: &str| i18n::t(&code, key);
    let lbl_auto = t("lblStgMetaAutoFill");
    let (lbl_artist, lbl_songwriter, lbl_by) = (t("lblStgMetaArtist"), t("lblStgMetaSongwriter"), t("lblStgMetaLrcBy"));
    let (plh_artist, plh_songwriter, plh_by) = (t("plhStgMetaArtist"), t("plhStgMetaSongwriter"), t("plhStgMetaLrcBy"));
    let (auto, artist, songwriter, by) = {
        let s = ed.settings.read();
        (s.meta_autofill, s.default_artist.clone(), s.default_songwriter.clone(), s.default_lrc_by.clone())
    };
    let mut settings = ed.settings;
    rsx! {
        div { style: "display: flex; flex-direction: column; gap: 14px;",
            div { class: "uis-fld-labelled",
                label { class: "uis-chk-lbl",
                    input {
                        r#type: "checkbox",
                        class: "uis-chk-box",
                        checked: auto,
                        onchange: move |e| settings.write().meta_autofill = e.checked(),
                    }
                    "{lbl_auto}"
                }
            }
            div { class: "uis-fld-labelled",
                label { class: "uis-fld-labelled-label", "{lbl_artist}" }
                input {
                    class: "uis-txt",
                    value: "{artist}",
                    placeholder: "{plh_artist}",
                    oninput: move |e| settings.write().default_artist = e.value(),
                }
            }
            div { class: "uis-fld-labelled",
                label { class: "uis-fld-labelled-label", "{lbl_songwriter}" }
                input {
                    class: "uis-txt",
                    value: "{songwriter}",
                    placeholder: "{plh_songwriter}",
                    oninput: move |e| settings.write().default_songwriter = e.value(),
                }
            }
            div { class: "uis-fld-labelled",
                label { class: "uis-fld-labelled-label", "{lbl_by}" }
                input {
                    class: "uis-txt",
                    value: "{by}",
                    placeholder: "{plh_by}",
                    oninput: move |e| settings.write().default_lrc_by = e.value(),
                }
            }
        }
    }
}
