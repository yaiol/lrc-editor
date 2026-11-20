//! What a launch asks the app to open: a `.lrc` (a double-click on the file) or a hand-off file written by
//! another app (`--handoff=<path>`: a song, its lyrics file or its plain lyrics).

use serde::{Deserialize, Serialize};
use std::{fs, path::Path};

#[derive(Clone, Debug, Default, PartialEq, Serialize, Deserialize)]
pub struct Launch {
    pub lrc: Option<String>,
    pub handoff: Option<String>,
}

impl Launch {
    pub fn is_empty(&self) -> bool {
        self.lrc.is_none() && self.handoff.is_none()
    }
}

/// The hand-off file's content.
#[derive(Clone, Debug, Default, PartialEq, Deserialize)]
#[serde(rename_all = "camelCase", default)]
pub struct Handoff {
    pub media_path: Option<String>,
    pub lrc_path: Option<String>,
    pub lyrics: Option<String>,
}

/// Read a launch from the arguments that follow the program's own name.
pub fn parse(args: &[String]) -> Launch {
    Launch {
        lrc: args.iter().find(|a| a.to_lowercase().ends_with(".lrc") && Path::new(a).is_file()).cloned(),
        handoff: args.iter().find_map(|a| a.strip_prefix("--handoff=")).map(str::to_owned),
    }
}

/// Read the hand-off file and delete it: it is a one-time message.
pub fn take_handoff(path: &str) -> Option<Handoff> {
    let text = fs::read_to_string(path).ok()?;
    let _ = fs::remove_file(path);
    serde_json::from_str(&text).ok()
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn reads_the_arguments() {
        let dir = std::env::temp_dir();
        let lrc = dir.join(format!("yaiol-lrce-launch-{}.LRC", std::process::id()));
        fs::write(&lrc, "x").unwrap();
        let lrc_s = lrc.to_string_lossy().into_owned();
        let l = parse(&["--handoff=C:\\tmp\\h.json".to_owned(), lrc_s.clone(), "missing.lrc".to_owned()]);
        assert_eq!(l, Launch { lrc: Some(lrc_s), handoff: Some("C:\\tmp\\h.json".to_owned()) });
        assert!(parse(&[]).is_empty());
        let _ = fs::remove_file(lrc);
    }

    #[test]
    fn a_handoff_is_read_once() {
        let p = std::env::temp_dir().join(format!("yaiol-lrce-handoff-{}.json", std::process::id()));
        fs::write(&p, r#"{ "mediaPath": "a.mp3", "lyrics": "one\ntwo" }"#).unwrap();
        let path = p.to_string_lossy().into_owned();
        let h = take_handoff(&path).unwrap();
        assert_eq!((h.media_path.as_deref(), h.lrc_path, h.lyrics.as_deref()), (Some("a.mp3"), None, Some("one\ntwo")));
        assert!(take_handoff(&path).is_none());
    }
}
