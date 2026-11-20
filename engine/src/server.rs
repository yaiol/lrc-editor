//! A small server on this machine only, with two jobs:
//!
//! 1. It gives a song file to the page's player, with byte ranges, so seeking in a large file works.
//! 2. It is how a second launch reaches the window that is already open: the second process sends what it
//!    was asked to open and ends (one window, one tab per song).
//!
//! Every address carries a token made at start, so another program on the machine cannot read files
//! through it by guessing the port.

use crate::launch::Launch;
use std::{
    fs,
    hash::{BuildHasher, Hasher},
    io::{self, Read, Seek, SeekFrom, Write},
    net::{TcpListener, TcpStream},
    path::{Path, PathBuf},
    sync::mpsc::{self, Receiver, Sender},
    thread,
    time::Duration,
};

pub struct Server {
    port: u16,
    token: String,
}

fn random_token() -> String {
    let part = || std::collections::hash_map::RandomState::new().build_hasher().finish();
    format!("{:016x}{:016x}", part(), part())
}

fn hex(bytes: &[u8]) -> String {
    bytes.iter().map(|b| format!("{b:02x}")).collect()
}

fn unhex(text: &str) -> Option<Vec<u8>> {
    if text.len() % 2 != 0 {
        return None;
    }
    (0..text.len()).step_by(2).map(|i| u8::from_str_radix(text.get(i..i + 2)?, 16).ok()).collect()
}

fn mime(path: &Path) -> &'static str {
    match crate::files::ext(path).as_str() {
        "wav" => "audio/wav",
        "ogg" | "opus" => "audio/ogg",
        "flac" => "audio/flac",
        "m4a" => "audio/mp4",
        "aac" => "audio/aac",
        _ => "audio/mpeg",
    }
}

impl Server {
    /// Start listening. The receiver yields what later launches ask to open.
    pub fn start() -> io::Result<(Server, Receiver<Launch>)> {
        let listener = TcpListener::bind("127.0.0.1:0")?;
        let port = listener.local_addr()?.port();
        let token = random_token();
        let (tx, rx) = mpsc::channel();
        let expected = token.clone();
        thread::spawn(move || {
            for stream in listener.incoming().flatten() {
                let (token, tx) = (expected.clone(), tx.clone());
                thread::spawn(move || {
                    let _ = handle(stream, &token, &tx);
                });
            }
        });
        Ok((Server { port, token }, rx))
    }

    /// The address the page's player loads a song from.
    pub fn audio_url(&self, song: &Path) -> String {
        format!("http://127.0.0.1:{}/audio/{}/{}", self.port, self.token, hex(song.to_string_lossy().as_bytes()))
    }

    /// Record this server as the running app, for later launches to find.
    pub fn write_instance(&self, file: &Path) {
        if let Some(dir) = file.parent() {
            let _ = fs::create_dir_all(dir);
        }
        let _ = fs::write(file, format!("{}\n{}", self.port, self.token));
    }
}

/// Hand a launch to the app already running, if there is one. `true` = it took it, so this process ends.
pub fn forward_to_running(instance_file: &Path, launch: &Launch) -> bool {
    let Ok(text) = fs::read_to_string(instance_file) else { return false };
    let mut parts = text.lines();
    let (Some(port), Some(token)) = (parts.next().and_then(|p| p.parse::<u16>().ok()), parts.next()) else { return false };
    let Ok(body) = serde_json::to_string(launch) else { return false };
    let Ok(mut stream) = TcpStream::connect_timeout(&([127, 0, 0, 1], port).into(), Duration::from_millis(500)) else { return false };
    let _ = stream.set_read_timeout(Some(Duration::from_secs(2)));
    let request = format!("POST /launch/{token} HTTP/1.1\r\nHost: 127.0.0.1\r\nContent-Length: {}\r\nConnection: close\r\n\r\n{body}", body.len());
    if stream.write_all(request.as_bytes()).is_err() {
        return false;
    }
    let mut answer = String::new();
    let _ = stream.read_to_string(&mut answer);
    answer.starts_with("HTTP/1.1 200")
}

fn respond(stream: &mut TcpStream, status: &str, body: &str) -> io::Result<()> {
    write!(stream, "HTTP/1.1 {status}\r\nContent-Length: {}\r\nConnection: close\r\n\r\n{body}", body.len())
}

fn handle(mut stream: TcpStream, token: &str, tx: &Sender<Launch>) -> io::Result<()> {
    stream.set_read_timeout(Some(Duration::from_secs(5)))?;
    // The request's head, up to the blank line; whatever follows it in the same read is the start of the body.
    let mut buf = Vec::new();
    let mut chunk = [0u8; 2048];
    let head_end = loop {
        if let Some(i) = buf.windows(4).position(|w| w == b"\r\n\r\n") {
            break i + 4;
        }
        let n = stream.read(&mut chunk)?;
        if n == 0 || buf.len() > 64 * 1024 {
            return Ok(());
        }
        buf.extend_from_slice(&chunk[..n]);
    };
    let head = String::from_utf8_lossy(&buf[..head_end]).into_owned();
    let mut lines = head.split("\r\n");
    let mut first = lines.next().unwrap_or("").split(' ');
    let (method, target) = (first.next().unwrap_or(""), first.next().unwrap_or(""));
    let header = |name: &str| {
        head.split("\r\n").skip(1).find_map(|l| {
            let (k, v) = l.split_once(':')?;
            k.eq_ignore_ascii_case(name).then(|| v.trim().to_owned())
        })
    };
    let parts: Vec<&str> = target.trim_start_matches('/').split('/').collect();

    match (method, parts.as_slice()) {
        ("GET", ["audio", t, path]) if *t == token => {
            let Some(path) = unhex(path).and_then(|b| String::from_utf8(b).ok()).map(PathBuf::from) else {
                return respond(&mut stream, "400 Bad Request", "");
            };
            serve_file(&mut stream, &path, header("range").as_deref())
        }
        ("POST", ["launch", t]) if *t == token => {
            let length: usize = header("content-length").and_then(|v| v.parse().ok()).unwrap_or(0);
            let mut body = buf[head_end..].to_vec();
            while body.len() < length.min(1024 * 1024) {
                let n = stream.read(&mut chunk)?;
                if n == 0 {
                    break;
                }
                body.extend_from_slice(&chunk[..n]);
            }
            match serde_json::from_slice::<Launch>(&body) {
                Ok(launch) => {
                    let _ = tx.send(launch);
                    respond(&mut stream, "200 OK", "ok")
                }
                Err(_) => respond(&mut stream, "400 Bad Request", ""),
            }
        }
        _ => respond(&mut stream, "404 Not Found", ""),
    }
}

/// `bytes=<start>-<end?>` against a file of `total` bytes, as the first and last byte to send.
fn byte_range(range: &str, total: u64) -> Option<(u64, u64)> {
    let (start, end) = range.trim().strip_prefix("bytes=")?.split_once('-')?;
    let last = total.checked_sub(1)?;
    if start.is_empty() {
        // the last N bytes
        let n: u64 = end.parse().ok()?;
        return Some((total.saturating_sub(n), last));
    }
    let start: u64 = start.parse().ok()?;
    let end = if end.is_empty() { last } else { end.parse::<u64>().ok()?.min(last) };
    (start <= end).then_some((start, end))
}

fn serve_file(stream: &mut TcpStream, path: &Path, range: Option<&str>) -> io::Result<()> {
    let Ok(mut file) = fs::File::open(path) else { return respond(stream, "404 Not Found", "") };
    let total = file.metadata()?.len();
    let kind = mime(path);
    let (start, end) = match range {
        Some(r) => match byte_range(r, total) {
            Some(se) => se,
            None => {
                return write!(stream, "HTTP/1.1 416 Range Not Satisfiable\r\nContent-Range: bytes */{total}\r\nContent-Length: 0\r\nConnection: close\r\n\r\n");
            }
        },
        None => (0, total.saturating_sub(1)),
    };
    let length = if total == 0 { 0 } else { end - start + 1 };
    if range.is_some() {
        write!(stream, "HTTP/1.1 206 Partial Content\r\nContent-Type: {kind}\r\nContent-Range: bytes {start}-{end}/{total}\r\nAccept-Ranges: bytes\r\nContent-Length: {length}\r\nConnection: close\r\n\r\n")?;
    } else {
        write!(stream, "HTTP/1.1 200 OK\r\nContent-Type: {kind}\r\nAccept-Ranges: bytes\r\nContent-Length: {length}\r\nConnection: close\r\n\r\n")?;
    }
    file.seek(SeekFrom::Start(start))?;
    // The player drops the connection when it seeks elsewhere: that write error just ends this answer.
    io::copy(&mut file.take(length), stream).map(|_| ())
}

#[cfg(test)]
mod tests {
    use super::*;

    fn get(port: u16, target: &str, range: Option<&str>) -> String {
        let mut s = TcpStream::connect(("127.0.0.1", port)).unwrap();
        let range = range.map(|r| format!("Range: {r}\r\n")).unwrap_or_default();
        write!(s, "GET {target} HTTP/1.1\r\nHost: x\r\n{range}\r\n").unwrap();
        let mut out = String::new();
        s.read_to_string(&mut out).unwrap();
        out
    }

    #[test]
    fn ranges() {
        assert_eq!(byte_range("bytes=0-", 10), Some((0, 9)));
        assert_eq!(byte_range("bytes=2-5", 10), Some((2, 5)));
        assert_eq!(byte_range("bytes=2-50", 10), Some((2, 9)));
        assert_eq!(byte_range("bytes=-3", 10), Some((7, 9)));
        assert_eq!(byte_range("bytes=20-", 10), None);
        assert_eq!(byte_range("bytes=0-", 0), None);
    }

    #[test]
    fn serves_a_song_in_ranges_and_refuses_a_wrong_token() {
        let (server, _rx) = Server::start().unwrap();
        let song = std::env::temp_dir().join(format!("yaiol-lrce-server-{} é.mp3", std::process::id()));
        fs::write(&song, b"0123456789").unwrap();
        let target = server.audio_url(&song).split_once(&server.port.to_string()).unwrap().1.to_owned();

        let whole = get(server.port, &target, None);
        assert!(whole.starts_with("HTTP/1.1 200") && whole.ends_with("0123456789"), "{whole}");
        let part = get(server.port, &target, Some("bytes=2-5"));
        assert!(part.starts_with("HTTP/1.1 206") && part.contains("Content-Range: bytes 2-5/10") && part.ends_with("2345"), "{part}");
        let bad = get(server.port, &target.replace(&server.token, "0000"), None);
        assert!(bad.starts_with("HTTP/1.1 404"), "{bad}");
        let _ = fs::remove_file(song);
    }

    #[test]
    fn a_second_launch_reaches_the_running_app() {
        let (server, rx) = Server::start().unwrap();
        let file = std::env::temp_dir().join(format!("yaiol-lrce-instance-{}", std::process::id()));
        server.write_instance(&file);
        let launch = Launch { lrc: Some("C:\\songs\\a b.lrc".to_owned()), handoff: None };
        assert!(forward_to_running(&file, &launch));
        assert_eq!(rx.recv_timeout(Duration::from_secs(2)).unwrap(), launch);
        // nothing listening behind a stale record: this process becomes the app
        fs::write(&file, "1\nnope").unwrap();
        assert!(!forward_to_running(&file, &launch));
        let _ = fs::remove_file(file);
    }
}
