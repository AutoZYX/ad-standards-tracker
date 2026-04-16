import { getAllStandards } from "./data";
import { categorize, CATEGORY_META } from "./categories";
import { SOURCES, SOURCE_CATEGORY_META } from "./sources";

/**
 * Build a system-prompt context string for the Ask AD Standards feature.
 * Includes all records (compact per-line summary) + source registry.
 */
export function buildSystemContext(): string {
  const records = getAllStandards();

  const recordLines = records
    .map((r) => {
      const lvls = r.automation_level?.length ? r.automation_level.join("/") : "—";
      const topics = r.topics?.length ? r.topics.join(",") : "—";
      const related = r.related_standards?.length
        ? ` | Related: ${r.related_standards.join(", ")}`
        : "";
      const summaryEn = r.summary_en?.trim().slice(0, 300) ?? "";
      const summaryCn = r.summary_cn?.trim().slice(0, 300) ?? "";
      const impact = r.impact_note?.trim().slice(0, 250) ?? "";
      const effective = r.effective_date ? ` | Effective: ${r.effective_date}` : "";
      return `[${r.id}] ${r.date} | ${r.org} | ${r.jurisdiction} | type=${r.type} status=${r.status} | category=${categorize(r)} | Levels: ${lvls} | Topics: ${topics}${effective}
Title EN: ${r.title_en}
Title CN: ${r.title_cn ?? "(no Chinese)"}
URL: ${r.url}
Summary EN: ${summaryEn}
Summary CN: ${summaryCn || "(no Chinese)"}${impact ? `\nImpact: ${impact}` : ""}${related}`;
    })
    .join("\n\n");

  const sourceLines = SOURCES.map(
    (s) =>
      `- ${s.short} (${s.name_en} / ${s.name_cn}) — ${s.jurisdiction} | category=${s.category} | ${s.url}\n  ${s.description_en}`
  ).join("\n");

  const catList = Object.entries(CATEGORY_META)
    .map(([k, m]) => `${m.emoji} ${k}: ${m.key_en} (${m.key_cn}) — ${m.desc_en}`)
    .join("\n");

  const srcCatList = Object.entries(SOURCE_CATEGORY_META)
    .map(([k, m]) => `${m.emoji} ${k}: ${m.key_en} (${m.key_cn}) — ${m.desc_en}`)
    .join("\n");

  return `You are "Ask AD Standards" — an AI assistant specializing in automated driving regulations, standards, consultation drafts, and interpretations.

# CRITICAL RULES
1. **Language mirroring**: If the user asks in Chinese, respond ENTIRELY in Chinese. If in English, respond entirely in English. Never mix.
2. **Ground in data only**: Answer based ONLY on the records in this context. If information is missing, say so explicitly — NEVER fabricate standard numbers, dates, or URLs.
3. **Cite record IDs**: When referencing specific records, cite by ID (e.g. STD-MIIT-2026-001, STD-ISO-2022-003). Users can use the ID to look up full detail on the site.
4. **Respect the ⚠️ markers**: Records with ⚠️[请核实：...] or similar markers have fields that are not fully verified by the author. If a user asks a question whose answer depends on a marked field, pass on the caveat.
5. **Be concise**: Prefer bulleted lists and short paragraphs. Aim for answers under 300 words unless the question explicitly calls for depth.
6. **Point to original sources**: Always include the URL of the cited record so the user can verify.

# CATEGORIES
${catList}

# SOURCE CATEGORIES
${srcCatList}

# RECORDS DATABASE (${records.length} records, bilingual where available)
${recordLines}

# SOURCES REGISTRY (${SOURCES.length} organizations)
${sourceLines}`;
}
