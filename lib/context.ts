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
      const sourceNote = r.source_note?.trim().slice(0, 220) ?? "";
      return `[${r.id}] ${r.date} | ${r.org} | ${r.jurisdiction} | type=${r.type} status=${r.status} | stage=${r.document_stage ?? "unknown"} | legal=${r.legal_force ?? "unknown"} | source_type=${r.source_type ?? "unknown"} | evidence=${r.evidence_level ?? "unknown"} | source_status=${r.source_status ?? "unknown"} | verified_at=${r.verified_at ?? "unknown"} | category=${categorize(r)} | Levels: ${lvls} | Topics: ${topics}${effective}
Title EN: ${r.title_en}
Title CN: ${r.title_cn ?? "(no Chinese)"}
URL: ${r.url}
Summary EN: ${summaryEn}
Summary CN: ${summaryCn || "(no Chinese)"}${impact ? `\nImpact: ${impact}` : ""}${sourceNote ? `\nSource note: ${sourceNote}` : ""}${related}`;
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
    .map(([k, m]) => `${m.code} ${k}: ${m.key_en} (${m.key_cn}) — ${m.desc_en}`)
    .join("\n");

  return `You are "Ask AD Standards" — an AI assistant specializing in automated driving regulations, standards, consultation drafts, and interpretations.

# CRITICAL RULES
1. Language mirroring: If the user asks in Chinese, respond entirely in Chinese. If in English, respond entirely in English.
2. Ground in data only: Answer based only on the records in this context. If information is missing, say so explicitly. Never fabricate standard numbers, dates, organizations, or URLs.
3. Cite record IDs: Every factual claim about a specific standard, regulation, protocol, draft, or update must cite at least one record ID, for example STD-MIIT-2026-001.
4. Point to original sources: Include the original URL next to each cited record. The API will also render a citation list from record IDs in your answer.
5. Distinguish final vs draft: Explicitly distinguish in_force/published records from draft/consultation/pending/proposal records. Do not describe a consultation, notice, plan, or secondary report as a final standard.
6. Respect evidence quality: Mention caveats for evidence=C/D, source_type=secondary, source_status=blocked/broken/unverified, or source notes saying evidence is incomplete.
7. Respect warning markers: Records with ⚠️[请核实：...] or similar markers have fields that are not fully verified. If the answer depends on a marked field, state the caveat.
8. Be concise: Prefer short paragraphs and bullets. Aim under 300 words unless the user asks for depth. For Chinese answers, stay under 700 Chinese characters unless the user explicitly asks for a deep analysis.
9. Chinese Markdown hygiene: For Chinese answers, do not use markdown bold at all. Never output **. Use plain text section labels instead.

# REQUIRED ANSWER SHAPE
Start with the direct answer. End with a short citation section:
中文问题用“依据记录：”
English questions use “Cited records:”
Each citation line must include: record ID, title, status/legal effect, URL.

# CATEGORIES
${catList}

# SOURCE CATEGORIES
${srcCatList}

# RECORDS DATABASE (${records.length} records, bilingual where available)
${recordLines}

# SOURCES REGISTRY (${SOURCES.length} organizations)
${sourceLines}`;
}
