# AD Standards Tracker · 自动驾驶标准追踪

[![License: Apache 2.0](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://www.apache.org/licenses/LICENSE-2.0)
[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6)](https://www.typescriptlang.org/)

> An open, bilingual (EN/中文) tracker for autonomous-driving regulations, standards, consultations, and policy documents across UN, China, US, EU, UK, Japan, and Korea.
>
> 面向全球自动驾驶监管、标准、征求意见稿与政策文件的开源双语追踪工具，覆盖联合国、中国、美国、欧盟、英国、日本、韩国。

Live site / 在线访问: **standards.autozyx.com** *(pending DNS)*
Companion project / 姊妹项目: [ROAM — Robotaxi Operations & Accident Monitor](https://github.com/AutoZYX/ROAM)

---

## Why / 为什么

AD 安全和合规信息散落在各国监管机构、标准委员会、行业组织的官网里，格式各异、更新频率不一。作为 OEM/Tier 1 合规负责人、监管方、学术研究者，每天手动扫站既低效又容易漏。

AD Standards Tracker 用**元数据 + 链接到原文**的方式（不分发全文，规避版权）把这些信息统一到一个可搜索、可订阅、机器可读的结构化数据集里。

AD compliance and safety intelligence is fragmented across national regulators, SDOs, and industry bodies. This project aggregates metadata (not full text) into one searchable, subscribable, machine-readable dataset.

## What / 功能

- **Dashboard** — 最近更新、按辖区/类型/主题的分布统计
- **Standards Library** — 全库筛选（辖区、组织、类型、状态、年份、主题、SAE 级别）
- **Standard Detail** — 单条记录全部字段 + 外链到原文
- **Sources** — 25 个 P0 数据源清单（UNECE, SAC/TC114, NHTSA, SAE, EC, Euro NCAP, METI 等）
- **Subscribe** — 邮件订阅（按角色分层：OEM / Tier 1 / 监管 / 学术 / 媒体）
- **Bilingual** — EN/中文 双语界面和内容字段

## Data model / 数据模型

每条记录是一份 YAML 文件（`standards/{jurisdiction}/{year}/{id}.yaml`）：

```yaml
id: "STD-UNECE-2025-001"
date: "2025-09-22"
org: "UNECE WP.29"
jurisdiction: "international"      # international|china|us|eu|uk|japan|korea
type: "meeting_notice"             # regulation|standard|consultation|...
status: "published"
title_en: "..."
title_cn: "..."                    # 可选
url: "https://..."
automation_level: ["L3", "L4"]
topics: ["sotif", "cybersecurity"]
summary_en: "..."
summary_cn: "..."                  # 可选
```

完整 schema 见 [`lib/types.ts`](lib/types.ts) 的 `StandardRecord` interface。

## Tech stack

- **Next.js 16** (App Router, Turbopack) + **TypeScript** + **Tailwind CSS v4**
- **js-yaml** for data loading, **recharts** for dashboard charts
- Static generation: 1 dynamic page per record via `generateStaticParams`
- i18n: zero-dep context-based provider in `lib/i18n.tsx`
- Data ingestion: **GitHub Actions** daily crawler → PR workflow

## Quick start

```bash
pnpm install
pnpm dev                # http://localhost:3000
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
│   ├── filter.ts           # Pure filter fn (client-safe)
│   ├── sources.ts          # 25 P0 source registry
│   └── i18n.tsx            # i18n provider
├── standards/              # YAML data (organized by jurisdiction/year)
│   ├── china/
│   ├── international/
│   ├── us/ eu/ uk/ japan/ korea/
├── tools/crawler/          # Python crawlers (TODO)
├── scripts/                # Data seeding utilities
└── .github/workflows/
    └── daily-crawl.yml     # Daily crawl → PR workflow
```

## Contributing

PRs welcome. For new data sources, please include:
1. A machine-readable entry in `lib/sources.ts`
2. At least 3 sample records for the source
3. A crawler module in `tools/crawler/<source>.py` if automation is possible

For data corrections, edit the relevant YAML file and open a PR — no programming needed.

## Citation / 引用

```bibtex
@misc{zhang2026adstandards,
  author = {Zhang, Yuxin},
  title  = {AD Standards Tracker: An Open Bilingual Tracker for Autonomous-Driving Regulations and Standards},
  year   = {2026},
  url    = {https://github.com/AutoZYX/ad-standards-tracker}
}
```

## License

Apache License 2.0 — see [LICENSE](LICENSE).

Data is aggregated as metadata with links to original sources. Full text of standards and regulations remains the copyright of the issuing bodies.

## Author / 作者

**Yuxin Zhang (张玉新)** — Assistant Professor, College of Automotive Engineering, Jilin University; Director, AD Safety Joint Lab
Contact: [zhangyuxin@jlu.edu.cn](mailto:zhangyuxin@jlu.edu.cn) · [@AutoZyx](https://mp.weixin.qq.com/s/xxx) WeChat public account
