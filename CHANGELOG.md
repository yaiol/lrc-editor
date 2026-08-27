# Changelog

## 1.0.6 — 2026-08-27

- The playback cursor now marks where the player actually is in every state. It moved only while the track was playing and disappeared on stop; it now follows pauses and seeks too, so a freshly loaded file shows it on Start of Music - where pressing Play would begin. It is grey at rest and accent while the track is running
- Only one row carries a cursor at a time. The Start of Music row's ▶ was permanently lit and the selected line carried an arrow of its own, so two or three could show at once and none of them meant "the player is here". The ▶ now marks the cursor row, and otherwise appears only under the pointer when you are on the button itself - pointing at a line's text no longer offers an arrow that would not have played from there
- The version shown in the header and About line now includes the build number when you are running a buffered build, so two builds of the same release are told apart. Released builds show the plain version exactly as before
- Add the svgr icon pipeline - .svg files in src/assets compile to React components at build time, so a custom icon stays an editable file and inherits its button's colour

## 1.0.5 — 2026-08-23

- All three Open dialogs — audio, lyrics, and plain text — reopen in the folder they last used instead of starting in Downloads, each remembered separately and kept across restarts
- The header help button and the update banner's What's new / Download links open the page in the app's own language. They had been addressed through a four-language allowlist that silently sent every other UI language to English; they are now directory URLs in the app's language, and the site's own fallback decides what to serve
- Update the dev toolchain — Electron 42 → 43, Vite 8.1 → 8.2, lucide-react 1.21 → 1.33, music-metadata 11.13 → 11.15, plus patch bumps to React, @vitejs/plugin-react, concurrently, wait-on, brace-expansion and picomatch
- Rename `vite.config.js` to `vite.config.mjs` — the package declares no `type: module`, so the ESM config has to announce itself by extension

## 1.0.4 — 2026-08-22

- Adopt the shared UI catalog through v7 — the `.count.over` badge (a count drawn inside an icon button so the button keeps its width), the `.pop-form` / `.pop-field` popover-panel classes, a containing block on `.btn.icon` for that badge, and the `--tag` / `--env` identity colour tokens. LRC Editor uses none of them yet; its copy is kept in step so the next feature can
- Language modules now emit to `src/i18n-gen/lang/<lang>.js`, with English staying at the root. The dynamic import used to target its own directory, which made the bundler stop analyzing it and turned the chunks it should emit into a runtime gamble; English being both statically and dynamically imported was reported as a defect on every build. Both are gone and the runtime is unchanged
- Shorten the app-icon marker comment in `electron/main.mjs` to just the `data-icon` tag

## 1.0.3 — 2026-08-17

- Fix the release build failing on GitHub — the pre-build step reached outside the repository for the translation splitter, which exists only in the local workspace
- Ship the translation splitter inside the repository as scripts/i18n-split.mjs, so a clone builds with npm alone

## 1.0.2 — 2026-08-17

- Split the translations into one chunk per language, loaded on demand, so the entry bundle no longer carries all 50
- Add opt-in main-process startup timing, silent unless YAIOL_STARTUP_LOG is set

## 1.0.1 — 2026-07-28

- Repair out-of-order timestamps automatically when a lyrics file is opened — a line stamped after the one that follows it is pulled back before it
- Cascade both ways when a line is synced, so a stamp can never land before its predecessor
- Fix the cascade skipping unsynced lines, which could reset a timestamped line to zero
- Default the TXT export to the folder and filename of the LRC being edited
- Adopt the shared toast control — messages now wrap instead of running off-screen, and stay 3 s

## 1.0.0 — 2026-07-15

- Initial release
