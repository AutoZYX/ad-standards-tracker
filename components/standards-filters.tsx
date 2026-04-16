"use client";

import { useState, useMemo } from "react";
import type { StandardRecord } from "@/lib/types";
import { useI18n } from "@/lib/i18n";
import StandardCard from "./standard-card";
import { filterStandards } from "@/lib/filter";

export default function StandardsFilters({ all }: { all: StandardRecord[] }) {
  const { t } = useI18n();
  const [search, setSearch] = useState("");
  const [jurisdiction, setJurisdiction] = useState("");
  const [org, setOrg] = useState("");
  const [type, setType] = useState("");
  const [status, setStatus] = useState("");
  const [year, setYear] = useState("");
  const [topic, setTopic] = useState("");
  const [level, setLevel] = useState("");

  const orgs = useMemo(() => [...new Set(all.map((s) => s.org))].sort(), [all]);
  const years = useMemo(() => [...new Set(all.map((s) => s.date.substring(0, 4)))].sort().reverse(), [all]);
  const allTopics = useMemo(
    () => [...new Set(all.flatMap((s) => s.topics || []))].sort(),
    [all]
  );

  const filtered = useMemo(
    () =>
      filterStandards(all, {
        search,
        jurisdiction: jurisdiction as never,
        org,
        type,
        status,
        year,
        topic,
        level,
      }),
    [all, search, jurisdiction, org, type, status, year, topic, level]
  );

  const selClass =
    "rounded-lg border border-[var(--border)] bg-[var(--card-bg)] px-3 py-1.5 text-sm text-[var(--text)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]";

  return (
    <div>
      <div className="flex flex-wrap gap-3 mb-6">
        <input
          type="text"
          placeholder={t("std.search")}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={`${selClass} flex-1 min-w-[180px]`}
        />
        <select value={jurisdiction} onChange={(e) => setJurisdiction(e.target.value)} className={selClass}>
          <option value="">{t("std.all_juris")}</option>
          {["international", "china", "us", "eu", "uk", "japan", "korea"].map((j) => (
            <option key={j} value={j}>
              {t(`juris.${j}` as never)}
            </option>
          ))}
        </select>
        <select value={type} onChange={(e) => setType(e.target.value)} className={selClass}>
          <option value="">{t("std.all_types")}</option>
          {["regulation", "standard", "consultation", "meeting_notice", "recall", "white_paper", "policy", "research"].map((ty) => (
            <option key={ty} value={ty}>
              {t(`type.${ty}` as never)}
            </option>
          ))}
        </select>
        <select value={status} onChange={(e) => setStatus(e.target.value)} className={selClass}>
          <option value="">{t("std.all_status")}</option>
          {["in_force", "published", "consultation", "draft", "revised", "withdrawn", "pending"].map((st) => (
            <option key={st} value={st}>
              {t(`status.${st}` as never)}
            </option>
          ))}
        </select>
        <select value={year} onChange={(e) => setYear(e.target.value)} className={selClass}>
          <option value="">{t("std.all_years")}</option>
          {years.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
        <select value={org} onChange={(e) => setOrg(e.target.value)} className={selClass}>
          <option value="">{t("std.all_orgs")}</option>
          {orgs.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
        <select value={topic} onChange={(e) => setTopic(e.target.value)} className={selClass}>
          <option value="">{t("std.all_topics")}</option>
          {allTopics.map((tp) => (
            <option key={tp} value={tp}>
              {t(`topic.${tp}` as never)}
            </option>
          ))}
        </select>
        <select value={level} onChange={(e) => setLevel(e.target.value)} className={selClass}>
          <option value="">{t("std.all_levels")}</option>
          {["L0", "L1", "L2", "L3", "L4", "L5"].map((lv) => (
            <option key={lv} value={lv}>
              {lv}
            </option>
          ))}
        </select>
      </div>

      <p className="text-sm text-[var(--muted)] mb-4">
        {filtered.length} {t("std.found")}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((s) => (
          <StandardCard key={s.id} standard={s} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-[var(--muted)] py-12">{t("std.no_match")}</p>
      )}
    </div>
  );
}
