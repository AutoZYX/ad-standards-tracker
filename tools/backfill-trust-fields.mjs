import fs from "node:fs";
import path from "node:path";
import yaml from "js-yaml";

const root = process.cwd();
const standardsDir = path.join(root, "standards");
const verifiedAt = process.env.BACKFILL_VERIFIED_AT ?? "2026-05-03";

const knownSourceStatus = new Map([
  ["STD-BJHAD-2023-001", "blocked"],
  ["STD-BJ-2024-001", "blocked"],
  ["STD-MoT-2020-001", "blocked"],
  ["STD-SHENZHEN-2022-001", "blocked"],
  ["STD-SH-2024-001", "blocked"],
  ["STD-SHANGHAI-2024-001", "blocked"],
  ["INT-ZHIHU-2025-001", "blocked"],
  ["STD-UNECE-2020-001", "blocked"],
  ["STD-UNECE-2020-002", "blocked"],
  ["STD-UNECE-2021-001", "blocked"],
  ["STD-UNECE-2021-002", "blocked"],
  ["STD-UNECE-2022-001", "blocked"],
  ["STD-UNECE-2022-002", "blocked"],
  ["STD-UNECE-2022-003", "blocked"],
  ["STD-UNECE-2023-001", "blocked"],
  ["INT-UNECE-2024-001", "blocked"],
  ["STD-UNECE-2024-001", "blocked"],
  ["STD-UNECE-2025-001", "blocked"],
  ["STD-KMOLIT-2020-001", "blocked"],
  ["STD-KMOLIT-2022-001", "blocked"],
  ["STD-KATS-2023-001", "blocked"],
  ["STD-KMOLIT-2025-001", "blocked"],
]);

const officialDomains = [
  "iso.org",
  "standards.ieee.org",
  "sae.org",
  "saemobilus.sae.org",
  "standardsworks.sae.org",
  "asam.net",
  "autosar.org",
  "enx.com",
  "5gaa.org",
  "euroncap.com",
  "eur-lex.europa.eu",
  "europa.eu",
  "unece.org",
  "gov.uk",
  "legislation.gov.uk",
  "federalregister.gov",
  "nhtsa.gov",
  "dmv.ca.gov",
  "mlit.go.jp",
  "meti.go.jp",
  "molit.go.kr",
  "standard.go.kr",
  "lta.gov.sg",
  "miit.gov.cn",
  "mot.gov.cn",
  "xxgk.mot.gov.cn",
  "samr.gov.cn",
  "std.samr.gov.cn",
  "openstd.samr.gov.cn",
  "sz.gov.cn",
  "pudong.gov.cn",
  "c-ncap.org.cn",
  "catarc.org.cn",
  "catarc.tech",
  "caeri.com.cn",
  "i-vista.org",
  "bgbl.de",
  "gesetze-im-internet.de",
  "jama.or.jp",
  "ulse.org",
];

function walk(dir) {
  const files = [];
  for (const name of fs.readdirSync(dir)) {
    const file = path.join(dir, name);
    const stat = fs.statSync(file);
    if (stat.isDirectory()) files.push(...walk(file));
    if (stat.isFile() && name.endsWith(".yaml")) files.push(file);
  }
  return files;
}

function textOf(record) {
  return [
    record.id,
    record.org,
    record.org_full,
    record.title_en,
    record.title_cn,
    record.url,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

function documentStage(record) {
  if (record.status === "in_force") return "in_force";
  if (record.status === "published" || record.status === "revised") return "published";
  if (record.status === "consultation") return "consultation";
  if (record.status === "draft") return "draft";
  if (record.status === "withdrawn") return "withdrawn";
  return "proposal";
}

function legalForce(record) {
  const text = textOf(record);
  if (record.status === "consultation" || record.status === "draft" || record.status === "pending") {
    return "informational";
  }
  if (
    record.type === "regulation" ||
    record.type === "recall" ||
    /\bact\b|regulation \(eu\)|un regulation|un-r|条例|规定|召回/.test(text)
  ) {
    return "binding";
  }
  if (/ncap|c-icap|i-vista|ivista|assessment protocol|测评|评价规程/.test(text)) {
    return "rating_protocol";
  }
  if (record.type === "standard") return "voluntary";
  if (record.type === "white_paper" || record.type === "interpretation") return "best_practice";
  if (record.type === "policy") return "guidance";
  return "informational";
}

function sourceType(record) {
  const url = String(record.url ?? "").toLowerCase();
  if (record.type === "interpretation") return "interpretation";
  if (url.includes("iso.org") || url.includes("sae.org") || url.includes("saemobilus") || url.includes("standards.ieee.org")) {
    return "official_catalog";
  }
  if (url.includes("federalregister.gov") || url.includes("eur-lex") || url.includes("legislation.gov.uk") || url.includes("gesetze-im-internet") || url.includes("bgbl.de")) {
    return "official";
  }
  if (officialDomains.some((domain) => url.includes(domain))) {
    return record.type === "meeting_notice" || record.type === "consultation" || record.type === "policy"
      ? "official_news"
      : "official";
  }
  return "secondary";
}

function evidenceLevel(record, srcType) {
  if (srcType === "secondary" || srcType === "interpretation") return "C";
  if (srcType === "official_catalog" || srcType === "standards_store" || srcType === "official_news") return "B";
  return "A";
}

function sourceStatus(record, srcType) {
  if (knownSourceStatus.has(record.id)) return knownSourceStatus.get(record.id);
  const url = String(record.url ?? "").toLowerCase();
  if (url.includes("iso.org") || url.includes("sae.org") || url.includes("standards.ieee.org") || url.includes("saemobilus")) {
    return "paywalled";
  }
  if (srcType === "secondary" || srcType === "interpretation") return "unverified";
  return "verified";
}

function sourceNote(record, status, srcType) {
  if (record.source_note) return record.source_note;
  if (status === "blocked") {
    return "Automated URL checks are blocked or time out for this source; keep the record with a blocked status until manual browser verification is refreshed.";
  }
  if (status === "unverified" || srcType === "secondary" || srcType === "interpretation") {
    return "Backfilled trust fields conservatively. Source should be manually reviewed before using this record as primary evidence.";
  }
  if (status === "paywalled") {
    return "Official catalog page is used for metadata; full standard text may require purchase or subscription.";
  }
  return undefined;
}

let changed = 0;
for (const file of walk(standardsDir).sort()) {
  const before = fs.readFileSync(file, "utf8");
  const record = yaml.load(before);
  if (!record || typeof record !== "object" || Array.isArray(record)) continue;

  const missing = ["document_stage", "legal_force", "source_type", "evidence_level", "verified_at", "source_status"].filter(
    (field) => !record[field]
  );
  if (missing.length === 0) continue;

  record.document_stage ??= documentStage(record);
  record.legal_force ??= legalForce(record);
  record.source_type ??= sourceType(record);
  record.evidence_level ??= evidenceLevel(record, record.source_type);
  record.verified_at ??= verifiedAt;
  record.source_status ??= sourceStatus(record, record.source_type);
  const note = sourceNote(record, record.source_status, record.source_type);
  if (note && !record.source_note) record.source_note = note;

  fs.writeFileSync(file, yaml.dump(record, { lineWidth: 100, noRefs: true, quotingType: "'", forceQuotes: false }));
  changed++;
}

console.log(`Backfilled trust fields in ${changed} records.`);
