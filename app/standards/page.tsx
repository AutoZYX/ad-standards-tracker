import { getAllStandards } from "@/lib/data";
import StandardsPageContent from "@/components/standards-page-content";

export default function StandardsPage() {
  const all = getAllStandards();
  return <StandardsPageContent all={all} />;
}
