import fs from "node:fs";
import path from "node:path";
import yaml from "js-yaml";

const root = process.cwd();
const standardsDir = path.join(root, "standards");
const timeoutMs = Number(process.env.URL_CHECK_TIMEOUT_MS ?? 10000);
const limit = Number(process.env.URL_CHECK_LIMIT ?? 0);
const idFilter = process.env.URL_CHECK_IDS
  ? new Set(
      process.env.URL_CHECK_IDS.split(",")
        .map((id) => id.trim())
        .filter(Boolean)
    )
  : null;
const includeBlocked = process.env.URL_CHECK_INCLUDE_BLOCKED === "1";

const files = [];
function walk(dir) {
  for (const name of fs.readdirSync(dir)) {
    const file = path.join(dir, name);
    const stat = fs.statSync(file);
    if (stat.isDirectory()) walk(file);
    if (stat.isFile() && name.endsWith(".yaml")) files.push(file);
  }
}

async function check(url) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    let res = await fetch(url, {
      method: "HEAD",
      redirect: "follow",
      signal: controller.signal,
      headers: { "User-Agent": "AD-Standards-Tracker-LinkCheck/1.0" },
    });
    if (res.status === 405 || res.status === 403) {
      res = await fetch(url, {
        method: "GET",
        redirect: "follow",
        signal: controller.signal,
        headers: { "User-Agent": "AD-Standards-Tracker-LinkCheck/1.0" },
      });
    }
    return { ok: res.status < 400, status: res.status, finalUrl: res.url };
  } catch (err) {
    return { ok: false, status: "ERR", finalUrl: url, error: err.message };
  } finally {
    clearTimeout(timer);
  }
}

walk(standardsDir);
const records = files
  .sort()
  .map((file) => {
    const doc = yaml.load(fs.readFileSync(file, "utf8"));
    return {
      file: path.relative(root, file),
      id: doc.id,
      url: doc.url,
      sourceStatus: doc.source_status,
    };
  })
  .filter((r) => r.url)
  .filter((r) => !idFilter || idFilter.has(r.id))
  .slice(0, limit || undefined);

if (idFilter && records.length !== idFilter.size) {
  const found = new Set(records.map((record) => record.id));
  const missing = Array.from(idFilter).filter((id) => !found.has(id));
  if (missing.length) {
    console.error(`Missing requested IDs: ${missing.join(", ")}`);
    process.exit(1);
  }
}

const failures = [];
for (const record of records) {
  if (record.sourceStatus === "blocked" && !includeBlocked) {
    console.log(`SKIP blocked ${record.id} ${record.url}`);
    continue;
  }
  const result = await check(record.url);
  const mark = result.ok ? "OK" : "FAIL";
  console.log(`${mark} ${result.status} ${record.id} ${record.url}`);
  if (!result.ok) failures.push({ ...record, ...result });
}

if (failures.length) {
  console.error(`URL check completed with ${failures.length} failures out of ${records.length}.`);
  process.exitCode = 1;
} else {
  console.log(`URL check passed: ${records.length} URLs.`);
}
