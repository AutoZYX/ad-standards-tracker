import type { StandardRecord, Category } from "./types";

/**
 * Derive the top-level Category for a record from (type + org + title + status).
 *
 * Priority order (first matching wins):
 * 1. Rating protocols and NCAP-family records → "assessments"
 * 2. Draft / consultation / meeting_notice / recall / interpretation / white_paper / research / policy → "updates"
 * 2. UN-R regulations / national legal acts / EU regulations → "regulations"
 * 3. NCAP family + i-VISTA + assessment protocols → "assessments"
 * 4. Everything else of type "standard" or type "regulation" that isn't UN-R/Act → "standards"
 * 5. Fallback → "updates"
 */
export function categorize(r: StandardRecord): Category {
  const title = `${r.title_en} ${r.title_cn ?? ""}`.toLowerCase();
  const org = r.org.toLowerCase();

  // ---- 1. Assessment protocols (NCAP-family etc.) — check FIRST ----
  // These are "测评规程" — consumer-facing assessment protocols. They may be typed as
  // standard / white_paper / policy, but belong here regardless.
  const isAssessment =
    r.legal_force === "rating_protocol" ||
    /euro\s*ncap|c-?ncap|jncap|kncap|\bncap\b|c-icap|i-vista|ivista|\biihs\b|assessment protocol|测评规程|测评体系/.test(title) ||
    org.includes("c-ncap") ||
    org.includes("c-icap") ||
    org.includes("jncap") ||
    org.includes("kncap") ||
    org.includes("euro ncap") ||
    org.includes("i-vista") ||
    org.includes("caeri");

  if (isAssessment) {
    // But if it's in draft/consultation phase, treat as an update
    if (
      r.status === "draft" ||
      r.status === "consultation" ||
      r.status === "pending" ||
      r.type === "consultation" ||
      r.type === "meeting_notice"
    ) {
      return "updates";
    }
    if (r.type === "interpretation" || r.type === "research") {
      return "updates";
    }
    return "assessments";
  }

  // ---- 2. Updates bucket: drafts, consultations, notices, interpretations ----
  if (
    r.type === "consultation" ||
    r.type === "meeting_notice" ||
    r.type === "recall" ||
    r.type === "interpretation" ||
    r.type === "white_paper" ||
    r.type === "research" ||
    r.status === "draft" ||
    r.status === "consultation" ||
    r.status === "withdrawn" ||
    r.status === "pending"
  ) {
    return "updates";
  }

  // ---- 3. Regulations bucket: legal instruments ----
  const isStrictRegulation =
    r.type === "regulation" ||
    /\bun[-\s]?r\s*\d/i.test(title) ||
    /un regulation/i.test(title) ||
    /automated vehicles act/i.test(title) ||
    /regulation \(eu\)/i.test(title) ||
    /\bact\b.*automat/i.test(title) ||
    /商业化促进.*法|管理条例|管理办法|presidential decree|stvg|fmvss/i.test(title) ||
    /federal motor vehicle safety/i.test(title);

  if (isStrictRegulation) {
    return "regulations";
  }

  // Policy docs: roadmaps/strategies/reports/notices → updates; binding ordinances → regulations
  if (r.type === "policy") {
    if (
      /roadmap|strategy|report to congress|vision \d{4}|white paper|guidelines|plan|路线图|规划|战略|指南|年报|年度|通知|公告/i.test(
        title
      )
    ) {
      return "updates";
    }
    return "regulations";
  }

  // ---- 4. Pure technical standards ----
  if (r.type === "standard") {
    return "standards";
  }

  // Fallback
  return "updates";
}

export const CATEGORY_ORDER: Category[] = [
  "standards",
  "regulations",
  "assessments",
  "updates",
];

export const CATEGORY_META: Record<
  Category,
  { emoji: string; key_en: string; key_cn: string; desc_en: string; desc_cn: string }
> = {
  standards: {
    emoji: "📘",
    key_en: "Standards",
    key_cn: "标准",
    desc_en: "Technical standards with formal numbering (ISO, IEEE, SAE, UL, GB/GB-T, KS, JIS, DIN).",
    desc_cn: "带有正式编号的技术标准 — ISO、IEEE、SAE、UL、中国 GB/GB-T、韩国 KS、日本 JIS、德国 DIN 等。",
  },
  regulations: {
    emoji: "⚖️",
    key_en: "Regulations",
    key_cn: "法规",
    desc_en: "Legal instruments: UN ECE regulations (UN-R series), national Acts, EU Regulations, local ICV ordinances.",
    desc_cn: "法律性文件：UN ECE 法规（UN-R 系列）、各国法案、欧盟法规、地方智能网联车条例等。",
  },
  assessments: {
    emoji: "⭐",
    key_en: "Assessment Protocols",
    key_cn: "测评规程",
    desc_en: "Consumer assessment programs: Euro NCAP, C-NCAP, JNCAP, KNCAP, i-VISTA, etc.",
    desc_cn: "消费者测评项目：Euro NCAP、C-NCAP、JNCAP、KNCAP、i-VISTA 等测评规程。",
  },
  updates: {
    emoji: "📰",
    key_en: "Latest Updates",
    key_cn: "最新动态",
    desc_en: "Drafts, consultations, meeting notices, recalls, policy white papers, and standard interpretations.",
    desc_cn: "征求意见稿、会议通知、召回公告、政策白皮书、标准解读等动态信息。",
  },
};
