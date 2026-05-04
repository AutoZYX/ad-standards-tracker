import fs from "node:fs";
import path from "node:path";
import yaml from "js-yaml";

const root = process.cwd();
const standardsDir = path.join(root, "standards");

const enums = {
  jurisdiction: [
    "international",
    "industry_org",
    "china",
    "us",
    "eu",
    "uk",
    "japan",
    "korea",
    "singapore",
    "germany",
  ],
  type: [
    "regulation",
    "standard",
    "consultation",
    "meeting_notice",
    "recall",
    "white_paper",
    "policy",
    "research",
    "interpretation",
  ],
  status: [
    "draft",
    "consultation",
    "published",
    "revised",
    "withdrawn",
    "pending",
    "in_force",
  ],
  legal_force: [
    "binding",
    "voluntary",
    "rating_protocol",
    "guidance",
    "best_practice",
    "informational",
  ],
  source_type: [
    "official",
    "official_news",
    "official_catalog",
    "standards_store",
    "secondary",
    "interpretation",
  ],
  evidence_level: ["A", "B", "C", "D"],
  source_status: ["verified", "paywalled", "blocked", "broken", "unverified"],
};

const required = ["id", "date", "org", "jurisdiction", "type", "status", "title_en", "url"];
const isoDate = /^\d{4}-\d{2}-\d{2}$/;
const idFormat = /^(STD|INT)-[A-Za-z0-9-]+-\d{4}-\d{3}$/;
const urlFormat = /^https?:\/\//;
const stringArrayFields = [
  "scope_en",
  "scope_cn",
  "exclusions_en",
  "exclusions_cn",
  "engineering_use_en",
  "engineering_use_cn",
];
const stringFields = ["expert_note_en", "expert_note_cn"];
const genericSourceUrls = [
  /^https?:\/\/www\.miit\.gov\.cn\/?$/,
  /^https?:\/\/www\.mot\.gov\.cn\/?$/,
  /^https?:\/\/www\.catarc\.org\.cn\/?$/,
  /^https?:\/\/www\.caeri\.com\.cn\/?$/,
  /^https?:\/\/www\.i-vista\.org\/?$/,
  /^https?:\/\/www\.mlit\.go\.jp\/en\/?$/,
  /^https?:\/\/www\.molit\.go\.kr\/english\/?$/,
  /^https?:\/\/transport\.ec\.europa\.eu\/?$/,
  /^https?:\/\/www\.gov\.uk\/government\/consultations\/?$/,
  /^https?:\/\/openstd\.samr\.gov\.cn\/bzgk\/gb\/?$/,
  /^https?:\/\/www\.federalregister\.gov\/agencies\/national-highway-traffic-safety-administration\/?$/,
  /^https?:\/\/www\.dmv\.ca\.gov\/portal\/vehicle-industry-services\/autonomous-vehicles\/?$/,
];

const files = [];
function walk(dir) {
  for (const name of fs.readdirSync(dir)) {
    const file = path.join(dir, name);
    const stat = fs.statSync(file);
    if (stat.isDirectory()) walk(file);
    if (stat.isFile() && name.endsWith(".yaml")) files.push(file);
  }
}

function fail(message) {
  errors.push(message);
}

function warn(message) {
  warnings.push(message);
}

const errors = [];
const warnings = [];
const ids = new Map();
walk(standardsDir);

for (const file of files.sort()) {
  const rel = path.relative(root, file);
  let doc;
  try {
    doc = yaml.load(fs.readFileSync(file, "utf8"));
  } catch (err) {
    fail(`${rel}: YAML parse failed: ${err.message}`);
    continue;
  }

  if (!doc || typeof doc !== "object" || Array.isArray(doc)) {
    fail(`${rel}: record must be a YAML object`);
    continue;
  }

  for (const key of required) {
    if (!doc[key]) fail(`${rel}: missing required field "${key}"`);
  }

  if (doc.id && !idFormat.test(doc.id)) fail(`${rel}: invalid id "${doc.id}"`);
  if (doc.id) {
    const prior = ids.get(doc.id);
    if (prior) fail(`${rel}: duplicate id "${doc.id}" also used by ${prior}`);
    ids.set(doc.id, rel);
  }

  for (const [field, allowed] of Object.entries(enums)) {
    if (doc[field] && !allowed.includes(doc[field])) {
      fail(`${rel}: invalid ${field} "${doc[field]}"`);
    }
  }

  if (doc.date && !isoDate.test(doc.date)) fail(`${rel}: date must be YYYY-MM-DD`);
  if (doc.effective_date && !isoDate.test(doc.effective_date)) {
    fail(`${rel}: effective_date must be YYYY-MM-DD`);
  }
  if (doc.verified_at && !isoDate.test(doc.verified_at)) {
    fail(`${rel}: verified_at must be YYYY-MM-DD`);
  }
  if (doc.url && !urlFormat.test(doc.url)) fail(`${rel}: url must start with http:// or https://`);
  for (const field of stringArrayFields) {
    if (
      doc[field] !== undefined &&
      (!Array.isArray(doc[field]) || doc[field].some((item) => typeof item !== "string"))
    ) {
      fail(`${rel}: ${field} must be an array of strings`);
    }
  }
  for (const field of stringFields) {
    if (doc[field] !== undefined && typeof doc[field] !== "string") {
      fail(`${rel}: ${field} must be a string`);
    }
  }
  if (
    doc.url &&
    ["A", "B"].includes(doc.evidence_level) &&
    genericSourceUrls.some((pattern) => pattern.test(doc.url))
  ) {
    fail(`${rel}: evidence_level ${doc.evidence_level} cannot use generic source URL "${doc.url}"`);
  }
  if (
    doc.title_en?.startsWith("GB ") &&
    !doc.title_en.startsWith("GB/T ") &&
    doc.legal_force === "voluntary"
  ) {
    fail(`${rel}: mandatory GB standard must not use legal_force=voluntary`);
  }
  if (
    doc.title_cn?.startsWith("GB ") &&
    !doc.title_cn.startsWith("GB/T ") &&
    doc.legal_force === "voluntary"
  ) {
    fail(`${rel}: mandatory GB standard must not use legal_force=voluntary`);
  }

  const parts = rel.split(path.sep);
  const jurisdictionDir = parts[1];
  const yearDir = parts[2];
  if (doc.jurisdiction && jurisdictionDir !== doc.jurisdiction) {
    fail(`${rel}: path jurisdiction "${jurisdictionDir}" does not match "${doc.jurisdiction}"`);
  }
  if (doc.date && yearDir !== doc.date.slice(0, 4)) {
    fail(`${rel}: path year "${yearDir}" does not match date "${doc.date}"`);
  }

  if (!doc.legal_force) warn(`${rel}: missing legal_force`);
  if (!doc.source_type) warn(`${rel}: missing source_type`);
  if (!doc.evidence_level) warn(`${rel}: missing evidence_level`);
  if (!doc.verified_at) warn(`${rel}: missing verified_at`);
  if (!doc.source_status) warn(`${rel}: missing source_status`);

  if ((doc.status === "draft" || doc.status === "consultation") && doc.legal_force === "binding") {
    fail(`${rel}: draft/consultation record must not use legal_force=binding`);
  }
  if (doc.evidence_level === "A" && doc.source_type === "secondary") {
    fail(`${rel}: evidence_level=A requires an official source, not secondary`);
  }
}

const evidenceMapFile = path.join(root, "lib", "evidence-map.ts");
if (fs.existsSync(evidenceMapFile)) {
  const evidenceMapSource = fs.readFileSync(evidenceMapFile, "utf8");
  const referencedIds = Array.from(
    new Set(
      [...evidenceMapSource.matchAll(/"((?:STD|INT)-[A-Za-z0-9-]+-\d{4}-\d{3})"/g)].map(
        (match) => match[1]
      )
    )
  );
  for (const id of referencedIds) {
    if (!ids.has(id)) {
      fail(`lib/evidence-map.ts: missing record_id "${id}"`);
    }
  }
}

if (warnings.length) {
  console.warn(`Data quality warnings (${warnings.length}):`);
  const grouped = warnings.reduce((acc, message) => {
    const reason = message.split(": ").at(-1) ?? "unknown";
    acc[reason] = (acc[reason] ?? 0) + 1;
    return acc;
  }, {});
  for (const [reason, count] of Object.entries(grouped).sort(([, a], [, b]) => b - a)) {
    console.warn(`- ${reason}: ${count}`);
  }
  console.warn("Run a focused review on older records to clear these gradual trust-field warnings.");
}

if (errors.length) {
  console.error(`Data validation failed (${errors.length}):`);
  for (const message of errors) console.error(`- ${message}`);
  process.exit(1);
}

console.log(`Data validation passed: ${files.length} records, ${ids.size} unique ids.`);
