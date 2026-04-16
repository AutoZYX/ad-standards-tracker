"use client";

import { useI18n } from "@/lib/i18n";
import { SOURCES, SOURCE_CATEGORY_META } from "@/lib/sources";
import type { SourceCategory } from "@/lib/types";

const DIFFICULTY: Record<string, { label_en: string; label_cn: string; color: string }> = {
  easy: { label_en: "Easy", label_cn: "易", color: "bg-green-100 text-green-800" },
  medium: { label_en: "Medium", label_cn: "中", color: "bg-amber-100 text-amber-800" },
  hard: { label_en: "Hard", label_cn: "难", color: "bg-red-100 text-red-800" },
};

const CATEGORY_ORDER: SourceCategory[] = [
  "sdo",
  "industry_org",
  "government",
  "assessment",
  "demonstration",
];

const CATEGORY_COLORS: Record<SourceCategory, string> = {
  sdo: "#7c3aed",
  industry_org: "#0891b2",
  government: "#dc2626",
  assessment: "#d97706",
  demonstration: "#059669",
};

export default function SourcesPage() {
  const { t, lang } = useI18n();
  const zh = lang === "zh";

  const grouped = SOURCES.reduce((acc, s) => {
    (acc[s.category] = acc[s.category] || []).push(s);
    return acc;
  }, {} as Record<SourceCategory, typeof SOURCES>);

  return (
    <div>
      <h1 className="text-3xl mb-2" style={{ fontFamily: "Playfair Display, serif" }}>
        {t("src.title")}
      </h1>
      <p className="text-[var(--muted)] mb-8">
        {zh
          ? `${SOURCES.length} 个权威数据源，按组织类型分组。`
          : `${SOURCES.length} authoritative data sources, grouped by organization type.`}
      </p>

      {CATEGORY_ORDER.map((cat) => {
        const items = grouped[cat];
        if (!items || items.length === 0) return null;
        const meta = SOURCE_CATEGORY_META[cat];
        const color = CATEGORY_COLORS[cat];
        return (
          <section key={cat} className="mb-10">
            <h2
              className="text-lg font-semibold mb-1 pb-2 border-b-2 flex items-center gap-2"
              style={{ borderColor: color, color }}
            >
              <span>{meta.emoji}</span>
              <span>{zh ? meta.key_cn : meta.key_en}</span>
              <span className="text-[var(--muted)] font-normal text-sm">({items.length})</span>
            </h2>
            <p className="text-xs text-[var(--muted)] mb-4 italic">
              {zh ? meta.desc_cn : meta.desc_en}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {items.map((s) => {
                const name = zh ? s.name_cn : s.name_en;
                const altName = zh ? s.name_en : s.name_cn;
                const desc = zh ? s.description_cn : s.description_en;
                const diff = DIFFICULTY[s.crawl_difficulty];
                return (
                  <div
                    key={s.id}
                    className="rounded-xl bg-[var(--card-bg)] border border-[var(--border)] p-5"
                  >
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="font-semibold text-sm leading-tight">{name}</h3>
                      <span
                        className="text-[10px] px-1.5 py-0.5 rounded bg-[var(--badge-bg)] text-[var(--muted)] font-mono whitespace-nowrap"
                      >
                        {s.short}
                      </span>
                    </div>
                    <p className="text-xs text-[var(--muted)] mb-2">{altName}</p>
                    <p className="text-xs text-[var(--muted)] leading-relaxed mb-3">{desc}</p>
                    <div className="flex items-center justify-between gap-2">
                      <a
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-[var(--accent)] hover:underline break-all"
                      >
                        {s.url}
                      </a>
                      <div className="flex items-center gap-1 shrink-0">
                        <span
                          className="text-[10px] px-1.5 py-0.5 rounded bg-[var(--badge-bg)] text-[var(--muted)] font-medium"
                        >
                          {t(`juris.${s.jurisdiction}` as never)}
                        </span>
                        <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${diff.color}`}>
                          {zh ? diff.label_cn : diff.label_en}
                        </span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-[var(--badge-bg)] text-[var(--muted)]">
                          {s.language}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}
