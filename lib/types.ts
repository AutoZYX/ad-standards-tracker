export type Jurisdiction =
  | "international"
  | "china"
  | "us"
  | "eu"
  | "uk"
  | "japan"
  | "korea";

export type StandardType =
  | "regulation"
  | "standard"
  | "consultation"
  | "meeting_notice"
  | "recall"
  | "white_paper"
  | "policy"
  | "research";

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
  | "operations";

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
  byJurisdiction: Record<string, number>;
  byType: Record<string, number>;
  byStatus: Record<string, number>;
  byYear: Record<string, number>;
  byOrg: Record<string, number>;
  topTopics: { topic: string; count: number }[];
  recentUpdates: StandardRecord[];
}

export interface SourceInfo {
  id: string;
  name_en: string;
  name_cn: string;
  short: string;
  url: string;
  jurisdiction: Jurisdiction;
  language: "EN" | "CN" | "JP" | "EN/CN" | "EN/JP";
  description_en: string;
  description_cn: string;
  crawl_difficulty: "easy" | "medium" | "hard";
}
