# Changelog

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
