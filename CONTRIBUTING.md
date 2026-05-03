# Contributing

AD Standards Tracker accepts data corrections, source updates, and new records.

## Data Corrections

Edit the relevant YAML file under `standards/<jurisdiction>/<year>/`.

Before submitting:

```bash
pnpm validate:data
pnpm check:urls
pnpm lint
```

Maintainers can run `pnpm backfill:trust` after importing legacy records, then manually review any records marked `blocked`, `unverified`, `secondary`, or `evidence_level: C`.

For a focused URL check on the records you changed:

```bash
URL_CHECK_IDS=STD-EC-2026-001,STD-IEEE-2025-001 pnpm check:urls
```

For source corrections, prefer official links. If only a secondary source is available, mark:

```yaml
source_type: secondary
evidence_level: C
source_note: Explain why an official source is unavailable.
```

## New Records

Each record must include:

- formal title and original source URL
- status and publication date
- `legal_force`
- `source_type`
- `evidence_level`
- `verified_at`
- `source_status`

Do not mark drafts or consultations as binding. NCAP and similar protocols should use `legal_force: rating_protocol`.

If an official source is reachable in a browser but blocks automated checks, use `source_status: blocked` and explain it in `source_note`.

## Review

Use `REVIEW_CHECKLIST.md` for safety-critical or legally relevant records.
