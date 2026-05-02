import { getAllStandards } from "@/lib/data";
import { EVIDENCE_MAPS } from "@/lib/evidence-map";
import EvidenceMapContent from "@/components/evidence-map-content";

export default function MapsPage() {
  const records = getAllStandards();
  return <EvidenceMapContent maps={EVIDENCE_MAPS} records={records} />;
}
