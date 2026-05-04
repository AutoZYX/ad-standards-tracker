# AD Standards Tracker · 自动驾驶标准追踪

[![License: Apache 2.0](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://www.apache.org/licenses/LICENSE-2.0)
[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6)](https://www.typescriptlang.org/)

> An open, bilingual (EN/中文) safety evidence map for autonomous-driving standards, regulations, assessment protocols, best practices, and latest updates across UN, China, US, EU, UK, Germany, Japan, Korea, Singapore, and industry organizations.
>
> 面向全球自动驾驶标准、法规、测评规程、最佳实践与最新动态的开源双语安全证据地图，覆盖联合国、中国、美国、欧盟、英国、德国、日本、韩国、新加坡及行业组织。

Live site / 在线访问: **https://standards.autozyx.com**
Companion project / 姊妹项目: [ROAM — Robotaxi Operations & Accident Monitor](https://github.com/AutoZYX/ROAM)

---

## Why / 为什么

AD 安全和合规信息散落在各国监管机构、标准委员会、行业组织的官网里，格式各异、更新频率不一。作为 OEM/Tier 1 合规负责人、监管方、学术研究者，每天手动扫站既低效又容易漏。

AD Standards Tracker 用元数据 + 原始链接的方式（不分发全文，规避版权）把这些信息统一到一个可搜索、可订阅、机器可读的结构化数据集里。项目的核心不是“链接越多越好”，而是让每条高优先级记录能回答：来源是谁、是否一手、有没有约束力、何时核验过、标准边界是什么、工程上应该怎样使用。

AD compliance and safety intelligence is fragmented across national regulators, SDOs, and industry bodies. This project aggregates metadata (not full text) into one searchable, subscribable, machine-readable dataset.

## Knowledge mechanism / 知识机制

The project is designed as a three-layer knowledge system, not a link directory:

1. Evidence layer: original source URL, source type, evidence level, legal effect, link status, and verification date.
2. Boundary layer: what the document covers, what it does not cover, and whether it is a final standard, draft, regulation, assessment protocol, notice, or interpretation.
3. Engineering layer: how the record should be used in ADS/ADAS safety work, which adjacent standards matter, and what safety-case or verification question it helps answer.

这意味着高优先级记录不只是“摘要”。它应该沉淀自动驾驶安全工作中真正有用的 know-how：责任边界、适用场景、容易误读的地方、与 ISO 26262 / ISO 21448 / ISO 34502 / UNECE 法规 / NCAP 规程之间的关系。

## What / 功能

- **Dashboard** — 最近更新、按辖区/类型/主题的分布统计
- **Standards Library** — 全库筛选（辖区、组织、类型、状态、年份、主题、SAE 级别）
- **Evidence Maps** — 按 L2 及以下驾驶辅助、ADS 准入、场景测试、安全开发、安全论证、远程操作边界和 L4 运营治理组织证据链
- **Standard Detail** — 单条记录全部字段、标准边界、工程使用方式、专家判断 + 外链到原文
- **Source & Legal Effect** — 高优先级条目标注法律效力、来源类型、证据等级、核验日期、链接状态
- **Sources** — 30+ 个数据源清单（UNECE, ISO, SAC/TC114, NHTSA, SAE, IEEE, ASAM, EC, Euro NCAP, METI 等）
- **Ask AD Standards** — DeepSeek-powered natural-language Q&A over the structured database
- **Subscribe** — 邮件订阅（按角色分层：OEM / Tier 1 / 监管 / 学术 / 媒体）
- **Bilingual** — EN/中文 双语界面和内容字段

## Data model / 数据模型

每条记录是一份 YAML 文件（`standards/{jurisdiction}/{year}/{id}.yaml`）：

```yaml
id: "STD-UNECE-2025-001"
date: "2025-09-22"
org: "UNECE WP.29"
jurisdiction: "international"      # international|industry_org|china|us|eu|uk|germany|japan|korea|singapore
type: "meeting_notice"             # regulation|standard|consultation|...
status: "published"
legal_force: "binding"            # binding|voluntary|rating_protocol|guidance|best_practice|informational
source_type: "official"           # official|official_news|official_catalog|standards_store|secondary|interpretation
evidence_level: "A"               # A official primary; B official notice/catalog; C trusted secondary; D needs review
verified_at: "2026-05-02"
source_status: "verified"         # verified|paywalled|blocked|broken|unverified
title_en: "..."
title_cn: "..."                    # 可选
url: "https://..."
automation_level: ["L3", "L4"]
topics: ["sotif", "cybersecurity"]
summary_en: "..."
summary_cn: "..."                  # 可选
scope_en:
  - "What the document covers"
scope_cn:
  - "标准覆盖范围"
exclusions_en:
  - "What the document does not cover"
exclusions_cn:
  - "不覆盖内容或容易误读的边界"
engineering_use_en:
  - "How safety, homologation, or validation teams should use this record"
engineering_use_cn:
  - "工程、安全论证或测试验证中的使用方式"
expert_note_en: "Expert interpretation or caveat"
expert_note_cn: "专家判断或注意事项"
```

完整 schema 见 [`lib/types.ts`](lib/types.ts) 的 `StandardRecord` interface。数据来源与证据等级规则见 [`DATA_SCHEMA.md`](DATA_SCHEMA.md) 和 [`SOURCE_POLICY.md`](SOURCE_POLICY.md)。

## Tech stack

- **Next.js 16** (App Router, Turbopack) + **TypeScript** + **Tailwind CSS v4**
- **js-yaml** for data loading, **recharts** for dashboard charts
- Static generation: 1 dynamic page per record via `generateStaticParams`
- i18n: zero-dep context-based provider in `lib/i18n.tsx`
- Data quality: schema validation, URL health checks, source/evidence policy, and a GitHub Actions crawler scaffold for future source-specific automation

## Quick start

```bash
pnpm install
pnpm dev                # http://localhost:3000
pnpm validate:data      # YAML + schema validation
pnpm backfill:trust     # Conservative trust-field backfill for legacy records
pnpm check:urls         # URL health check; supports URL_CHECK_IDS=ID1,ID2
pnpm build && pnpm start
```

To add a new record, create a YAML file under `standards/<jurisdiction>/<year>/` matching the schema above. No rebuild step — the static build reads all YAML at build time.

## Repo layout

```
ad-standards-tracker/
├── app/                    # Next.js App Router pages
├── components/             # React components
├── lib/
│   ├── types.ts            # All TS types (client-safe)
│   ├── data.ts             # YAML loader (server-only, uses fs)
│   ├── evidence-map.ts     # decision-oriented record maps
│   ├── filter.ts           # Pure filter fn (client-safe)
│   ├── sources.ts          # source registry
│   └── i18n.tsx            # i18n provider
├── standards/              # YAML data (organized by jurisdiction/year)
│   ├── china/
│   ├── international/
│   ├── us/ eu/ uk/ japan/ korea/
├── tools/crawler/          # crawler scaffold; source modules are added only when they can be verified
├── tools/check-urls.mjs    # link checker, supports focused ID checks
├── tools/backfill-trust-fields.mjs # conservative trust-field backfill
├── DATA_SCHEMA.md          # Data schema and trust fields
├── SOURCE_POLICY.md        # Source and evidence policy
└── .github/workflows/
    └── daily-crawl.yml     # Daily crawl → PR workflow
```

## Contributing

PRs welcome. For new data sources, please include:
1. A machine-readable entry in `lib/sources.ts`
2. At least 3 sample records for the source
3. A crawler module in `tools/crawler/<source>.py` if automation is reliable and legally appropriate
4. Source quality fields for any safety-critical or legally relevant record

For data corrections, edit the relevant YAML file and open a PR — no programming needed. Run `pnpm validate:data` before submitting. If a record uses a non-official link, set `source_type: secondary`, `evidence_level: C`, and explain the reason in `source_note`.

## Citation / 引用

```bibtex
@misc{zhang2026adstandards,
  author = {Zhang, Yuxin},
  title  = {AD Standards Tracker: An Open Bilingual Safety Evidence Map for Automated Driving Standards and Regulations},
  year   = {2026},
  url    = {https://github.com/AutoZYX-Labs/ad-standards-tracker}
}
```

## License

Apache License 2.0 — see [LICENSE](LICENSE).

Data is aggregated as metadata with links to original sources. Full text of standards and regulations remains the copyright of the issuing bodies.

## Author / 作者

**Yuxin Zhang (张玉新)**
Research: SOTIF, functional safety, and scenario-driven safety assessment for automated driving.
Homepage: [autozyx.com](https://autozyx.com)
