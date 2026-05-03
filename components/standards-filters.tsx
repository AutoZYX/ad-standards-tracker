"use client";

import { useEffect, useMemo, useState } from "react";
import type {
  EvidenceLevel,
  LegalForce,
  SourceStatus,
  SourceType,
  StandardRecord,
  Category,
  Jurisdiction,
  StandardType,
} from "@/lib/types";
import { useI18n } from "@/lib/i18n";
import StandardCard from "./standard-card";
import { filterStandards } from "@/lib/filter";
import { categorize, CATEGORY_ORDER, CATEGORY_META } from "@/lib/categories";

const ALL_JURISDICTIONS: Jurisdiction[] = [
  "international",
  "industry_org",
  "china",
  "us",
  "eu",
  "uk",
  "germany",
  "japan",
  "korea",
  "singapore",
];

const ALL_TYPES: StandardType[] = [
  "regulation",
  "standard",
  "consultation",
  "meeting_notice",
  "recall",
  "white_paper",
  "policy",
  "research",
  "interpretation",
];

const ALL_LEGAL_FORCES: LegalForce[] = [
  "binding",
  "voluntary",
  "rating_protocol",
  "guidance",
  "best_practice",
  "informational",
];

const ALL_SOURCE_TYPES: SourceType[] = [
  "official",
  "official_news",
  "official_catalog",
  "standards_store",
  "secondary",
  "interpretation",
];

const ALL_EVIDENCE_LEVELS: EvidenceLevel[] = ["A", "B", "C", "D"];

const ALL_SOURCE_STATUSES: SourceStatus[] = [
  "verified",
  "paywalled",
  "blocked",
  "broken",
  "unverified",
];

type CategoryTab = Category | "all";

export default function StandardsFilters({ all }: { all: StandardRecord[] }) {
  const { t, lang } = useI18n();
  const [activeCategory, setActiveCategory] = useState<CategoryTab>("all");
  const [search, setSearch] = useState("");
  const [jurisdiction, setJurisdiction] = useState("");
  const [org, setOrg] = useState("");
  const [type, setType] = useState("");
  const [status, setStatus] = useState("");
  const [year, setYear] = useState("");
  const [topic, setTopic] = useState("");
  const [level, setLevel] = useState("");
  const [legalForce, setLegalForce] = useState("");
  const [sourceType, setSourceType] = useState("");
  const [evidenceLevel, setEvidenceLevel] = useState("");
  const [sourceStatus, setSourceStatus] = useState("");

  useEffect(() => {
    queueMicrotask(() => {
      const params = new URLSearchParams(window.location.search);
      setSearch(params.get("search") ?? "");
      setJurisdiction(params.get("jurisdiction") ?? "");
      setOrg(params.get("org") ?? "");
      setType(params.get("type") ?? "");
      setStatus(params.get("status") ?? "");
      setYear(params.get("year") ?? "");
      setTopic(params.get("topic") ?? "");
      setLevel(params.get("level") ?? "");
      setLegalForce(params.get("legalForce") ?? "");
      setSourceType(params.get("sourceType") ?? "");
      setEvidenceLevel(params.get("evidenceLevel") ?? "");
      setSourceStatus(params.get("sourceStatus") ?? "");
    });
  }, []);

  // Precompute category for each record
  const withCategory = useMemo(
    () => all.map((r) => ({ r, cat: categorize(r) })),
    [all]
  );

  const categoryCounts = useMemo(() => {
    const c: Record<Category, number> = {
      standards: 0,
      regulations: 0,
      assessments: 0,
      updates: 0,
    };
    withCategory.forEach(({ cat }) => {
      c[cat] += 1;
    });
    return c;
  }, [withCategory]);

  const byCategoryRecords = useMemo(
    () =>
      activeCategory === "all"
        ? all
        : withCategory.filter(({ cat }) => cat === activeCategory).map(({ r }) => r),
    [all, withCategory, activeCategory]
  );

  const orgs = useMemo(
    () => [...new Set(byCategoryRecords.map((s) => s.org))].sort(),
    [byCategoryRecords]
  );
  const years = useMemo(
    () =>
      [...new Set(byCategoryRecords.map((s) => s.date.substring(0, 4)))]
        .sort()
        .reverse(),
    [byCategoryRecords]
  );
  const allTopics = useMemo(
    () => [...new Set(byCategoryRecords.flatMap((s) => s.topics || []))].sort(),
    [byCategoryRecords]
  );

  const filtered = useMemo(
    () =>
      filterStandards(byCategoryRecords, {
        search,
        jurisdiction: jurisdiction as never,
        org,
        type,
        status,
        year,
        topic,
        level,
        legalForce: legalForce as never,
        sourceType: sourceType as never,
        evidenceLevel: evidenceLevel as never,
        sourceStatus: sourceStatus as never,
      }),
    [
      byCategoryRecords,
      search,
      jurisdiction,
      org,
      type,
      status,
      year,
      topic,
      level,
      legalForce,
      sourceType,
      evidenceLevel,
      sourceStatus,
    ]
  );

  const selClass =
    "rounded-lg border border-[var(--border)] bg-[var(--card-bg)] px-3 py-1.5 text-sm text-[var(--text)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]";

  return (
    <div>
      {/* Category tabs */}
      <div className="flex flex-wrap gap-2 mb-6 border-b border-[var(--border)] pb-3">
        <CategoryTabButton
          active={activeCategory === "all"}
          onClick={() => setActiveCategory("all")}
          count={all.length}
          label={t("std.cat.all")}
        />
        {CATEGORY_ORDER.map((cat) => {
          const meta = CATEGORY_META[cat];
          const label = lang === "zh" ? meta.key_cn : meta.key_en;
          return (
            <CategoryTabButton
              key={cat}
              active={activeCategory === cat}
              onClick={() => setActiveCategory(cat)}
              count={categoryCounts[cat]}
              emoji={meta.emoji}
              label={label}
            />
          );
        })}
      </div>

      {/* Category description */}
      {activeCategory !== "all" && (
        <p className="text-sm text-[var(--muted)] mb-4 italic">
          {lang === "zh"
            ? CATEGORY_META[activeCategory].desc_cn
            : CATEGORY_META[activeCategory].desc_en}
        </p>
      )}

      {/* Filters */}
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
          {ALL_JURISDICTIONS.map((j) => (
            <option key={j} value={j}>
              {t(`juris.${j}` as never)}
            </option>
          ))}
        </select>
        <select value={type} onChange={(e) => setType(e.target.value)} className={selClass}>
          <option value="">{t("std.all_types")}</option>
          {ALL_TYPES.map((ty) => (
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
        <select value={legalForce} onChange={(e) => setLegalForce(e.target.value)} className={selClass}>
          <option value="">{t("std.all_legal")}</option>
          {ALL_LEGAL_FORCES.map((lf) => (
            <option key={lf} value={lf}>
              {t(`legal.${lf}` as never)}
            </option>
          ))}
        </select>
        <select value={sourceType} onChange={(e) => setSourceType(e.target.value)} className={selClass}>
          <option value="">{t("std.all_sources")}</option>
          {ALL_SOURCE_TYPES.map((st) => (
            <option key={st} value={st}>
              {t(`source_type.${st}` as never)}
            </option>
          ))}
        </select>
        <select value={evidenceLevel} onChange={(e) => setEvidenceLevel(e.target.value)} className={selClass}>
          <option value="">{t("std.all_evidence")}</option>
          {ALL_EVIDENCE_LEVELS.map((ev) => (
            <option key={ev} value={ev}>
              Evidence {ev}
            </option>
          ))}
        </select>
        <select value={sourceStatus} onChange={(e) => setSourceStatus(e.target.value)} className={selClass}>
          <option value="">{t("std.all_source_status")}</option>
          {ALL_SOURCE_STATUSES.map((ss) => (
            <option key={ss} value={ss}>
              {t(`source_status.${ss}` as never)}
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

function CategoryTabButton({
  active,
  onClick,
  count,
  label,
  emoji,
}: {
  active: boolean;
  onClick: () => void;
  count: number;
  label: string;
  emoji?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
        active
          ? "bg-[var(--accent)] text-white"
          : "bg-[var(--card-bg)] text-[var(--text)] border border-[var(--border)] hover:border-[var(--accent)]"
      }`}
    >
      {emoji && <span className="mr-1.5">{emoji}</span>}
      {label}
      <span className={`ml-2 text-xs ${active ? "opacity-90" : "opacity-60"}`}>
        {count}
      </span>
    </button>
  );
}
