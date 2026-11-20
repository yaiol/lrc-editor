//! The files beside a song: its lyrics, and the song beside a lyrics file.

use std::{
    fs, io,
    path::{Path, PathBuf},
};

/// The song formats the app opens, in the order a song is looked for beside a lyrics file.
pub const AUDIO_EXTS: [&str; 7] = ["mp3", "wav", "flac", "m4a", "ogg", "opus", "aac"];
pub const LYRICS_EXTS: [&str; 2] = ["lrc", "txt"];

/// The lower-case extension of a path, without the dot.
pub fn ext(path: &Path) -> String {
    path.extension().map(|e| e.to_string_lossy().to_lowercase()).unwrap_or_default()
}

pub fn is_audio(path: &Path) -> bool {
    AUDIO_EXTS.contains(&ext(path).as_str())
}

pub fn is_lyrics(path: &Path) -> bool {
    LYRICS_EXTS.contains(&ext(path).as_str())
}

/// A text file as a string. A byte-order mark is dropped; bytes that are not UTF-8 are replaced, never refused.
pub fn read_text(path: &Path) -> io::Result<String> {
    let bytes = fs::read(path)?;
    let text = String::from_utf8_lossy(&bytes);
    Ok(text.strip_prefix('\u{feff}').unwrap_or(&text).to_owned())
}

/// The `.lrc` with the same name beside a song, when it exists.
pub fn lrc_beside(song: &Path) -> Option<PathBuf> {
    let lrc = song.with_extension("lrc");
    lrc.is_file().then_some(lrc)
}

/// The song with the same name beside a lyrics file, when one exists.
pub fn song_beside(lyrics: &Path) -> Option<PathBuf> {
    AUDIO_EXTS.iter().map(|e| lyrics.with_extension(e)).find(|p| p.is_file())
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn finds_the_file_beside() {
        let dir = std::env::temp_dir().join(format!("yaiol-lrce-files-{}", std::process::id()));
        fs::create_dir_all(&dir).unwrap();
        let song = dir.join("My Song.flac");
        let lrc = dir.join("My Song.lrc");
        assert_eq!(lrc_beside(&song), None);
        fs::write(&song, b"x").unwrap();
        fs::write(&lrc, "\u{feff}[00:01.00] a").unwrap();
        assert_eq!(lrc_beside(&song), Some(lrc.clone()));
        assert_eq!(song_beside(&lrc), Some(song.clone()));
        assert_eq!(read_text(&lrc).unwrap(), "[00:01.00] a");
        assert!(is_audio(&song) && is_lyrics(&lrc) && !is_audio(&lrc));
        let _ = fs::remove_dir_all(dir);
    }
}
