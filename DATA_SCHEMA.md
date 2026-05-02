# AD Standards Tracker Data Schema

This project tracks metadata and source links. It does not redistribute full standard texts.

## Trust Fields

Every high-priority record should explain its evidence chain:

- `legal_force`: binding, voluntary, rating_protocol, guidance, best_practice, informational
- `source_type`: official, official_news, official_catalog, standards_store, secondary, interpretation
- `evidence_level`: A official primary source; B official notice/catalog; C trusted secondary source; D needs review
- `verified_at`: date the link and status were manually checked
- `source_status`: verified, paywalled, blocked, broken, unverified
- `source_note`: short explanation when the URL is not the original text

## Classification

The UI category is a navigation aid, not legal advice:

- Standards: formal technical standards
- Regulations: legal instruments and type-approval rules
- Assessment protocols: NCAP/i-VISTA style consumer or industry rating protocols
- Latest updates: drafts, consultations, notices, reports, interpretations

`legal_force` is the authoritative field for whether an item is binding.

## Validation

Run:

```bash
pnpm validate:data
pnpm check:urls
```

The validator fails on malformed YAML, duplicate IDs, bad dates, invalid enums, URL format problems, and path/date/jurisdiction mismatch. It warns when trust fields are still missing.

For focused URL checks on newly edited records:

```bash
URL_CHECK_IDS=STD-NHTSA-2025-003,STD-IEEE-2025-001 pnpm check:urls
```

Records marked `source_status: blocked` are skipped by default because some official government portals block automated checks while remaining browser-accessible.
