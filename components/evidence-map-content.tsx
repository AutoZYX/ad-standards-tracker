"use client";

import Link from "next/link";
import type { EvidenceMap } from "@/lib/evidence-map";
import type { StandardRecord } from "@/lib/types";
import { useI18n } from "@/lib/i18n";
import StandardCard from "./standard-card";

interface Props {
  maps: EvidenceMap[];
  records: StandardRecord[];
}

export default function EvidenceMapContent({ maps, records }: Props) {
  const { t, lang } = useI18n();
  const byId = new Map(records.map((record) => [record.id, record]));

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl mb-2">{t("maps.title")}</h1>
        <p className="text-[var(--muted)] max-w-3xl leading-relaxed">
          {t("maps.desc")}
        </p>
      </div>

      <div className="space-y-6">
        {maps.map((map) => {
          const selected = map.record_ids
            .map((id) => byId.get(id))
            .filter((record): record is StandardRecord => Boolean(record));
          const missing = map.record_ids.filter((id) => !byId.has(id));
          return (
            <section
              key={map.slug}
              id={map.slug}
              className="border-t border-[var(--border)] pt-6 scroll-mt-24"
            >
              <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-5">
                <div>
                  <p className="text-xs font-mono uppercase text-[var(--muted)] mb-2">
                    {map.slug}
                  </p>
                  <h2 className="text-xl leading-tight mb-3">
                    {lang === "zh" ? map.title_cn : map.title_en}
                  </h2>
                  <p className="text-sm leading-relaxed text-[var(--muted)] mb-3">
                    {lang === "zh" ? map.desc_cn : map.desc_en}
                  </p>
                  <p className="text-sm leading-relaxed border-l-2 border-[var(--accent)] pl-3">
                    {lang === "zh" ? map.decision_cn : map.decision_en}
                  </p>
                  {missing.length > 0 && (
                    <p className="mt-3 text-xs text-[var(--muted)]">
                      {lang === "zh" ? "待补记录：" : "Missing records: "}
                      {missing.join(", ")}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selected.map((record) => (
                    <StandardCard key={record.id} standard={record} />
                  ))}
                </div>
              </div>
            </section>
          );
        })}
      </div>

      <div className="mt-10 rounded-xl border border-[var(--border)] bg-[var(--card-bg)] p-5">
        <h2 className="text-lg mb-2">
          {lang === "zh" ? "如何使用专题地图" : "How to use these maps"}
        </h2>
        <p className="text-sm text-[var(--muted)] leading-relaxed mb-4">
          {lang === "zh"
            ? "专题地图不是新的标准分类，而是面向工程决策的证据集合。同一条记录可能同时影响准入、测评、SOTIF 和运营监管。"
            : "Evidence maps are decision-oriented evidence sets, not a new standard taxonomy. The same record can affect authorization, assessment, SOTIF, and in-use operation at the same time."}
        </p>
        <Link
          href="/standards"
          className="text-sm text-[var(--accent)] hover:underline no-underline"
        >
          {lang === "zh" ? "返回标准库" : "Back to Standards Library"}
        </Link>
      </div>
    </div>
  );
}
