"use client";

import type { StandardRecord } from "@/lib/types";
import { useI18n } from "@/lib/i18n";
import StandardsFilters from "./standards-filters";

export default function StandardsPageContent({ all }: { all: StandardRecord[] }) {
  const { t } = useI18n();
  return (
    <div>
      <h1 className="text-3xl mb-2">{t("std.title")}</h1>
      <p className="text-[var(--muted)] mb-6">{t("std.desc")}</p>
      <StandardsFilters all={all} />
    </div>
  );
}
