# Crawlers

Per-source Python crawlers that fetch standards/regulations metadata and emit YAML files into `../../standards/{jurisdiction}/{year}/`.

## Status

⚠️ **Not yet implemented.** This directory is currently a scaffold with the intended architecture. The 50+ seed records shipped with the MVP were hand-curated (see `../../scripts/seed-*.py`).

## Intended architecture

```
tools/crawler/
├── run.py                # Orchestrator (invoked by .github/workflows/daily-crawl.yml)
├── base.py               # Shared Crawler base class + YAML writer + throttling
├── requirements.txt      # requests, playwright, beautifulsoup4, PyYAML, feedparser
├── sources/
│   ├── unece_wp29.py
│   ├── iso_tc22_sc33.py
│   ├── sac_tc114.py
│   ├── sc34_cn.py
│   ├── miit_cn.py
│   ├── samr_cn.py
│   ├── mot_cn.py
│   ├── catarc_cn.py
│   ├── caeri_cn.py
│   ├── cmc_cn.py
│   ├── beijing_had.py
│   ├── shanghai_icv.py
│   ├── shenzhen_spc.py
│   ├── nhtsa.py
│   ├── ca_dmv.py
│   ├── sae.py
│   ├── ulse.py
│   ├── ieee_sa.py
│   ├── ec_transport.py
│   ├── euro_ncap.py
│   ├── uk_ccav.py
│   ├── meti_jp.py
│   └── mlit_jp.py
└── snapshots/            # Per-run HTML snapshots for diffing (gitignored)
```

## Conventions

- **User-Agent**: `AD-Standards-Tracker-Bot/1.0 (+https://github.com/AutoZYX-Labs/ad-standards-tracker; contact: zhangyuxin@jlu.edu.cn)`
- **Request delay**: ≥ 2s between requests to the same host (configurable via `CRAWLER_REQUEST_DELAY_SEC`)
- **Respect robots.txt** — use `urllib.robotparser`
- **Snapshot before diff**: each source writes `snapshots/{source}_{date}.html` or `.json` so that next run can diff against the previous snapshot instead of re-parsing the whole page
- **Never download full standard text**; only metadata + URL to the original source
- **ID format**: `STD-{ORG_SHORT}-{YYYY}-{NNN}` where `NNN` is 3-digit sequential within org+year
- **Failure handling**: a single source failing must not fail the overall crawl. Log to stderr, skip source, continue.

## Running locally

```bash
cd tools/crawler
pip install -r requirements.txt
python run.py --source unece_wp29 --out ../../standards
python run.py --all --out ../../standards --snapshot ./snapshots
```

## Contributing a new crawler

1. Copy `sources/_template.py` to `sources/<your_source>.py`
2. Implement `fetch()` returning a list of `StandardRecord` dicts
3. Add import + registration in `run.py`
4. Test locally: `python run.py --source <your_source> --dry-run`
5. Submit a PR — the daily workflow will pick it up automatically

## Priority order (recommended implementation sequence)

1. **RSS/JSON-first sources** (easy wins): Euro NCAP, SAE standards catalog (JSON API), NHTSA SGO reports (CSV), UNECE document database
2. **Static HTML sources** (beautifulsoup): MLIT JP, UK CCAV, EC Transport news
3. **JS-rendered sources** (playwright): SAC website, CATARC announcements, ISO committee pages
4. **Manual-fallback sources** (no automation feasible): IEEE SA paywalled standards — track via volunteer PRs
