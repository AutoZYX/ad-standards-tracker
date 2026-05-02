# Data Review Checklist

Use this checklist before publishing or promoting a new batch of records.

## Required Checks

- The URL resolves to an official or explicitly marked secondary source.
- The record has the correct top-level category: standard, regulation, assessment protocol, or latest update.
- Drafts, consultations, and report-for-approval drafts are not marked as binding.
- NCAP, C-ICAP, i-VISTA, and similar records use `legal_force: rating_protocol`.
- ISO/SAE/IEEE/UL/ASAM records use `legal_force: voluntary` unless there is a separate regulation requiring them.
- The record has `verified_at`, `source_type`, `evidence_level`, and `source_status` if it is safety-critical.
- Superseded or replaced records point to newer versions when known.

## High-Risk Items

Review manually before publishing:

- Mandatory GB standards and MIIT/SAMR notices
- UNECE UN-R regulations and ADS GTR drafts
- EU type-approval regulations
- UK/Germany/Korea/Japan AV authorization laws
- NHTSA orders, NPRMs, exemptions, and crash reporting rules
- NCAP protocol changes
- IEEE records where standard numbers can be confused, such as IEEE 2846 vs IEEE P2848
