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

export type DocumentStage =
  | "published"
  | "in_force"
  | "draft"
  | "consultation"
  | "approval_draft"
  | "proposal"
  | "superseded"
  | "withdrawn";

export type LegalForce =
  | "binding"
  | "voluntary"
  | "rating_protocol"
  | "guidance"
  | "best_practice"
  | "informational";

export type SourceType =
  | "official"
  | "official_news"
  | "official_catalog"
  | "standards_store"
  | "secondary"
  | "interpretation";

export type EvidenceLevel = "A" | "B" | "C" | "D";

export type SourceStatus =
  | "verified"
  | "paywalled"
  | "blocked"
  | "broken"
  | "unverified";

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
 * Derived from `type` + `org` + title keywords via categorize() in lib/categories.ts.
 *
 * Categories model the real-world distinction between:
 * - "standards"     : technical standards with org+number (ISO/IEEE/SAE/UL/GB/KS)
 * - "regulations"   : legal instruments (UN-R/EU Reg/national Acts)
 * - "assessments"   : NCAP-family consumer assessment protocols (Euro NCAP/C-NCAP/i-VISTA)
 * - "updates"       : drafts, meeting notices, policy roadmaps, interpretations, recalls
 */
export type Category =
  | "standards"
  | "regulations"
  | "assessments"
  | "updates";

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
  document_stage?: DocumentStage;
  legal_force?: LegalForce;
  source_type?: SourceType;
  evidence_level?: EvidenceLevel;
  verified_at?: string;
  source_status?: SourceStatus;
  source_note?: string;
  version?: string;
  supersedes?: string[];
  superseded_by?: string[];
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
  byLegalForce: Record<string, number>;
  byEvidenceLevel: Record<string, number>;
  bySourceStatus: Record<string, number>;
  trustComplete: number;
  byYear: Record<string, number>;
  byOrg: Record<string, number>;
  topTopics: { topic: string; count: number }[];
  recentUpdates: StandardRecord[];
}

/**
 * Categorization of data sources for the Sources page.
 * Per 2026-04-16 user review:
 * - sdo: national & international **official** SDOs — ISO, UNECE, SAC/TC114, KATS, JASIC, JSAE, DIN/VDA, ANSI
 * - industry_org: **industry-led** consortia/associations — IEEE, SAE, UL, ASAM, AUTOSAR, 3GPP, 5GAA
 * - government: regulatory authorities (ministries, DMVs)
 * - assessment: NCAP-family consumer assessment bodies
 * - demonstration: pilot/demonstration zones
 */
export type SourceCategory =
  | "government"
  | "sdo"
  | "industry_org"
  | "assessment"
  | "demonstration";

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
