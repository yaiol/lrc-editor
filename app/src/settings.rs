//! Persisted user settings, in `settings.json` under the OS app-data folder.
//!
//! The folder mirrors the electron convention exactly: `…\AppData\Roaming\yaiol\<Product Name>`,
//! with a ` (Dev)` suffix on a debug build so a dev run and an installed copy never share state.
//! The file name is plain (`settings.json`) — the folder is already per-app, so there is no
//! storage-prefix to namespace it.

use serde::{Deserialize, Serialize};
use std::{
    collections::BTreeMap,
    fs,
    path::{Path, PathBuf},
};

#[derive(Clone, PartialEq, Serialize, Deserialize)]
#[serde(default)]
pub struct Settings {
    pub lang: String,
    pub theme: String,
    /// Milliseconds taken off the player's time when a line is stamped: the time it takes to press the key.
    pub reaction_delay: f64,
    /// Milliseconds a line is listened to in verify mode before the player jumps to the next one.
    pub verification_delay: f64,
    /// Seconds the seek buttons and the arrow keys move by.
    pub seek_delay: f64,
    /// Milliseconds the earlier / later buttons of a line move its time by.
    pub shift_delay: f64,
    /// Written into a saved file when the document's own field is empty.
    pub default_artist: String,
    pub default_songwriter: String,
    pub default_lrc_by: String,
    /// Fill title / artist / album / length from the song's tags when a NEW lrc is created for a song.
    pub meta_autofill: bool,
    /// The folder each file dialog was last used in, by dialog.
    pub dialog_dirs: BTreeMap<String, String>,
}

impl Default for Settings {
    fn default() -> Self {
        Self {
            lang: "en".to_owned(),
            theme: "light".to_owned(),
            reaction_delay: 500.0,
            verification_delay: 3000.0,
            seek_delay: 10.0,
            shift_delay: 200.0,
            default_artist: String::new(),
            default_songwriter: String::new(),
            default_lrc_by: String::new(),
            meta_autofill: false,
            dialog_dirs: BTreeMap::new(),
        }
    }
}

/// This app's own folder under the OS app-data folder.
pub fn data_dir() -> Option<PathBuf> {
    let folder = if cfg!(debug_assertions) {
        format!("{} (Dev)", crate::APP_NAME)
    } else {
        crate::APP_NAME.to_owned()
    };
    Some(dirs::data_dir()?.join("yaiol").join(folder))
}

fn path() -> Option<PathBuf> {
    Some(data_dir()?.join("settings.json"))
}

pub fn load() -> Settings {
    path().map(|p| load_from(&p)).unwrap_or_default()
}

pub fn save(settings: &Settings) {
    if let Some(p) = path() {
        save_to(&p, settings);
    }
}

fn load_from(path: &Path) -> Settings {
    fs::read_to_string(path)
        .ok()
        .and_then(|text| serde_json::from_str(&text).ok())
        .unwrap_or_default()
}

fn save_to(path: &Path, settings: &Settings) {
    if let Some(dir) = path.parent() {
        let _ = fs::create_dir_all(dir);
    }
    if let Ok(text) = serde_json::to_string_pretty(settings) {
        let _ = fs::write(path, text);
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    fn temp(name: &str) -> PathBuf {
        std::env::temp_dir().join(format!("yaiol-settings-test-{}-{name}", std::process::id()))
    }

    #[test]
    fn round_trips() {
        let p = temp("roundtrip").join("settings.json");
        let mut s = Settings { lang: "ar".to_owned(), theme: "dark".to_owned(), reaction_delay: 350.0, ..Default::default() };
        s.dialog_dirs.insert("open-music".to_owned(), "C:\\Music".to_owned());
        save_to(&p, &s);
        assert!(load_from(&p) == s);
        let _ = fs::remove_dir_all(p.parent().unwrap());
    }

    #[test]
    fn missing_or_broken_file_gives_defaults() {
        assert!(load_from(&temp("missing")) == Settings::default());
        let p = temp("broken");
        fs::write(&p, "{ not json").unwrap();
        assert!(load_from(&p) == Settings::default());
        let _ = fs::remove_file(p);
    }

    #[test]
    fn a_partial_file_keeps_the_rest_at_defaults() {
        let p = temp("partial");
        fs::write(&p, r#"{ "theme": "dark" }"#).unwrap();
        let s = load_from(&p);
        assert_eq!((s.lang.as_str(), s.theme.as_str(), s.seek_delay), ("en", "dark", 10.0));
        let _ = fs::remove_file(p);
    }
}
