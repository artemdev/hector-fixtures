# Fixture conventions

Fixture repo for testing a Sentry-issue-resolving agent (`backend/`, `frontend/`, `sentry/`).

- **Commits:** each bug + its fix share a numeric id — `<id>-bug: …` / `<id>-fix: …` (`1`, `2`, `3`, …).
- **Tags:** each `<id>-bug` commit is tagged `<id>-<error-type>-<description>` (e.g. `1-reference-error-undefined-variable`).
- **Sentry fixture:** named `sentry/<tag>.json` — same stem as the tag.
