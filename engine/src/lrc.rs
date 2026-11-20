//! The LRC document: its lines, its tags, reading and writing the file format, and every rule about
//! timestamps (the cascade that keeps lines in order, the repair of a file that arrives out of order).
//!
//! ⚠ line order NEVER changes - there is no sort here or anywhere in the app. A time of exactly
//! 0 means "not synced yet": such a line is never given a time by a cascade and never used as a neighbour.

/// The gap, in seconds, put between two lines when a time change pushes a neighbour.
pub const CASCADE_GAP: f64 = 0.5;

#[derive(Clone, Debug, PartialEq, Default)]
pub struct Line {
    pub time: f64,
    pub text: String,
}

#[derive(Clone, Debug, PartialEq, Default)]
pub struct Lrc {
    pub artist: String,
    pub album: String,
    pub title: String,
    pub songwriter: String,
    pub length: String,
    pub lrc_by: String,
    pub offset_ms: i64,
    pub editor: String,
    pub editor_version: String,
    pub lines: Vec<Line>,
}

/// Seconds as `mm:ss.xx`.
pub fn to_lrc_time(seconds: f64) -> String {
    let centis = (seconds.max(0.0) * 100.0).round() as u64;
    format!("{:02}:{:02}.{:02}", centis / 6000, (centis / 100) % 60, centis % 100)
}

/// `m:ss.xx` (1 to 5 digits of minutes) as seconds; anything else is `None`.
pub fn from_lrc_time(text: &str) -> Option<f64> {
    let (mins, rest) = text.split_once(':')?;
    let (secs, hundredths) = rest.split_once('.')?;
    let digits = |s: &str| !s.is_empty() && s.bytes().all(|b| b.is_ascii_digit());
    if !(1..=5).contains(&mins.len()) || secs.len() != 2 || hundredths.len() != 2 || !digits(mins) || !digits(secs) || !digits(hundredths) {
        return None;
    }
    Some(mins.parse::<f64>().ok()? * 60.0 + secs.parse::<f64>().ok()? + hundredths.parse::<f64>().ok()? * 0.01)
}

/// Seconds as `mm:ss`, or `--:--` when there is no usable time.
pub fn format_clock(seconds: f64) -> String {
    if !seconds.is_finite() || seconds < 0.0 {
        return "--:--".to_owned();
    }
    let s = seconds.floor() as u64;
    format!("{:02}:{:02}", s / 60, s % 60)
}

pub fn parse(text: &str) -> Lrc {
    let mut lrc = Lrc::default();
    for raw in text.replace('\r', "").split('\n') {
        let line = raw.trim_start();
        let Some(end) = line.find(']') else { continue };
        if !line.starts_with('[') || end == 0 {
            continue;
        }
        let inner = &line[1..end];
        let rest = line[end + 1..].trim_start();
        if let Some(time) = from_lrc_time(inner) {
            lrc.lines.push(Line { time, text: rest.to_owned() });
        } else if lrc.lines.is_empty() {
            if let Some((key, value)) = inner.split_once(':') {
                let value = value.to_owned();
                match key.trim() {
                    "ar" => lrc.artist = value,
                    "al" => lrc.album = value,
                    "ti" => lrc.title = value,
                    "au" => lrc.songwriter = value,
                    "length" => lrc.length = value,
                    "by" => lrc.lrc_by = value,
                    "offset" => lrc.offset_ms = value.trim().parse().unwrap_or(0),
                    "re" => lrc.editor = value,
                    "ve" => lrc.editor_version = value,
                    _ => {}
                }
            }
        }
    }
    lrc
}

pub fn export(lrc: &Lrc) -> String {
    let mut out: Vec<String> = Vec::new();
    let mut tag = |key: &str, value: &str| {
        if !value.is_empty() {
            out.push(format!("[{key}:{value}]"));
        }
    };
    tag("ar", &lrc.artist);
    tag("al", &lrc.album);
    tag("ti", &lrc.title);
    tag("au", &lrc.songwriter);
    tag("length", &lrc.length);
    tag("by", &lrc.lrc_by);
    if lrc.offset_ms != 0 {
        out.push(format!("[offset:{}{}]", if lrc.offset_ms > 0 { "+" } else { "" }, lrc.offset_ms));
    }
    let mut tag = |key: &str, value: &str| {
        if !value.is_empty() {
            out.push(format!("[{key}:{value}]"));
        }
    };
    tag("re", &lrc.editor);
    tag("ve", &lrc.editor_version);
    if !out.is_empty() {
        out.push(String::new());
    }
    out.extend(lrc.lines.iter().map(|l| format!("[{}] {}", to_lrc_time(l.time), l.text)));
    out.join("\n")
}

/// A loaded LRC ends with an empty timed line when it carries an "end of lyrics" time: that line is
/// taken off the list and its time returned (0 = none).
pub fn take_end_of_lyrics(lines: &mut Vec<Line>) -> f64 {
    match lines.last() {
        Some(last) if last.text.is_empty() => lines.pop().map(|l| l.time).unwrap_or(0.0),
        _ => 0.0,
    }
}

/// Plain lyrics, one line per text line, none synced.
pub fn lines_from_text(text: &str) -> Vec<Line> {
    text.replace('\r', "").split('\n').map(|t| Line { time: 0.0, text: t.to_owned() }).collect()
}

/// The notepad's text as lyric lines: section marks in square brackets and asides in round brackets are
/// dropped, indents removed, runs of blank lines reduced to one, blank lines at both ends removed.
/// Empty when the notepad holds nothing.
pub fn lines_from_notepad(text: &str) -> Vec<Line> {
    if text.trim().is_empty() {
        return Vec::new();
    }
    let strip = |line: &str, open: char, close: char| -> String {
        let mut out = String::new();
        let mut rest = line;
        while let Some(a) = rest.find(open) {
            match rest[a..].find(close) {
                Some(b) => {
                    out.push_str(&rest[..a]);
                    rest = &rest[a + b + close.len_utf8()..];
                }
                None => break,
            }
        }
        out.push_str(rest);
        out
    };
    let mut lines: Vec<String> = Vec::new();
    for (i, raw) in text.replace('\r', "").split('\n').enumerate() {
        let line = strip(&strip(raw, '[', ']'), '(', ')');
        let line = if i == 0 { line } else { line.trim_start_matches(' ').to_owned() };
        lines.push(line);
    }
    // at most one blank line in a row
    let mut kept: Vec<String> = Vec::new();
    for line in lines {
        if line.is_empty() && kept.last().is_some_and(|l| l.is_empty()) {
            continue;
        }
        kept.push(line);
    }
    while kept.first().is_some_and(|l| l.is_empty()) {
        kept.remove(0);
    }
    while kept.last().is_some_and(|l| l.is_empty()) {
        kept.pop();
    }
    if kept.is_empty() {
        kept.push(String::new());
    }
    kept.into_iter().map(|text| Line { time: 0.0, text }).collect()
}

/// Give line `index` a new time, then push its neighbours so the order holds: earlier lines are pulled
/// back and later lines pushed forward, each by `CASCADE_GAP` from the one before, until nothing is out
/// of order. Unsynced lines (time 0) are skipped: never stamped, never compared against.
pub fn apply_time_change(lines: &[Line], index: usize, new_time: f64) -> Vec<Line> {
    let mut result = lines.to_vec();
    let Some(old) = lines.get(index).map(|l| l.time) else { return result };
    let clamped = new_time.max(0.0);
    if clamped == old {
        return result;
    }
    result[index].time = clamped;
    if clamped < old {
        let mut next = clamped;
        for i in (0..index).rev() {
            if result[i].time == 0.0 {
                continue;
            }
            if result[i].time < next {
                break;
            }
            if next - CASCADE_GAP <= 0.0 {
                break; // no room left before the start of the track
            }
            result[i].time = next - CASCADE_GAP;
            next = result[i].time;
        }
    } else {
        let mut prev = clamped;
        for line in result.iter_mut().skip(index + 1) {
            if line.time == 0.0 {
                continue;
            }
            if line.time > prev {
                break;
            }
            line.time = prev + CASCADE_GAP;
            prev = line.time;
        }
    }
    result
}

/// A loaded file can carry inverted times (a line stamped AFTER the next one). Order is repaired by
/// pulling the EARLIER line back, never by moving the later one, so every stamp made against the audio
/// keeps its value. Returns the lines and how many were moved.
pub fn normalize_times(lines: &[Line]) -> (Vec<Line>, usize) {
    let mut result = lines.to_vec();
    let mut fixed = 0;
    let mut next: Option<f64> = None;
    for line in result.iter_mut().rev() {
        if line.time == 0.0 {
            continue;
        }
        if let Some(n) = next {
            if line.time >= n {
                // halve instead of subtracting the gap when there is no room before the start of the track
                line.time = if n - CASCADE_GAP > 0.0 { n - CASCADE_GAP } else { n / 2.0 };
                fixed += 1;
            }
        }
        next = Some(line.time);
    }
    (result, fixed)
}

/// The row the playhead sits on: the line with the latest time not after `at`. -1 = before every line;
/// `lines.len()` = the "end of lyrics" row (when `end_of_lyrics` is set and already passed).
pub fn cursor_line(lines: &[Line], end_of_lyrics: f64, at: f64) -> i32 {
    let mut idx = -1;
    let mut best = -1.0;
    for (i, line) in lines.iter().enumerate() {
        if line.time <= at && line.time > best {
            best = line.time;
            idx = i as i32;
        }
    }
    if end_of_lyrics > 0.0 && end_of_lyrics <= at && end_of_lyrics > best {
        idx = lines.len() as i32;
    }
    idx
}

/// The last synced line already reached at `at`, stopping at the first synced line still ahead. -1 = none.
pub fn playing_line(lines: &[Line], at: f64) -> i32 {
    let mut idx = -1;
    for (i, line) in lines.iter().enumerate() {
        if line.time == 0.0 {
            continue;
        }
        if line.time <= at {
            idx = i as i32;
        } else {
            break;
        }
    }
    idx
}

#[cfg(test)]
mod tests {
    use super::*;

    fn lines(times: &[f64]) -> Vec<Line> {
        times.iter().map(|&time| Line { time, text: "x".to_owned() }).collect()
    }
    fn times(lines: &[Line]) -> Vec<f64> {
        lines.iter().map(|l| l.time).collect()
    }

    #[test]
    fn time_text_round_trips() {
        assert_eq!(to_lrc_time(83.456), "01:23.46");
        assert_eq!(to_lrc_time(1.999), "00:02.00");
        assert_eq!(from_lrc_time("01:23.46"), Some(83.46));
        assert_eq!(from_lrc_time("1:23.46"), Some(83.46));
        assert_eq!(from_lrc_time("01:23"), None);
        assert_eq!(from_lrc_time("ar:someone"), None);
    }

    #[test]
    fn parses_tags_then_lines() {
        let lrc = parse("[ar:Artist]\r\n[offset:+250]\n\n[00:01.00] one\n[00:02.50]two\n[ti:ignored after a line]\n");
        assert_eq!(lrc.artist, "Artist");
        assert_eq!(lrc.offset_ms, 250);
        assert_eq!(lrc.title, "");
        assert_eq!(lrc.lines, vec![Line { time: 1.0, text: "one".into() }, Line { time: 2.5, text: "two".into() }]);
    }

    #[test]
    fn export_then_parse_is_the_same_document() {
        let lrc = Lrc { artist: "A".into(), offset_ms: -40, editor: "E".into(), lines: lines(&[1.0, 2.0]), ..Default::default() };
        assert_eq!(parse(&export(&lrc)), lrc);
    }

    #[test]
    fn end_of_lyrics_is_the_trailing_empty_line() {
        let mut l = vec![Line { time: 1.0, text: "a".into() }, Line { time: 9.0, text: String::new() }];
        assert_eq!(take_end_of_lyrics(&mut l), 9.0);
        assert_eq!(l.len(), 1);
        assert_eq!(take_end_of_lyrics(&mut l), 0.0);
    }

    #[test]
    fn a_later_time_pushes_the_lines_after_it() {
        let out = apply_time_change(&lines(&[1.0, 2.0, 0.0, 2.2, 9.0]), 0, 2.1);
        assert_eq!(times(&out), vec![2.1, 2.6, 0.0, 3.1, 9.0]);
    }

    #[test]
    fn an_earlier_time_pulls_the_lines_before_it() {
        let out = apply_time_change(&lines(&[5.0, 0.0, 6.0, 7.0]), 3, 5.2);
        assert_eq!(times(&out), vec![4.2, 0.0, 4.7, 5.2]);
    }

    #[test]
    fn an_unsynced_neighbour_never_drags_a_time_to_zero() {
        let out = apply_time_change(&lines(&[3.0, 0.0, 8.0]), 2, 6.0);
        assert_eq!(times(&out), vec![3.0, 0.0, 6.0]);
    }

    #[test]
    fn a_file_out_of_order_is_repaired_by_moving_the_earlier_line() {
        let (out, fixed) = normalize_times(&lines(&[1.0, 5.0, 3.0, 0.0, 4.0]));
        assert_eq!(times(&out), vec![1.0, 2.5, 3.0, 0.0, 4.0]);
        assert_eq!(fixed, 1);
    }

    #[test]
    fn the_cursor_follows_the_latest_line_reached() {
        let l = lines(&[1.0, 2.0, 0.0, 4.0]);
        assert_eq!(cursor_line(&[], 0.0, 3.0), -1);
        assert_eq!(cursor_line(&l, 0.0, 0.5), 2); // an unsynced line counts as time 0, as in the original
        assert_eq!(cursor_line(&l, 0.0, 2.5), 1);
        assert_eq!(cursor_line(&l, 6.0, 7.0), 4);
        assert_eq!(playing_line(&l, 2.5), 1);
        assert_eq!(playing_line(&l, 0.5), -1);
    }

    #[test]
    fn the_notepad_is_cleaned_into_lines() {
        let l = lines_from_notepad("\n[Verse 1]\n  one (softly)\n\n\n\ntwo\n\n");
        let text: Vec<&str> = l.iter().map(|x| x.text.as_str()).collect();
        assert_eq!(text, vec!["one ", "", "two"]);
        assert!(lines_from_notepad("  \n ").is_empty());
    }
}
