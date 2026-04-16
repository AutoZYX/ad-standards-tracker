import fs from "fs";
import path from "path";
import yaml from "js-yaml";
import type { StandardRecord, DashboardStats } from "./types";
export type { DashboardStats } from "./types";

const DATA_DIR = path.join(process.cwd(), "standards");

export function getAllStandards(): StandardRecord[] {
  if (!fs.existsSync(DATA_DIR)) return [];
  const records: StandardRecord[] = [];

  const jurisdictions = fs.readdirSync(DATA_DIR).filter((d) =>
    fs.statSync(path.join(DATA_DIR, d)).isDirectory()
  );

  for (const j of jurisdictions) {
    const jDir = path.join(DATA_DIR, j);
    const years = fs.readdirSync(jDir).filter((d) =>
      fs.statSync(path.join(jDir, d)).isDirectory()
    );
    for (const y of years) {
      const yDir = path.join(jDir, y);
      const files = fs.readdirSync(yDir).filter((f) => f.endsWith(".yaml"));
      for (const f of files) {
        try {
          const content = fs.readFileSync(path.join(yDir, f), "utf-8");
          const record = yaml.load(content) as StandardRecord;
          records.push(record);
        } catch (err) {
          console.error(`Failed to parse ${f}:`, err);
        }
      }
    }
  }

  return records.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getStandardById(id: string): StandardRecord | null {
  return getAllStandards().find((r) => r.id === id) ?? null;
}

export function getDashboardStats(): DashboardStats {
  const standards = getAllStandards();
  const byJurisdiction: Record<string, number> = {};
  const byType: Record<string, number> = {};
  const byStatus: Record<string, number> = {};
  const byYear: Record<string, number> = {};
  const byOrg: Record<string, number> = {};
  const topicCounts: Record<string, number> = {};

  for (const s of standards) {
    byJurisdiction[s.jurisdiction] = (byJurisdiction[s.jurisdiction] || 0) + 1;
    byType[s.type] = (byType[s.type] || 0) + 1;
    byStatus[s.status] = (byStatus[s.status] || 0) + 1;
    const year = s.date.substring(0, 4);
    byYear[year] = (byYear[year] || 0) + 1;
    byOrg[s.org] = (byOrg[s.org] || 0) + 1;
    for (const t of s.topics || []) {
      topicCounts[t] = (topicCounts[t] || 0) + 1;
    }
  }

  const topTopics = Object.entries(topicCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 8)
    .map(([topic, count]) => ({ topic, count }));

  return {
    total: standards.length,
    byJurisdiction,
    byType,
    byStatus,
    byYear,
    byOrg,
    topTopics,
    recentUpdates: standards.slice(0, 20),
  };
}

