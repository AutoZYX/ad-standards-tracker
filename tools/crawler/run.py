"""
Orchestrator — runs all registered source crawlers and writes YAML output.

Usage:
  python run.py --out ../../standards               # run all sources
  python run.py --source unece_wp29 --out ../../standards   # single source
  python run.py --dry-run                            # list records, don't write
"""
from __future__ import annotations

import argparse
import importlib
import logging
import sys
from pathlib import Path

from base import Crawler, write_record

log = logging.getLogger("crawler.run")

# Register crawler modules here as they get implemented.
# Each module must expose a CRAWLER class inheriting from Crawler.
REGISTERED = [
    # "sources.unece_wp29",
    # "sources.sae",
    # "sources.nhtsa",
    # "sources.sac_tc114",
    # ...
]


def load(module_name: str) -> Crawler:
    mod = importlib.import_module(module_name)
    cls = getattr(mod, "CRAWLER", None)
    if cls is None:
        raise RuntimeError(f"Module {module_name} missing CRAWLER class")
    return cls()


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--out", type=Path, default=Path("../../standards"))
    parser.add_argument("--source", help="Run single source (module name)")
    parser.add_argument("--snapshot", type=Path, default=Path("./snapshots"))
    parser.add_argument("--dry-run", action="store_true")
    parser.add_argument("--verbose", "-v", action="store_true")
    args = parser.parse_args()

    logging.basicConfig(
        level=logging.DEBUG if args.verbose else logging.INFO,
        format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
    )

    targets = [args.source] if args.source else REGISTERED
    if not targets:
        log.warning(
            "No crawlers registered yet. See tools/crawler/README.md for the intended "
            "architecture. Seed data is currently maintained via scripts/seed-*.py."
        )
        return 0

    failures = 0
    total_records = 0
    for module in targets:
        try:
            crawler = load(module)
            log.info("Running %s ...", module)
            for record in crawler.fetch():
                total_records += 1
                if args.dry_run:
                    log.info("[dry-run] %s — %s", record.id, record.title_en)
                else:
                    path = write_record(record, args.out)
                    log.info("wrote %s", path)
        except Exception as e:
            failures += 1
            log.exception("Source %s failed: %s", module, e)

    log.info("Done. %d records; %d source(s) failed.", total_records, failures)
    return 0 if failures == 0 else 1


if __name__ == "__main__":
    sys.exit(main())
