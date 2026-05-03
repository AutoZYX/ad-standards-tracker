# 2026-05-03 Data Accuracy Audit

This audit was triggered after a user identified an unsupported record on the Evidence Maps page.
The immediate issue was `STD-SAC-2025-001`, titled "智能网联汽车 远程操作技术要求（征求意见稿）".
Its URL pointed only to the CATARC home page and the claimed technical details could not be
verified from an original or reliable secondary source.

## Policy Change

- HTTP 200 is no longer enough to call a record verified.
- Evidence A/B records may not use a generic home page, broad portal page, or generic consultation
  index as the source URL.
- Mandatory `GB` records must not be marked as voluntary.
- Evidence maps should prefer records with original or catalog-backed evidence. Evidence C updates
  should not be used as core map anchors unless there is an explicit caveat.

## Removed Records

These records were removed from the public dataset because their source links did not prove the
specific title, date, status, or technical claims in the YAML record.

| ID | Reason |
| --- | --- |
| `STD-SAC-2025-001` | Unsupported teleoperation draft; source was CATARC home page; exact standard and technical claims could not be verified. |
| `STD-MOT-2025-001` | Unsupported autonomous taxi operation notice; source was MoT home page. |
| `STD-SC34-2026-001` | Meeting notice with only CATARC home page source. |
| `STD-EC-2025-001` | Unsupported GSR-II evidence-call record; source was European Commission transport home page. |
| `STD-MLIT-2024-001` | Unsupported Japan Level 4 safety-assurance guideline record; source was MLIT English home page. |
| `STD-KMOLIT-2022-001` | Unsupported K-City guideline record; source was MOLIT English home page. |
| `STD-KMOLIT-2025-001` | Unsupported Korea draft presidential decree record; source was MOLIT English home page. |
| `STD-CAERI-2023-001` | i-VISTA record used only a generic i-VISTA home page. |
| `STD-CAERI-2024-001` | i-VISTA record used only a generic CAERI home page. |
| `STD-CAERI-2025-001` | i-VISTA NCA record used only a generic i-VISTA home page. |
| `STD-SAMR-2024-001` | Generic SAMR GB search page; duplicated or conflicted with later MIIT/SAMR L2 draft records. |
| `STD-UK-2025-001` | Generic GOV.UK consultation index; overlapped with stronger UK implementation and safety-principles records. |
| `STD-MIIT-2025-001` | Duplicate/incorrect first-round L2 draft record; replaced by `STD-MIIT-2025-002` using the MIIT original consultation page. |
| `STD-NHTSA-2023-001` | Recall record used generic NHTSA recalls page; not a standard/regulation and not source-specific. |
| `STD-CA-DMV-2024-001` | Generic California DMV AV page; specific heavy-duty truck amendment could not be verified from the provided link. |
| `STD-CA-DMV-2026-001` | Duplicate/speculative heavy-duty truck consultation record with generic California DMV source. |
| `STD-NHTSA-2025-002` | Generic Federal Register agency page; the claimed FMVSS 150 V2X rulemaking record was not source-specific. |
| `STD-CA-DMV-2023-001` | Generic California DMV AV landing page; date and Title 13 interpretation were not source-specific enough for a standalone record. |
| `STD-CA-DMV-2026-002` | Deployment-program landing page was over-interpreted as post-Cruise updated guidance. |

## Corrected Records

| ID | Correction |
| --- | --- |
| `STD-MIIT-2023-001` | Replaced MIIT home page with original MIIT notice URL and upgraded to Evidence A. |
| `STD-MIIT-2024-001` | Replaced MIIT home page with original MIIT news URL for the first 9 pilot consortia. |
| `STD-MIIT-2025-002` | Replaced SAMR project URL with original MIIT consultation URL for the first-round L2 mandatory GB draft. |
| `STD-SAC-2020-001` | Corrected `legal_force` from voluntary to binding for GB 39732-2020. |
| `STD-SAC-2024-002` | Corrected `legal_force` from voluntary to binding for GB 44497-2024. |
| `lib/evidence-map.ts` | Removed unverifiable records from maps and removed Evidence C records as map anchors. |
| `tools/validate-data.mjs` | Added generic-source and mandatory-GB safeguards. |
