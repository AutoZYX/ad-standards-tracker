"use client";

import Link from "next/link";
import type { StandardRecord } from "@/lib/types";
import { useI18n } from "@/lib/i18n";

export default function StandardDetail({ standard }: { standard: StandardRecord }) {
  const { t, lang } = useI18n();
  const title = lang === "zh" && standard.title_cn ? standard.title_cn : standard.title_en;
  const altTitle = lang === "zh" ? standard.title_en : standard.title_cn;
  const summary = lang === "zh" && standard.summary_cn ? standard.summary_cn : standard.summary_en;

  const section = "mb-6";
  const sectionTitle =
    "text-xs font-semibold text-[var(--muted)] uppercase tracking-wider mb-2";

  return (
    <div>
      <Link
        href="/standards"
        className="text-sm text-[var(--accent)] hover:underline no-underline mb-4 inline-block"
      >
        ← {t("std.back")}
      </Link>

      <div className="rounded-xl bg-[var(--card-bg)] border border-[var(--border)] p-6 shadow-[var(--card-shadow)]">
        {/* Header */}
        <div className="mb-6">
          <p className="text-xs font-mono text-[var(--muted)] mb-1">{standard.id}</p>
          <h1 className="text-2xl mb-2 leading-tight">{title}</h1>
          {altTitle && (
            <p className="text-sm text-[var(--muted)] leading-tight">{altTitle}</p>
          )}
        </div>

        {/* Meta grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 text-sm">
          <div>
            <p className={sectionTitle}>{t("detail.jurisdiction")}</p>
            <p>{t(`juris.${standard.jurisdiction}` as never)}</p>
          </div>
          <div>
            <p className={sectionTitle}>{t("detail.org")}</p>
            <p>{standard.org}</p>
          </div>
          <div>
            <p className={sectionTitle}>{t("detail.type")}</p>
            <p>{t(`type.${standard.type}` as never)}</p>
          </div>
          <div>
            <p className={sectionTitle}>{t("detail.status")}</p>
            <p>{t(`status.${standard.status}` as never)}</p>
          </div>
          <div>
            <p className={sectionTitle}>{t("detail.date")}</p>
            <p>{standard.date}</p>
          </div>
          {standard.effective_date && (
            <div>
              <p className={sectionTitle}>{t("detail.effective")}</p>
              <p>{standard.effective_date}</p>
            </div>
          )}
          {standard.automation_level && standard.automation_level.length > 0 && (
            <div>
              <p className={sectionTitle}>{t("detail.automation")}</p>
              <p>{standard.automation_level.join(", ")}</p>
            </div>
          )}
        </div>

        {/* URL */}
        <div className={section}>
          <p className={sectionTitle}>{t("detail.url")}</p>
          <a
            href={standard.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-[var(--accent)] hover:underline break-all"
          >
            {standard.url}
          </a>
        </div>

        {/* Topics */}
        {standard.topics && standard.topics.length > 0 && (
          <div className={section}>
            <p className={sectionTitle}>{t("detail.topics")}</p>
            <div className="flex flex-wrap gap-1.5">
              {standard.topics.map((tp) => (
                <span
                  key={tp}
                  className="text-xs px-2 py-0.5 rounded bg-[var(--badge-bg)] text-[var(--muted)]"
                >
                  {t(`topic.${tp}` as never)}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Summary */}
        {summary && (
          <div className={section}>
            <p className={sectionTitle}>{t("detail.summary")}</p>
            <p className="text-sm leading-relaxed">{summary}</p>
          </div>
        )}

        {/* Impact note */}
        {standard.impact_note && (
          <div className={section}>
            <p className={sectionTitle}>{t("detail.impact")}</p>
            <p className="text-sm leading-relaxed text-[var(--muted)]">
              {standard.impact_note}
            </p>
          </div>
        )}

        {/* Related */}
        {standard.related_standards && standard.related_standards.length > 0 && (
          <div className={section}>
            <p className={sectionTitle}>{t("detail.related")}</p>
            <div className="flex flex-wrap gap-2">
              {standard.related_standards.map((rs) => (
                <span
                  key={rs}
                  className="text-xs px-2 py-0.5 rounded border border-[var(--border)]"
                >
                  {rs}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="pt-4 border-t border-[var(--border)] text-xs text-[var(--muted)] flex flex-wrap gap-4">
          {standard.contributor && <span>Contributor: {standard.contributor}</span>}
          {standard.last_updated && <span>Updated: {standard.last_updated}</span>}
        </div>
      </div>
    </div>
  );
}
