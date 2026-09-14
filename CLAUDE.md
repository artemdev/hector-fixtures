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

## Tag naming

Every reproducing `<id>-bug` commit MUST be tagged with a descriptive name of the form:

```
<id>-<error-type>-<description>
```

- `<id>` — the same numeric id as the bug/fix pair (`1`, `2`, `3`, …)
- `<error-type>` — the error class, kebab-cased (e.g. `reference-error`, `type-error`)
- `<description>` — a short kebab-cased summary of the specific failure

The Sentry event payload for a tag MUST be named `sentry/<tag>.json` (tag name and
fixture filename stem are identical), so each error has one consistent id-linked name
across its commit, tag, and Sentry fixture.

Examples:

```
git checkout 1-reference-error-undefined-variable   # ReferenceError: stateNonExistent is not defined
git checkout 2-type-error-cannot-read-undefined      # TypeError: Cannot read properties of undefined (reading 'trim')
```

| id | commit         | tag                                    | sentry fixture                                  |
|----|----------------|----------------------------------------|-------------------------------------------------|
| 1  | `1-bug`/`1-fix`| `1-reference-error-undefined-variable` | `sentry/1-reference-error-undefined-variable.json` |
| 2  | `2-bug`/`2-fix`| `2-type-error-cannot-read-undefined`   | `sentry/2-type-error-cannot-read-undefined.json`   |
