"""
Base classes and utilities for AD Standards Tracker crawlers.

This is the foundation that individual source crawlers inherit from.
Provides: polite HTTP client (UA, delay, robots.txt), YAML writer, ID minting.
"""
from __future__ import annotations

import os
import time
import logging
from dataclasses import dataclass, field, asdict
from pathlib import Path
from typing import Iterable, Optional
from urllib.parse import urlparse
from urllib.robotparser import RobotFileParser

import requests
import yaml

log = logging.getLogger(__name__)

DEFAULT_UA = (
    "AD-Standards-Tracker-Bot/1.0 "
    "(+https://github.com/AutoZYX-Labs/ad-standards-tracker; "
    "contact: zhangyuxin@jlu.edu.cn)"
)
DEFAULT_DELAY = float(os.environ.get("CRAWLER_REQUEST_DELAY_SEC", "2"))


@dataclass
class StandardRecord:
    """Mirrors lib/types.ts StandardRecord. Keep in sync."""
    id: str
    date: str
    org: str
    jurisdiction: str
    type: str
    status: str
    title_en: str
    url: str
    org_full: Optional[str] = None
    title_cn: Optional[str] = None
    effective_date: Optional[str] = None
    automation_level: list[str] = field(default_factory=list)
    topics: list[str] = field(default_factory=list)
    summary_en: Optional[str] = None
    summary_cn: Optional[str] = None
    impact_note: Optional[str] = None
    related_standards: list[str] = field(default_factory=list)
    contributor: Optional[str] = None
    last_updated: Optional[str] = None

    def to_yaml_dict(self) -> dict:
        d = asdict(self)
        # Drop empty optional fields for cleaner YAML
        return {k: v for k, v in d.items() if v not in (None, [], "")}


class PoliteClient:
    """HTTP client that respects robots.txt and throttles per host."""

    def __init__(self, ua: str = DEFAULT_UA, delay: float = DEFAULT_DELAY):
        self.session = requests.Session()
        self.session.headers.update({"User-Agent": ua})
        self.delay = delay
        self._last_call: dict[str, float] = {}
        self._robots: dict[str, RobotFileParser] = {}

    def _robots_ok(self, url: str) -> bool:
        host = urlparse(url).netloc
        if host not in self._robots:
            rp = RobotFileParser()
            rp.set_url(f"{urlparse(url).scheme}://{host}/robots.txt")
            try:
                rp.read()
            except Exception as e:
                log.warning("robots.txt read failed for %s: %s — proceeding", host, e)
            self._robots[host] = rp
        return self._robots[host].can_fetch(self.session.headers["User-Agent"], url)

    def _throttle(self, host: str) -> None:
        now = time.monotonic()
        last = self._last_call.get(host, 0)
        wait = self.delay - (now - last)
        if wait > 0:
            time.sleep(wait)
        self._last_call[host] = time.monotonic()

    def get(self, url: str, **kwargs) -> requests.Response:
        if not self._robots_ok(url):
            raise PermissionError(f"robots.txt disallows: {url}")
        self._throttle(urlparse(url).netloc)
        r = self.session.get(url, timeout=30, **kwargs)
        r.raise_for_status()
        return r


class Crawler:
    """Base class for per-source crawlers."""

    name: str = "base"
    jurisdiction: str = ""
    org: str = ""

    def __init__(self, client: Optional[PoliteClient] = None):
        self.client = client or PoliteClient()

    def fetch(self) -> Iterable[StandardRecord]:
        """Yield StandardRecord instances. Override in subclasses."""
        raise NotImplementedError


def write_record(record: StandardRecord, out_dir: Path) -> Path:
    """Write a StandardRecord to standards/{jurisdiction}/{year}/{id}.yaml."""
    year = record.date[:4]
    target_dir = out_dir / record.jurisdiction / year
    target_dir.mkdir(parents=True, exist_ok=True)
    target_file = target_dir / f"{record.id}.yaml"
    with open(target_file, "w", encoding="utf-8") as f:
        yaml.safe_dump(
            record.to_yaml_dict(),
            f,
            allow_unicode=True,
            sort_keys=False,
            default_flow_style=False,
        )
    return target_file


def mint_id(org_short: str, year: str, sequence: int) -> str:
    """Mint an ID like STD-UNECE-2025-001."""
    return f"STD-{org_short.upper()}-{year}-{sequence:03d}"
