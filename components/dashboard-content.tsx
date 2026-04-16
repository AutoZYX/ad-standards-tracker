"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n";
import type { StandardRecord, DashboardStats } from "@/lib/types";
import StandardCard from "./standard-card";
import StatCard from "./stat-card";
import { SOURCES } from "@/lib/sources";

interface Props {
  stats: DashboardStats;
  recent: StandardRecord[];
}

export default function DashboardContent({ stats, recent }: Props) {
  const { t, lang } = useI18n();

  const now = new Date();
  const thisMonthKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
  const thisMonth = recent.filter((r) => r.date.startsWith(thisMonthKey)).length;
  const latestDate = recent[0]?.date || "-";

  const jurisOrder = ["international", "china", "us", "eu", "uk", "japan", "korea"];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl mb-2">{t("brand.name_full")}</h1>
        <p className="text-[var(--muted)]">{t("brand.tagline")}</p>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatCard label={t("dash.total")} value={stats.total} />
        <StatCard label={t("dash.sources_count")} value={SOURCES.length} />
        <StatCard label={t("dash.this_month")} value={thisMonth} />
        <StatCard label={t("dash.latest_update")} value={latestDate} />
      </div>

      {/* Jurisdiction + Type breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="rounded-xl bg-[var(--card-bg)] border border-[var(--border)] p-5">
          <h3 className="text-sm font-semibold mb-3">{t("dash.by_jurisdiction")}</h3>
          <div className="space-y-2">
            {jurisOrder
              .filter((j) => stats.byJurisdiction[j])
              .map((j) => {
                const count = stats.byJurisdiction[j];
                const pct = (count / stats.total) * 100;
                return (
                  <div key={j} className="flex items-center gap-3 text-sm">
                    <span className="w-28 text-[var(--muted)]">
                      {t(`juris.${j}` as never)}
                    </span>
                    <div className="flex-1 h-4 bg-[var(--badge-bg)] rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full bg-[var(--accent)]"
                        style={{ width: `${pct}%`, opacity: 0.7 }}
                      />
                    </div>
                    <span className="w-14 text-right text-xs text-[var(--muted)]">
                      {count} ({pct.toFixed(0)}%)
                    </span>
                  </div>
                );
              })}
          </div>
        </div>
        <div className="rounded-xl bg-[var(--card-bg)] border border-[var(--border)] p-5">
          <h3 className="text-sm font-semibold mb-3">{t("dash.by_type")}</h3>
          <div className="space-y-2">
            {Object.entries(stats.byType)
              .sort(([, a], [, b]) => b - a)
              .map(([type, count]) => {
                const pct = (count / stats.total) * 100;
                return (
                  <div key={type} className="flex items-center gap-3 text-sm">
                    <span className="w-28 text-[var(--muted)]">
                      {t(`type.${type}` as never)}
                    </span>
                    <div className="flex-1 h-4 bg-[var(--badge-bg)] rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full bg-[var(--accent)]"
                        style={{ width: `${pct}%`, opacity: 0.5 }}
                      />
                    </div>
                    <span className="w-14 text-right text-xs text-[var(--muted)]">
                      {count}
                    </span>
                  </div>
                );
              })}
          </div>
        </div>
      </div>

      {/* Top topics */}
      <div className="rounded-xl bg-[var(--card-bg)] border border-[var(--border)] p-5 mb-10">
        <h3 className="text-sm font-semibold mb-3">{t("dash.by_topic")}</h3>
        <div className="flex flex-wrap gap-2">
          {stats.topTopics.map((tt) => (
            <Link
              key={tt.topic}
              href={`/standards?topic=${tt.topic}`}
              className="inline-flex items-center gap-2 rounded-full bg-[var(--badge-bg)] px-3 py-1 text-xs hover:border-[var(--accent)] border border-transparent no-underline text-[var(--text)]"
            >
              <span>{t(`topic.${tt.topic}` as never)}</span>
              <span className="text-[var(--muted)]">{tt.count}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent updates */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl">{t("dash.recent_updates")}</h2>
        <Link
          href="/standards"
          className="text-sm text-[var(--accent)] hover:underline no-underline"
        >
          {t("dash.view_all")} →
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {recent.slice(0, 10).map((r) => (
          <StandardCard key={r.id} standard={r} />
        ))}
      </div>
    </div>
  );
}
