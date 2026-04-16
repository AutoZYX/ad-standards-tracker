import { getDashboardStats, getAllStandards } from "@/lib/data";
import DashboardContent from "@/components/dashboard-content";

export default function HomePage() {
  const stats = getDashboardStats();
  const recent = getAllStandards().slice(0, 20);
  return <DashboardContent stats={stats} recent={recent} />;
}
