# Source Policy

AD Standards Tracker treats source quality as part of the data.

## Evidence Levels

- A: original official standard/regulation/protocol page or official legal text
- B: official notice, official catalog page, standards-store metadata, or official press release
- C: reputable secondary source when the official page is unavailable or hard to link
- D: placeholder or needs-review source

## Rules

- Prefer original official links over media coverage.
- If a standard text is paywalled, link to the official catalog/store page and mark `source_status: paywalled`.
- If only a secondary source is available, mark `source_type: secondary`, `evidence_level: C`, and explain why in `source_note`.
- If an official source is browser-accessible but blocks automated URL checks, use `source_status: blocked` rather than downgrading it to a secondary source.
- Do not mark drafts or consultations as `legal_force: binding`.
- Do not place news, roadmaps, meeting notices, or interpretations in the formal standards bucket by changing `type`; use `type` and `status` honestly.

## Correction Priority

Highest-priority records for manual review:

1. Binding regulations and mandatory GB standards
2. Type-approval rules and ADS safety requirements
3. NCAP assessment protocols
4. ISO/SAE/IEEE/UL/ASAM standards used in safety cases
5. Best-practice frameworks such as UL 4600 and JAMA SAKURA
