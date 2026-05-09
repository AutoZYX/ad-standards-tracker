# Contributing

AD Standards Tracker accepts data corrections, source updates, new records, and engineering interpretations for safety-relevant standards.

The project is looking for co-maintainers with standards, regulatory, assessment, functional safety, SOTIF, safety case, or AD/ADAS testing experience. The goal is to turn this from a personal open-source project into an industry-shared safety standards evidence map.

## Contributor Tracks

- Data reviewer: verify titles, dates, versions, legal effect, and original URLs.
- Standards expert: improve scope, exclusions, engineering use, and expert notes.
- Source maintainer: track ISO, SAE, IEEE, UL, UNECE, SAC/TC114, NCAP, and national regulators.
- Tooling maintainer: improve schema validation, URL checks, crawler modules, and CI.
- Website maintainer: improve navigation, bilingual content, accessibility, and Ask context.

## Co-Maintainer Ownership

Co-maintainers do not need to own the whole project. A useful ownership unit is one source family, one topic map, or one tooling area.

Examples:

- ISO / SAE / IEEE / UNECE source family
- China GB / SAC/TC114 / MIIT source family
- NCAP and assessment protocol source family
- Functional safety, SOTIF, safety case, or scenario-testing topic map
- URL checks, schema validation, crawler modules, or Ask context

For safety-critical areas, open an issue first and state the evidence boundary before changing data.

Safety-critical records should be reviewed conservatively. If a claim cannot be traced to a primary source or a clearly marked secondary source, do not add it.

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
