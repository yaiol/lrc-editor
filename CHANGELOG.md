# Changelog

## 1.0.1 — 2026-07-28

- Repair out-of-order timestamps automatically when a lyrics file is opened — a line stamped after the one that follows it is pulled back before it
- Cascade both ways when a line is synced, so a stamp can never land before its predecessor
- Fix the cascade skipping unsynced lines, which could reset a timestamped line to zero
- Default the TXT export to the folder and filename of the LRC being edited
- Adopt the shared toast control — messages now wrap instead of running off-screen, and stay 3 s

## 1.0.0 — 2026-07-15

- Initial release
