import type { StandardRecord, Category } from "./types";

/**
 * Derive the top-level Category for a record from its type + status.
 *
 * Rules (in order):
 * 1. interpretation type → "interpretations"
 * 2. white_paper or research → "interpretations"
 * 3. consultation status OR draft status OR consultation type → "drafts"
 * 4. meeting_notice type OR policy type → "notices"
 * 5. regulation/standard with in_force/published/revised → "published"
 * 6. recall → "notices"
 * 7. fallback → "notices"
 */
export function categorize(r: StandardRecord): Category {
  if (r.type === "interpretation") return "interpretations";
  if (r.type === "white_paper" || r.type === "research") return "interpretations";
  if (r.status === "consultation" || r.status === "draft" || r.type === "consultation") return "drafts";
  if (r.type === "meeting_notice") return "notices";
  if (r.type === "recall") return "notices";
  if (r.type === "regulation" || r.type === "standard") {
    if (r.status === "in_force" || r.status === "published" || r.status === "revised") return "published";
    return "drafts";
  }
  if (r.type === "policy") {
    // A policy that's in_force is closer to "published" regulation; otherwise notice
    if (r.status === "in_force" || r.status === "published") return "published";
    return "notices";
  }
  return "notices";
}

export const CATEGORY_ORDER: Category[] = ["published", "drafts", "notices", "interpretations"];

export const CATEGORY_META: Record<
  Category,
  { emoji: string; key_en: string; key_cn: string; desc_en: string; desc_cn: string }
> = {
  published: {
    emoji: "📖",
    key_en: "Standards Library",
    key_cn: "标准库",
    desc_en: "Published regulations, standards, and policies currently in force.",
    desc_cn: "已发布、现行有效的法规、标准与政策文件。",
  },
  drafts: {
    emoji: "📝",
    key_en: "Drafts & Consultations",
    key_cn: "征求意见稿",
    desc_en: "Draft standards and regulations in public consultation.",
    desc_cn: "处于公开征求意见阶段的标准和法规草案。",
  },
  notices: {
    emoji: "📢",
    key_en: "Announcements & Notices",
    key_cn: "相关通知",
    desc_en: "Meeting notices, consultation announcements, and official bulletins.",
    desc_cn: "会议通知、征求意见通知、官方公告等信息。",
  },
  interpretations: {
    emoji: "🔍",
    key_en: "Interpretations & Research",
    key_cn: "标准解读",
    desc_en: "White papers, research studies, and expert interpretations of standards.",
    desc_cn: "白皮书、研究报告、专家对标准的深度解读。",
  },
};
