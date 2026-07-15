# LRC Editor

A cross-platform desktop app for creating and time-syncing LRC lyric files with audio tracks.

## What it is

`.lrc` files are what make lyrics scroll in sync with a song in music players and karaoke apps. Producing them by hand is tedious: every line needs an accurate timestamp.

LRC Editor turns that into a single-keypress flow. Load a track, get your lyric lines into the editor, then press one key on each line as the song plays - the current playback position is stamped on the spot, and the selection advances automatically. A built-in reaction-delay compensation corrects for the gap between hearing a line and pressing the key, and a hands-free Verify pass plays the finished file back so you can catch any stamp that drifted.

## Features

- Real-time sync - stamp the current playback position onto a lyric line with a single keypress
- Reaction-delay compensation - subtract a configurable delay to correct for human response time
- Verify pass - play the finished file back hands-free, auto-advancing through every line to catch stamps that land early or late
- Time nudge - shift individual lines earlier or later in configurable millisecond steps
- Global offset - shift the entire file's timing by a fixed amount, stored as the LRC offset tag
- Import `.lrc` and `.txt` lyric files; export `.lrc` and plain `.txt`
- Auto-load a matching `.lrc` when opening an audio file
- Read title, artist, album, and duration from audio tags (mp3, flac, m4a, and more)
- Notepad panel - paste raw lyrics, then bulk-import them into the editor in one click
- Undo / redo with a 50-level undo stack
- Dark and light themes, 3 fonts, and dozens of interface languages including RTL and CJK scripts

## Download

Pre-built installers are available on the [Releases](../../releases) page (Windows `.exe`, macOS `.dmg`, Linux `.AppImage`).

> **Windows note:** SmartScreen may warn on first launch because the app is not code-signed. Click "More info", then "Run anyway".

## Build from source

```bash
npm install
npm run electron:dev   # React (Vite) dev server + Electron together
```

Build platform installers:

```bash
npm run dist        # Windows x64 installer
npm run dist:mac    # macOS DMG
npm run dist:linux  # Linux AppImage
```

## Overview
A React front-end (built with Vite) talks to an Electron + Express back-end over a local HTTP API - the standard yaiol Electron shape. There is no database; settings live in `localStorage`. The Express layer handles all file I/O (open/save `.lrc` and `.txt`), reads audio metadata, and - notably - streams the audio itself.

### Audio streaming - Express byte-range, not a custom protocol

Audio is served through a plain Express route, `GET /audio?path=<base64>`, with **HTTP byte-range (206) support**. This is what makes seeking responsive in large audio files: the `<audio>` element requests only the byte range it needs rather than downloading the whole track. The full URL (including the dynamic API port) is built server-side and returned by `/open-music`, so the renderer uses it as-is for `audio.src`. Supported formats: mp3, wav, ogg, opus, flac, m4a, aac.

### Metadata - music-metadata with a manual FLAC fallback

Tag and duration reading uses the [`music-metadata`](https://www.npmjs.com/package/music-metadata) library. Some otherwise-valid FLAC files make it throw "Invalid FLAC preamble"; the back-end catches that and falls back to an in-house binary parser that reads STREAMINFO (duration) and VORBIS_COMMENT (tags) straight from the FLAC block structure. This fallback is load-bearing for FLAC support.

### Tech stack

| Layer | Technology |
|---|---|
| UI framework | React 19 |
| Build tool | Vite |
| Desktop shell | Electron 41 |
| Local API | Express 5 |
| Audio metadata | music-metadata 11 (+ manual FLAC parser) |
| Packaging | Electron Builder |

## License / links
LRC Editor is part of [yaiol Applications](https://apps.yaiol.com).

Released under the [MIT License](LICENSE).
