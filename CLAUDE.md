# Fixture repository conventions

This repo is a fixture for testing an agent that resolves Sentry issues. It contains
a `backend/` (Fastify + TypeScript), a `frontend/` (Vite + React), and `sentry/`
event payloads that reproduce known errors.

## Commit naming

Every bug and its corresponding fix MUST carry a sequential numeric id, and the fix
shares the id of the bug it resolves:

- `<id>-bug: <description>` — a commit that introduces / reproduces an error
- `<id>-fix: <description>` — the commit that fixes that same error

The id increments per bug/fix pair: `1-bug` / `1-fix`, then `2-bug` / `2-fix`, then
`3-bug` / `3-fix`, `4`, and so on.

Example history:

```
1-bug: return variable that does not exist
1-fix: return existing variable
2-bug: cant read properties of undefined
2-fix: validate name query param on GET /greeting
```

## Tags

Each reproducing `<id>-bug` commit is tagged `<id>-bug` so the error can be checked
out and reproduced directly:

```
git checkout 1-bug   # ReferenceError
git checkout 2-bug   # TypeError: Cannot read properties of undefined
```

The matching Sentry event payload lives in `sentry/<id>-bug.json`.
