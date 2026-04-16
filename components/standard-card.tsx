"use client";

import Link from "next/link";
import type { StandardRecord } from "@/lib/types";
import { useI18n } from "@/lib/i18n";

const JURISDICTION_COLORS: Record<string, string> = {
  international: "#7c3aed",
  china: "#dc2626",
  us: "#2563eb",
  eu: "#059669",
  uk: "#ea580c",
  japan: "#d97706",
  korea: "#0891b2",
};

const TYPE_COLORS: Record<string, string> = {
  regulation: "#dc2626",
  standard: "#2563eb",
  consultation: "#d97706",
  meeting_notice: "#7c3aed",
  recall: "#c85a3a",
  white_paper: "#059669",
  policy: "#0891b2",
  research: "#6b7280",
};

const STATUS_BG: Record<string, string> = {
  draft: "bg-gray-100 text-gray-700",
  consultation: "bg-amber-100 text-amber-800",
  published: "bg-blue-100 text-blue-800",
  in_force: "bg-green-100 text-green-800",
  revised: "bg-purple-100 text-purple-800",
  withdrawn: "bg-red-100 text-red-800",
  pending: "bg-gray-100 text-gray-700",
};

export default function StandardCard({ standard }: { standard: StandardRecord }) {
  const { t, lang } = useI18n();
  const title = lang === "zh" && standard.title_cn ? standard.title_cn : standard.title_en;
  const summary = lang === "zh" && standard.summary_cn ? standard.summary_cn : standard.summary_en;
  const jColor = JURISDICTION_COLORS[standard.jurisdiction] || "#6b7280";
  const tColor = TYPE_COLORS[standard.type] || "#6b7280";

  return (
    <Link
      href={`/standards/${standard.id}`}
      className="block rounded-xl bg-[var(--card-bg)] border border-[var(--border)] p-5 shadow-[var(--card-shadow)] hover:border-[var(--accent)] transition-colors no-underline"
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex items-center gap-2 flex-wrap">
          <span
            className="text-[10px] px-2 py-0.5 rounded font-medium"
            style={{ backgroundColor: `${jColor}15`, color: jColor }}
          >
            {t(`juris.${standard.jurisdiction}` as never)}
          </span>
          <span
            className="text-[10px] px-2 py-0.5 rounded font-medium"
            style={{ backgroundColor: `${tColor}15`, color: tColor }}
          >
            {t(`type.${standard.type}` as never)}
          </span>
          <span
            className={`text-[10px] px-2 py-0.5 rounded font-medium ${STATUS_BG[standard.status] || "bg-gray-100 text-gray-700"}`}
          >
            {t(`status.${standard.status}` as never)}
          </span>
        </div>
        <span className="text-xs text-[var(--muted)] whitespace-nowrap">{standard.date}</span>
      </div>
      <h3 className="font-semibold text-sm text-[var(--text)] mb-2 leading-tight">
        {title}
      </h3>
      <p className="text-xs text-[var(--muted)] mb-3">
        {standard.org}
        {standard.automation_level && standard.automation_level.length > 0 && (
          <span className="ml-2">
            &middot; {standard.automation_level.join(" / ")}
          </span>
        )}
      </p>
      {summary && (
        <p className="text-xs text-[var(--muted)] leading-relaxed line-clamp-3">{summary}</p>
      )}
    </Link>
  );
}
