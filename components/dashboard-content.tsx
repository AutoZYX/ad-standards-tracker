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

  const jurisOrder = [
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

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl mb-2">{t("brand.name_full")}</h1>
        <p className="text-[var(--muted)]">{t("brand.tagline")}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <ValuePillar
          title={lang === "zh" ? "标准不是清单" : "Not a link list"}
          body={
            lang === "zh"
              ? "把技术标准、法规准入、测评规程和最佳实践分层整理，避免把草案、新闻和正式标准混在一起。"
              : "Separates standards, binding regulations, assessment protocols, and best practices instead of mixing drafts, notices, and final texts."
          }
        />
        <ValuePillar
          title={lang === "zh" ? "每条记录有证据链" : "Evidence-aware records"}
          body={
            lang === "zh"
              ? "高优先级条目逐步标注法律效力、来源类型、证据等级、核验日期和链接状态。"
              : "High-priority records are being annotated with legal effect, source type, evidence level, verification date, and link status."
          }
        />
        <ValuePillar
          title={lang === "zh" ? "面向安全决策" : "Built for safety decisions"}
          body={
            lang === "zh"
              ? "围绕 SOTIF、功能安全、场景测试、DMS、数据记录、OTA 和准入合规组织信息。"
              : "Organizes information around SOTIF, functional safety, scenario testing, DMS, data recording, OTA, and type approval."
          }
        />
      </div>

      {/* Ask AD Standards hero CTA */}
      <Link
        href="/ask"
        className="block rounded-xl border-2 border-[var(--accent)] bg-gradient-to-r from-[var(--accent)]/10 to-[var(--accent)]/5 p-5 mb-8 hover:from-[var(--accent)]/15 hover:to-[var(--accent)]/10 transition-all no-underline group"
      >
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div>
              <p className="font-semibold text-[var(--text)] mb-1">
                {lang === "zh" ? "试试 Ask AD Standards — AI 智能问答" : "Try Ask AD Standards — AI Assistant"}
              </p>
              <p className="text-sm text-[var(--muted)]">
                {lang === "zh"
                  ? `以自然语言检索 ${stats.total} 条标准/法规/测评规程/动态与 ${SOURCES.length} 个权威数据源。中英文均可。`
                  : `Query ${stats.total} standards/regulations/protocols/updates and ${SOURCES.length} authoritative sources in plain English or Chinese.`}
              </p>
            </div>
          </div>
          <span className="text-[var(--accent)] font-medium text-sm whitespace-nowrap group-hover:translate-x-1 transition-transform">
            {lang === "zh" ? "开始提问 →" : "Start asking →"}
          </span>
        </div>
      </Link>

      <Link
        href="/maps"
        className="block rounded-xl border border-[var(--border)] bg-[var(--card-bg)] p-5 mb-8 hover:border-[var(--accent)] transition-colors no-underline"
      >
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="font-semibold text-[var(--text)] mb-1">
              {lang === "zh" ? "查看专题地图" : "Explore Evidence Maps"}
            </p>
            <p className="text-sm text-[var(--muted)]">
              {lang === "zh"
                ? "按 L2 误用控制、ADS 准入、场景测试、安全案例和远程协助组织证据链。"
                : "Browse evidence chains for L2 misuse control, ADS authorization, scenario testing, safety cases, and remote assistance."}
            </p>
          </div>
          <span className="text-[var(--accent)] font-medium text-sm whitespace-nowrap">
            {lang === "zh" ? "打开 →" : "Open →"}
          </span>
        </div>
      </Link>

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

      <div className="rounded-xl bg-[var(--card-bg)] border border-[var(--border)] p-5 mb-10">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <h3 className="text-sm font-semibold mb-1">{t("dash.data_health")}</h3>
            <p className="text-xs text-[var(--muted)] leading-relaxed max-w-3xl">
              {t("dash.health_note")}
            </p>
          </div>
          <Link
            href="/standards?sourceStatus=blocked"
            className="text-xs text-[var(--accent)] hover:underline no-underline whitespace-nowrap"
          >
            {lang === "zh" ? "查看 blocked →" : "View blocked →"}
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <HealthBlock
            title={t("dash.trust_complete")}
            rows={[
              {
                label: `${stats.trustComplete}/${stats.total}`,
                count: stats.trustComplete,
                pct: stats.total ? (stats.trustComplete / stats.total) * 100 : 0,
              },
            ]}
          />
          <HealthBlock
            title={t("dash.evidence_mix")}
            rows={["A", "B", "C", "D"].map((level) => ({
              label: `Evidence ${level}`,
              count: stats.byEvidenceLevel[level] || 0,
              pct: stats.total ? ((stats.byEvidenceLevel[level] || 0) / stats.total) * 100 : 0,
            }))}
          />
          <HealthBlock
            title={t("dash.source_health")}
            rows={["verified", "paywalled", "blocked", "unverified", "broken"].map((status) => ({
              label: t(`source_status.${status}` as never),
              count: stats.bySourceStatus[status] || 0,
              pct: stats.total ? ((stats.bySourceStatus[status] || 0) / stats.total) * 100 : 0,
            }))}
          />
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

function ValuePillar({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-xl bg-[var(--card-bg)] border border-[var(--border)] p-5">
      <h2 className="text-base mb-2">{title}</h2>
      <p className="text-sm leading-relaxed text-[var(--muted)]">{body}</p>
    </div>
  );
}

function HealthBlock({
  title,
  rows,
}: {
  title: string;
  rows: { label: string; count: number; pct: number }[];
}) {
  return (
    <div>
      <h4 className="text-xs font-semibold text-[var(--muted)] uppercase tracking-wider mb-3">
        {title}
      </h4>
      <div className="space-y-2">
        {rows.map((row) => (
          <div key={row.label} className="text-xs">
            <div className="flex items-center justify-between gap-3 mb-1">
              <span className="text-[var(--muted)]">{row.label}</span>
              <span>{row.count}</span>
            </div>
            <div className="h-2 rounded-full bg-[var(--badge-bg)] overflow-hidden">
              <div
                className="h-full rounded-full bg-[var(--accent)]"
                style={{ width: `${Math.min(100, row.pct)}%`, opacity: 0.7 }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
