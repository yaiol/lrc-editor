// data-icon="yaiol:lrc-editor"
// ⚠ NO HARDCODED UI STRINGS IN THIS FILE.
//   Every string a user can read - text, title, aria-label - MUST go through the t() lookup, and
//   the key MUST be a string literal at the call site. Add the key to locales/en.json, then
//   translate, sort and audit every language with the i18n scripts. Never paste translations by hand.

mod audio;
mod catalog;
mod editor;
mod i18n;
mod icons;
mod settings;
mod site;
mod views;
mod window_accent;
mod window_menu;

use catalog::{LbsDropZone, UisAppHeader, UisAppTab, UisBarWindow, UisBtnNews, UisBtnUpdate, UisIcoGithub, UisNewsLoader, UisStgView, news, use_toast};
use dioxus::prelude::*;
use dioxus_free_icons::{
    Icon,
    icons::ld_icons::{LdCircleHelp, LdClock, LdSettings, LdTag},
};
use editor::{Doc, Ed};
use engine::{launch::Launch, server::Server};
use std::{
    collections::HashMap,
    path::PathBuf,
    sync::{Mutex, OnceLock, mpsc::Receiver},
    time::Duration,
};

const CSS: [&str; 5] = [
    include_str!("../assets/uis-colors.css"),
    include_str!("../assets/uis-app.css"),
    include_str!("../assets/uis-bar-window.css"),
    include_str!("../assets/uis-sld.css"),
    include_str!("../assets/app.css"),
];

// ─── App identity - single source of truth: Cargo.toml (see build.rs) ───────────────────────────
const APP_NAME: &str = env!("YAIOL_PRODUCT_NAME");
const APP_ID: &str = env!("CARGO_PKG_NAME");
const APP_VERSION: &str = env!("CARGO_PKG_VERSION");

/// This build's identity, `<version>.<counter>`, as ONE contiguous string that survives into the
/// executable. The apps-cockpit finds it by its `yaiol-build:` prefix to tell a buffered build from
/// the release it follows - the counter cannot ride in Cargo's three-part version, and `dx bundle`
/// writes its own Windows version resource, so this is the one channel that is entirely ours.
/// ⚠ keep it a single `concat!` of literals, and read it through `black_box` (as
/// app_version_build does). A plain `BUILD_ID["yaiol-build:".len()..]` is constant-folded and the
/// optimiser keeps only the suffix - the PREFIX the cockpit searches for disappears from the exe and
/// every build reads as the bare release (found 2026-10-12 by grepping the staged exe).
const BUILD_ID: &str = concat!("yaiol-build:", env!("YAIOL_BUILD_ID"));

/// The full build identity shown to the user: the release version plus the build counter (the 4th
/// segment a buffered commit bumps), or just the release version on a clean build.
/// ⚠ DISPLAY ONLY. The release version (`CARGO_PKG_VERSION`) stays plain three-part semver
/// and must not absorb the counter: an update check compares it against the published version, and
/// four parts is not semver.
fn app_version_build() -> String {
    let full = std::hint::black_box(BUILD_ID);
    let id = &full["yaiol-build:".len()..];
    id.strip_suffix(".0").unwrap_or(id).to_owned()
}

// ─── What main() hands to the window ────────────────────────────────────────────────────────────
// The local server (the player reads songs from it; later launches arrive through it), what THIS launch
// was asked to open, and the queue of what later launches ask.
static SERVER: OnceLock<Server> = OnceLock::new();
static FIRST_LAUNCH: OnceLock<Launch> = OnceLock::new();
static LATER_LAUNCHES: OnceLock<Mutex<Receiver<Launch>>> = OnceLock::new();

fn server() -> &'static Server {
    SERVER.get().expect("the local server is started before the window")
}

/// A window that opens at a known size and place. Only a debug build needs it written out: see main().
#[cfg(debug_assertions)]
fn explicit_placement(window: dioxus::desktop::WindowBuilder) -> dioxus::desktop::WindowBuilder {
    window
        .with_inner_size(dioxus::desktop::LogicalSize::new(1100.0, 720.0))
        .with_position(dioxus::desktop::LogicalPosition::new(120.0, 80.0))
}

#[cfg(not(debug_assertions))]
fn explicit_placement(window: dioxus::desktop::WindowBuilder) -> dioxus::desktop::WindowBuilder {
    window.with_inner_size(dioxus::desktop::LogicalSize::new(1100.0, 720.0))
}

/// The window has no system frame: the app draws its own bar (`UisBarWindow`), which moves it and holds the three
/// window buttons. The system still resizes it from its edges, and on Windows it keeps its shadow.
fn frameless(window: dioxus::desktop::WindowBuilder) -> dioxus::desktop::WindowBuilder {
    let window = window.with_decorations(false);
    #[cfg(windows)]
    let window = {
        use dioxus::desktop::tao::platform::windows::WindowBuilderExtWindows;
        window.with_undecorated_shadow(true)
    };
    window
}

fn main() {
    // ⚠ ONE window. A second launch hands what it was asked to open (a `.lrc`, a hand-off from
    // another app) to the window already open, which loads it in a new tab, and ends here. Without this a
    // second process would be a second editor on the same settings file.
    let asked = engine::launch::parse(&std::env::args().skip(1).collect::<Vec<_>>());
    let instance_file: Option<PathBuf> = settings::data_dir().map(|d| d.join("instance"));
    if let Some(file) = &instance_file {
        if engine::server::forward_to_running(file, &asked) {
            return;
        }
    }
    let (local, later) = Server::start().expect("the local server starts");
    if let Some(file) = &instance_file {
        local.write_instance(file);
    }
    let _ = SERVER.set(local);
    let _ = FIRST_LAUNCH.set(asked);
    let _ = LATER_LAUNCHES.set(Mutex::new(later));

    // ⚠ in a DEBUG build Dioxus writes the window's position and size to `window-state.json` in
    // the temp folder when the app ends and puts the window back there on the next launch - for EVERY
    // Dioxus app on the machine, from the one shared file. A session that ended while the window was
    // MINIMIZED saved (-32000, -32000) and a 200 px square, so the next `cargo run` opened off screen
    // at that size and could not be brought back. Dioxus restores only what the app did NOT set
    // explicitly, so a debug build sets both, here. A release build never restores anything.
    let window = frameless(explicit_placement(
        dioxus::desktop::WindowBuilder::new().with_title(APP_NAME).with_min_inner_size(dioxus::desktop::LogicalSize::new(700.0, 500.0)),
    ));

    dioxus::LaunchBuilder::desktop()
        .with_cfg(
            dioxus::desktop::Config::new()
                // ⚠ the browser's own right-click menu (Back, Reload, Save as, Print, Inspect) is
                // never offered. Dioxus keeps it in a debug build by default - which is how it reached the
                // list on 2026-10-13 - and an app that wants a context menu draws its own.
                .with_disable_context_menu(true)
                .with_window(window)
                .with_menu(None::<dioxus::desktop::muda::Menu>),
        )
        .launch(App);
}

#[component]
fn App() -> Element {
    let saved = use_hook(settings::load);
    let settings = use_signal(|| saved.clone());
    // Lifted clear of the player bar (its height plus the toast's own gap) so the pill floats inside the
    // content area instead of straddling the bar.
    let toast = use_toast(Some(70));
    let ed = Ed {
        docs: use_signal(|| vec![Doc::empty(1)]),
        active: use_signal(|| 1),
        next_id: use_signal(|| 2),
        settings,
        playing: use_signal(|| false),
        verify: use_signal(|| false),
        verify_epoch: use_signal(|| 0),
        position: use_signal(|| 0.0),
        duration: use_signal(|| 0.0),
        cursor: use_signal(|| -1),
        volume: use_signal(|| 80.0),
        reaction: use_signal(|| saved.reaction_delay),
        verification: use_signal(|| saved.verification_delay),
        seek: use_signal(|| saved.seek_delay),
        drafts: use_signal(HashMap::new),
        end_draft: use_signal(|| None),
        caret: use_signal(|| None),
        confirm: use_signal(|| None),
        show_meta: use_signal(|| false),
        toast,
    };
    use_context_provider(|| ed);
    let mut settings = settings;
    let mut settings_open = use_signal(|| false);

    // The window bar shows maximize or restore: the window says which, and says so again whenever its size
    // changes (the bar's own button is one way among several: a snap, Win+Up, a double click).
    let mut maximized = use_signal(|| dioxus::desktop::window().is_maximized());
    // The bar is painted like the system's own title bars: the accent colour when the system colours them, and only
    // while this window is the active one (an inactive title bar is neutral). Read again each time the window comes
    // to the front, so a colour changed in the system's settings shows on return.
    let mut bar_colour = use_signal(window_accent::title_bar);
    dioxus::desktop::use_wry_event_handler(move |event, _| {
        if let dioxus::desktop::tao::event::Event::WindowEvent { event, .. } = event {
            match event {
                dioxus::desktop::WindowEvent::Resized(_) => {
                    let now = dioxus::desktop::window().is_maximized();
                    if *maximized.peek() != now {
                        maximized.set(now);
                    }
                }
                dioxus::desktop::WindowEvent::Focused(active) => {
                    let now = if *active { window_accent::title_bar() } else { None };
                    if *bar_colour.peek() != now {
                        bar_colour.set(now);
                    }
                }
                _ => {}
            }
        }
    });
    use_effect(move || {
        let script = match bar_colour() {
            Some(rgb) => {
                let (bgd, text, hov) = window_accent::bar_colours(rgb);
                format!("const s=document.documentElement.style; s.setProperty('--uis-win-bar-bgd','{bgd}'); s.setProperty('--uis-win-bar-text','{text}'); s.setProperty('--uis-win-bar-hov','{hov}');")
            }
            None => "const s=document.documentElement.style; s.removeProperty('--uis-win-bar-bgd'); s.removeProperty('--uis-win-bar-text'); s.removeProperty('--uis-win-bar-hov');".to_owned(),
        };
        let _ = document::eval(&script);
    });
    // "Show news from yaiol": ONE switch per MACHINE, shared by every yaiol app (a small file in the yaiol
    // app-data folder), so it is read from there rather than from this app's own settings.
    let mut news_on = use_signal(|| news::read_state().enabled);

    // <html> carries the language, its text direction and the theme: the catalog CSS keys off
    // `data-theme`, and a right-to-left language needs `dir` for the webview's own text engine.
    use_effect(move || {
        let (code, theme) = {
            let s = settings.read();
            (s.lang.clone(), s.theme.clone())
        };
        let dir = if engine::is_rtl(&code) { "rtl" } else { "ltr" };
        let _ = document::eval(&format!(
            "const r=document.documentElement; r.setAttribute('lang','{}'); r.setAttribute('dir','{dir}'); r.setAttribute('data-theme','{theme}');",
            code.replace('_', "-"),
        ));
    });

    // Every change persists immediately, so leaving the settings page is plain navigation.
    use_effect(move || settings::save(&settings.read()));

    // The page's player and keyboard: installed once, then every message it sends is acted on. What this
    // launch was asked to open is loaded once the player exists.
    use_hook(|| {
        spawn(async move {
            let mut page = document::eval(audio::BRIDGE_JS);
            audio::volume(*ed.volume.peek());
            if let Some(asked) = FIRST_LAUNCH.get().filter(|l| !l.is_empty()) {
                ed.launch(asked.clone());
            }
            while let Ok(msg) = page.recv::<audio::Msg>().await {
                ed.on_page(msg);
            }
        });
        // What later launches ask to open: the window comes to the front and loads it in a new tab.
        spawn(async move {
            loop {
                tokio::time::sleep(Duration::from_millis(250)).await;
                let asked: Vec<Launch> = LATER_LAUNCHES.get().and_then(|q| q.lock().ok()).map(|q| q.try_iter().collect()).unwrap_or_default();
                for launch in asked {
                    let window = dioxus::desktop::window();
                    window.set_minimized(false);
                    window.set_focus();
                    ed.launch(launch);
                }
            }
        });
    });

    use_effect(move || audio::volume((ed.volume)()));

    // Verify mode: each time the playhead reaches a line, wait the verification delay, then jump to the next
    // line - so every line's start is heard without listening to the whole song.
    use_effect(move || {
        let row = (ed.cursor)();
        let on = (ed.verify)() && (ed.playing)();
        let delay = (ed.verification)();
        let mut epoch = ed.verify_epoch;
        let mine = {
            let mut e = epoch.write();
            *e += 1;
            *e
        };
        if !on {
            return;
        }
        // before the first line the next one is the first
        let next = ed.peek(|d| if row < 0 { d.lrc.lines.first() } else { d.lrc.lines.get(row as usize + 1) }.map(|l| l.time));
        if let Some(next) = next {
            spawn(async move {
                tokio::time::sleep(Duration::from_millis(delay.max(0.0) as u64)).await;
                if *ed.verify_epoch.peek() == mine {
                    ed.seek_to(next);
                }
            });
        }
    });

    // Keep the playhead's row and the selected row in view (row 0 is "start of music", so a line is one further).
    use_effect(move || audio::reveal_row(((ed.cursor)() + 1) as usize));
    let selected = use_memo(move || ed.view(|d| d.active_line));
    use_effect(move || {
        let line = selected();
        if line >= 0 {
            audio::reveal_row((line + 1) as usize);
        }
    });
    // A caret waiting for the list to be drawn again (after a split or a join).
    use_effect(move || {
        let mut caret = ed.caret;
        if let Some((line, pos)) = caret() {
            audio::caret(line, pos);
            caret.set(None);
        }
    });

    let code = settings.read().lang.clone();
    let theme = settings.read().theme.clone();
    let t = |key: &str| i18n::t(&code, key);
    let tip_help = t("tipHdrHelp");
    let tip_settings = t("tipHdrSettings");
    let (tip_minimize, tip_maximize, tip_restore, tip_close) = (t("tipWinMinimize"), t("tipWinMaximize"), t("tipWinRestore"), t("tipWinClose"));
    let lbl_news = t("lblStgGeneralNews");
    let tab_time = t("tabStgTime");
    let tab_meta = t("tabStgMeta");
    let drop_label = t("empAppDropFile");

    let version = app_version_build();
    // The app's own icon, shown at the start of the window bar: the file the executable carries, as a page picture.
    let app_icon = use_hook(|| {
        use base64::{Engine, engine::general_purpose::STANDARD};
        format!("data:image/png;base64,{}", STANDARD.encode(include_bytes!("../assets/app.png")))
    });
    let help_url = site::site_url(APP_ID, &code, "help");
    let github_url = format!("https://github.com/yaiol/{APP_ID}");
    let accept: Vec<String> = engine::files::AUDIO_EXTS.iter().chain(engine::files::LYRICS_EXTS.iter()).map(|e| format!(".{e}")).collect();

    rsx! {
        for css in CSS {
            style { "{css}" }
        }
        div { class: "uis-app-root", style: "background: var(--uis-bg); color: var(--uis-text);",
            // A new version (first) and the yaiol news, in one dialog; what is shown is decided inside.
            UisNewsLoader { app_id: APP_ID, app_version: APP_VERSION, lang: code.clone() }
            UisBarWindow {
                app_name: APP_NAME,
                app_version: version.clone(),
                icon_src: app_icon,
                maximized: maximized(),
                tip_minimize,
                tip_maximize,
                tip_restore,
                tip_close,
                on_minimize: move |_| dioxus::desktop::window().set_minimized(true),
                on_maximize: move |_| dioxus::desktop::window().toggle_maximized(),
                on_close: move |_| dioxus::desktop::window().close(),
                on_drag: move |_| dioxus::desktop::window().drag(),
                on_menu: move |_| window_menu::show(),
                button {
                    class: if settings_open() { "uis-barh-window-btn uis-stg-toggle active" } else { "uis-barh-window-btn uis-stg-toggle" },
                    title: "{tip_settings}",
                    "aria-pressed": "{settings_open()}",
                    onclick: move |_| settings_open.toggle(),
                    Icon { width: 14, height: 14, icon: LdSettings }
                }
                button {
                    class: "uis-barh-window-btn",
                    title: "{tip_help}",
                    onclick: move |_| {
                        let _ = open::that(&help_url);
                    },
                    Icon { width: 14, height: 14, icon: LdCircleHelp }
                }
                button {
                    class: "uis-barh-window-btn",
                    title: "GitHub",
                    onclick: move |_| {
                        let _ = open::that(&github_url);
                    },
                    UisIcoGithub {}
                }
                // A newer version is out: the reminder, drawn only then; a click reopens the update card.
                UisBtnUpdate { lang: code.clone() }
                // yaiol has news for this app: the second reminder, drawn only then; a click reopens the announcements.
                UisBtnNews { lang: code.clone() }
            }
            // The name and the version are in the window bar, so the header holds the work buttons only.
            UisAppHeader { app_name: APP_NAME, app_version: version.clone(), bare: true, views::HeaderButtons {} }
            // One tab per open song. The settings page hides the strip.
            if !settings_open() {
                views::Tabs {}
            }
            // .uis-app-main = the growable content region, and the zone a file can be dropped on (so the
            // dimming covers the content only, never the header or the player bar).
            LbsDropZone {
                class: "uis-app-main",
                label: drop_label,
                accept,
                on_file: move |(_, path): (String, String)| {
                    spawn(async move { ed.open_dropped(PathBuf::from(path)).await });
                },
                if settings_open() {
                    UisStgView {
                        app_name: APP_NAME,
                        app_version: version.clone(),
                        lang: code.clone(),
                        theme: theme.clone(),
                        on_set_lang: move |l| settings.write().lang = l,
                        on_set_theme: move |th| settings.write().theme = th,
                        on_close: move |_| settings_open.set(false),
                        app_tabs: vec![
                            UisAppTab {
                                key: "time".to_owned(),
                                label: tab_time,
                                icon: rsx! {
                                    Icon { width: 14, height: 14, icon: LdClock }
                                },
                            },
                            UisAppTab {
                                key: "meta".to_owned(),
                                label: tab_meta,
                                icon: rsx! {
                                    Icon { width: 14, height: 14, icon: LdTag }
                                },
                            },
                        ],
                        app_pages: vec![
                            ("time".to_owned(), rsx! {
                                views::SettingsTime {}
                            }),
                            ("meta".to_owned(), rsx! {
                                views::SettingsMeta {}
                            }),
                        ],
                        general_extra: Some(rsx! {
                            div { class: "uis-fld-labelled divider",
                                label { class: "uis-chk-lbl",
                                    input {
                                        r#type: "checkbox",
                                        class: "uis-chk-box",
                                        checked: news_on(),
                                        onchange: move |e| {
                                            news::set_enabled(e.checked());
                                            news_on.set(e.checked());
                                        },
                                    }
                                    "{lbl_news}"
                                }
                            }
                        }),
                    }
                }
                views::Workspace { theme }
            }
            views::PlayerBar {}
            {toast.view()}
            views::ConfirmDialog {}
            if (ed.show_meta)() {
                views::MetaDialog {}
            }
        }
    }
}
