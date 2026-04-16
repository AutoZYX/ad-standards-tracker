import { getAllStandards, getStandardById } from "@/lib/data";
import StandardDetail from "@/components/standard-detail";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return getAllStandards().map((s) => ({ id: s.id }));
}

export default async function StandardDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const standard = getStandardById(id);
  if (!standard) notFound();
  return <StandardDetail standard={standard} />;
}
