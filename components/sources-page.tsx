"use client";

import { useI18n } from "@/lib/i18n";
import { SOURCES } from "@/lib/sources";

const JURIS_COLORS: Record<string, string> = {
  international: "#7c3aed",
  china: "#dc2626",
  us: "#2563eb",
  eu: "#059669",
  uk: "#ea580c",
  japan: "#d97706",
  korea: "#0891b2",
};

const DIFFICULTY: Record<string, { label_en: string; label_cn: string; color: string }> = {
  easy: { label_en: "Easy", label_cn: "易", color: "bg-green-100 text-green-800" },
  medium: { label_en: "Medium", label_cn: "中", color: "bg-amber-100 text-amber-800" },
  hard: { label_en: "Hard", label_cn: "难", color: "bg-red-100 text-red-800" },
};

export default function SourcesPage() {
  const { t, lang } = useI18n();

  const grouped = SOURCES.reduce((acc, s) => {
    (acc[s.jurisdiction] = acc[s.jurisdiction] || []).push(s);
    return acc;
  }, {} as Record<string, typeof SOURCES>);

  const jOrder = ["international", "china", "us", "eu", "uk", "japan", "korea"];

  return (
    <div>
      <h1 className="text-3xl mb-2">{t("src.title")}</h1>
      <p className="text-[var(--muted)] mb-8">{t("src.desc")}</p>

      {jOrder.map((j) => {
        const items = grouped[j];
        if (!items || items.length === 0) return null;
        const color = JURIS_COLORS[j];
        return (
          <section key={j} className="mb-10">
            <h2
              className="text-lg font-semibold mb-3 pb-2 border-b-2"
              style={{ borderColor: color, color }}
            >
              {t(`juris.${j}` as never)} <span className="text-[var(--muted)] font-normal">({items.length})</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {items.map((s) => {
                const name = lang === "zh" ? s.name_cn : s.name_en;
                const altName = lang === "zh" ? s.name_en : s.name_cn;
                const desc = lang === "zh" ? s.description_cn : s.description_en;
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
                        <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${diff.color}`}>
                          {lang === "zh" ? diff.label_cn : diff.label_en}
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
