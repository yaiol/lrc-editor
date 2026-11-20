//! The tags of a song file: title, artist, album and length.

use crate::lrc::to_lrc_time;
use lofty::prelude::*;
use std::{fs, path::Path};

#[derive(Clone, Debug, Default, PartialEq)]
pub struct SongTags {
    pub title: Option<String>,
    pub artist: Option<String>,
    pub album: Option<String>,
    /// The length as `mm:ss.xx`, the form the LRC `length` tag takes.
    pub length: Option<String>,
}

/// Read a song's tags. Nothing readable gives an empty set, never an error: tags are a convenience.
pub fn read(path: &Path) -> SongTags {
    match lofty::read_from_path(path) {
        Ok(file) => {
            let tag = file.primary_tag().or_else(|| file.first_tag());
            let text = |v: Option<std::borrow::Cow<'_, str>>| v.map(|s| s.trim().to_owned()).filter(|s| !s.is_empty());
            let secs = file.properties().duration().as_secs_f64();
            SongTags {
                title: tag.and_then(|t| text(t.title())),
                artist: tag.and_then(|t| text(t.artist())),
                album: tag.and_then(|t| text(t.album())),
                length: (secs > 0.0).then(|| to_lrc_time(secs)),
            }
        }
        // ⚠ some valid FLAC files are refused by tag libraries (a non-standard start of file). The
        // blocks are then read directly. Do not remove this fallback.
        Err(_) => fs::read(path).ok().and_then(|bytes| read_flac(&bytes)).unwrap_or_default(),
    }
}

/// A FLAC file's STREAMINFO block (length) and VORBIS_COMMENT block (tags), read straight from the bytes.
fn read_flac(buf: &[u8]) -> Option<SongTags> {
    let start = buf.windows(4).take(64 * 1024).position(|w| w == b"fLaC")?;
    let mut tags = SongTags::default();
    let mut offset = start + 4;
    let u32le = |p: usize| -> Option<usize> { Some(u32::from_le_bytes(buf.get(p..p + 4)?.try_into().ok()?) as usize) };
    while offset + 4 <= buf.len() {
        let head = buf[offset];
        let last = head >> 7 == 1;
        let kind = head & 0x7F;
        let len = (buf[offset + 1] as usize) << 16 | (buf[offset + 2] as usize) << 8 | buf[offset + 3] as usize;
        offset += 4;
        if offset + len > buf.len() {
            break;
        }
        if kind == 0 && len >= 18 {
            let b = &buf[offset..offset + 18];
            let rate = (b[10] as u64) << 12 | (b[11] as u64) << 4 | (b[12] as u64) >> 4;
            let samples = ((b[13] & 0x0F) as u64) << 32 | u32::from_be_bytes([b[14], b[15], b[16], b[17]]) as u64;
            if rate > 0 {
                tags.length = Some(to_lrc_time(samples as f64 / rate as f64));
            }
        } else if kind == 4 {
            let end = offset + len;
            let mut p = offset + 4 + u32le(offset)?;
            if let Some(count) = u32le(p) {
                p += 4;
                for _ in 0..count {
                    let Some(n) = u32le(p) else { break };
                    p += 4;
                    if p + n > end {
                        break;
                    }
                    let entry = String::from_utf8_lossy(&buf[p..p + n]);
                    p += n;
                    if let Some((key, value)) = entry.split_once('=') {
                        let value = Some(value.to_owned());
                        match key.to_ascii_uppercase().as_str() {
                            "TITLE" => tags.title = value,
                            "ARTIST" => tags.artist = value,
                            "ALBUM" => tags.album = value,
                            _ => {}
                        }
                    }
                }
            }
        }
        offset += len;
        if last {
            break;
        }
    }
    Some(tags)
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn a_flac_is_read_block_by_block() {
        let mut f = b"fLaC".to_vec();
        // STREAMINFO: 44100 Hz, 441000 samples = 10 s
        let mut info = vec![0u8; 34];
        let rate: u32 = 44100;
        info[10] = (rate >> 12) as u8;
        info[11] = (rate >> 4) as u8;
        info[12] = ((rate & 0xF) << 4) as u8;
        info[14..18].copy_from_slice(&441000u32.to_be_bytes());
        f.extend([0, 0, 0, 34]);
        f.extend(&info);
        // VORBIS_COMMENT, last block
        let mut vc = Vec::new();
        vc.extend(3u32.to_le_bytes());
        vc.extend(b"ven");
        vc.extend(2u32.to_le_bytes());
        for entry in ["title=Song", "ARTIST=Someone"] {
            vc.extend((entry.len() as u32).to_le_bytes());
            vc.extend(entry.as_bytes());
        }
        f.extend([0x84, 0, 0, vc.len() as u8]);
        f.extend(&vc);
        let tags = read_flac(&f).unwrap();
        assert_eq!(tags.title.as_deref(), Some("Song"));
        assert_eq!(tags.artist.as_deref(), Some("Someone"));
        assert_eq!(tags.length.as_deref(), Some("00:10.00"));
    }

    #[test]
    fn a_missing_file_gives_no_tags() {
        assert_eq!(read(Path::new("no-such-file.mp3")), SongTags::default());
    }
}
