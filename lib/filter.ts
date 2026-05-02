import type {
  EvidenceLevel,
  LegalForce,
  SourceStatus,
  SourceType,
  StandardRecord,
  Jurisdiction,
} from "./types";

export function filterStandards(
  all: StandardRecord[],
  filters: {
    jurisdiction?: Jurisdiction | "";
    org?: string;
    type?: string;
    status?: string;
    year?: string;
    topic?: string;
    search?: string;
    level?: string;
    legalForce?: LegalForce | "";
    sourceType?: SourceType | "";
    evidenceLevel?: EvidenceLevel | "";
    sourceStatus?: SourceStatus | "";
  }
): StandardRecord[] {
  return all.filter((s) => {
    if (filters.jurisdiction && s.jurisdiction !== filters.jurisdiction) return false;
    if (filters.org && s.org !== filters.org) return false;
    if (filters.type && s.type !== filters.type) return false;
    if (filters.status && s.status !== filters.status) return false;
    if (filters.year && !s.date.startsWith(filters.year)) return false;
    if (filters.topic && !s.topics?.includes(filters.topic as never)) return false;
    if (filters.level && !s.automation_level?.includes(filters.level as never)) return false;
    if (filters.legalForce && s.legal_force !== filters.legalForce) return false;
    if (filters.sourceType && s.source_type !== filters.sourceType) return false;
    if (filters.evidenceLevel && s.evidence_level !== filters.evidenceLevel) return false;
    if (filters.sourceStatus && s.source_status !== filters.sourceStatus) return false;
    if (filters.search) {
      const q = filters.search.toLowerCase();
      const hay = `${s.title_en} ${s.title_cn || ""} ${s.summary_en || ""} ${s.summary_cn || ""} ${s.id}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });
}
