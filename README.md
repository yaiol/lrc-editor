# LRC Editor

LRC Editor is part of [yaiol Applications](https://apps.yaiol.com).

## Install

Download the latest installer from the [releases page](../../releases/latest).

## Build from source

Requires the Rust toolchain (stable) and, for the installer, the Dioxus CLI (`cargo install dioxus-cli`).

```bash
cargo run                                         # run in development
cd app && dx bundle --desktop --release --package-types nsis   # Windows installer → release/
```

## Architecture

A Cargo workspace of two crates:

- `engine/` — everything that is not the window: the LRC format and its timing rules, reading a song's
  tags, and a small local server that feeds the song to the player (with byte ranges, so seeking works)
  and lets a second launch open its file in the window already running. No UI dependency.
- `app/` — the Dioxus desktop shell. The look comes from the shared stylesheet in `app/assets/`;
  strings come from `locales/<lang>.json`, embedded in the executable at build time.
