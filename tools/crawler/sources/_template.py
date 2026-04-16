"""
Template for a new crawler source.

Copy this file to sources/<your_source>.py, implement fetch(), and register
in ../run.py REGISTERED list.
"""
from __future__ import annotations

from datetime import date
from typing import Iterable

from base import Crawler, StandardRecord, mint_id


class Template(Crawler):
    name = "template"
    jurisdiction = "international"  # international|china|us|eu|uk|japan|korea
    org = "EXAMPLE"

    def fetch(self) -> Iterable[StandardRecord]:
        # Example: fetch a listing page, parse into records.
        # resp = self.client.get("https://example.org/standards")
        # for item in parse(resp.text):
        #     yield StandardRecord(
        #         id=mint_id(self.org, item.year, item.seq),
        #         date=item.date,
        #         org=self.org,
        #         jurisdiction=self.jurisdiction,
        #         type="standard",
        #         status="published",
        #         title_en=item.title,
        #         url=item.url,
        #     )
        today = date.today().isoformat()
        yield StandardRecord(
            id=mint_id(self.org, today[:4], 999),
            date=today,
            org=self.org,
            jurisdiction=self.jurisdiction,
            type="standard",
            status="draft",
            title_en="Example record — replace with real implementation",
            url="https://example.org",
        )


CRAWLER = Template
