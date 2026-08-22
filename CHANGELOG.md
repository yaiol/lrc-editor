# Changelog

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
