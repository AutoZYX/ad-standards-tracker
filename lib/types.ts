export type Jurisdiction =
  | "international"
  | "industry_org"  // NEW: VDA, ASAM, AUTOSAR, etc.
  | "china"
  | "us"
  | "eu"
  | "uk"
  | "japan"
  | "korea"
  | "singapore"
  | "germany";

export type StandardType =
  | "regulation"
  | "standard"
  | "consultation"
  | "meeting_notice"
  | "recall"
  | "white_paper"
  | "policy"
  | "research"
  | "interpretation"; // NEW: 标准解读

export type StandardStatus =
  | "draft"
  | "consultation"
  | "published"
  | "revised"
  | "withdrawn"
  | "pending"
  | "in_force";

export type AutomationLevel = "L0" | "L1" | "L2" | "L3" | "L4" | "L5";

export type Topic =
  | "functional_safety"
  | "sotif"
  | "cybersecurity"
  | "data_recording"
  | "teleoperation"
  | "testing"
  | "perception"
  | "hmi"
  | "v2x"
  | "ota"
  | "privacy"
  | "ai_governance"
  | "type_approval"
  | "operations"
  | "scenario_description"; // NEW: OpenSCENARIO, OpenDRIVE etc.

/**
 * Top-level category for Standards Library UI navigation.
 * Derived from `type` + `status` via categorize() in lib/categories.ts.
 */
export type Category =
  | "published"      // 真正的标准库 — regulation/standard already in_force/published
  | "drafts"         // 标准征求意见稿 — consultation or draft
  | "notices"        // 相关通知 — meeting_notice, policy announcements
  | "interpretations"; // 标准解读 — white_paper/research/interpretation

export interface StandardRecord {
  id: string;
  date: string;
  org: string;
  org_full?: string;
  jurisdiction: Jurisdiction;
  type: StandardType;
  status: StandardStatus;
  title_en: string;
  title_cn?: string;
  url: string;
  effective_date?: string;
  automation_level?: AutomationLevel[];
  topics?: Topic[];
  summary_en?: string;
  summary_cn?: string;
  impact_note?: string;
  related_standards?: string[];
  contributor?: string;
  last_updated?: string;
}

export interface DashboardStats {
  total: number;
  byCategory: Record<Category, number>;
  byJurisdiction: Record<string, number>;
  byType: Record<string, number>;
  byStatus: Record<string, number>;
  byYear: Record<string, number>;
  byOrg: Record<string, number>;
  topTopics: { topic: string; count: number }[];
  recentUpdates: StandardRecord[];
}

/**
 * Categorization of data sources for the Sources page.
 * Separates government regulators, national SDOs, industry orgs, and assessment bodies.
 */
export type SourceCategory =
  | "government"       // 政府监管 (MIIT, NHTSA, EC, UK DfT, MLIT/METI, MOLIT, etc.)
  | "sdo"              // 国家/国际标准组织 (ISO, UNECE, SAC/TC114, SAE, IEEE, KATS)
  | "industry_org"     // 行业标准组织 (VDA, ASAM, AUTOSAR, 5GAA, TISAX)
  | "assessment"       // 测评机构 (Euro NCAP, C-NCAP/CATARC, CAERI, IIHS)
  | "demonstration";   // 示范区 (Beijing HAD, Shanghai ICV, Shenzhen)

export interface SourceInfo {
  id: string;
  name_en: string;
  name_cn: string;
  short: string;
  url: string;
  jurisdiction: Jurisdiction;
  category: SourceCategory;
  language: "EN" | "CN" | "JP" | "DE" | "EN/CN" | "EN/JP" | "EN/DE" | "EN/DE/JP";
  description_en: string;
  description_cn: string;
  crawl_difficulty: "easy" | "medium" | "hard";
}
