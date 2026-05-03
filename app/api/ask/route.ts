import { buildSystemContext } from "@/lib/context";
import { getAllStandards } from "@/lib/data";
import type { StandardRecord } from "@/lib/types";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 20; // requests per window per IP
const WINDOW_MS = 60 * 60 * 1000; // 1 hour
const DEEPSEEK_API_URL =
  process.env.DEEPSEEK_API_URL ?? "https://api.deepseek.com/chat/completions";
const DEEPSEEK_MODEL = process.env.DEEPSEEK_MODEL ?? "deepseek-v4-pro";
const DEEPSEEK_REASONING_EFFORT =
  process.env.DEEPSEEK_REASONING_EFFORT ?? "max";

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }
  if (entry.count >= RATE_LIMIT) return false;
  entry.count++;
  return true;
}

let cachedContext: string | null = null;

interface Citation {
  id: string;
  title_en: string;
  title_cn?: string;
  url: string;
  status: StandardRecord["status"];
  legal_force?: StandardRecord["legal_force"];
  evidence_level?: StandardRecord["evidence_level"];
  source_status?: StandardRecord["source_status"];
}

interface DeepSeekChatResponse {
  choices?: Array<{
    finish_reason?: string;
    message?: {
      content?: string | null;
    };
  }>;
}

function toCitation(record: StandardRecord): Citation {
  return {
    id: record.id,
    title_en: record.title_en,
    title_cn: record.title_cn,
    url: record.url,
    status: record.status,
    legal_force: record.legal_force,
    evidence_level: record.evidence_level,
    source_status: record.source_status,
  };
}

function extractCitations(answer: string): Citation[] {
  const ids = Array.from(
    new Set(answer.match(/\b(?:STD|INT)-[A-Za-z0-9-]+-\d{4}-\d{3}\b/g) ?? [])
  );
  if (ids.length === 0) return [];

  const records = getAllStandards();
  const byId = new Map(records.map((record) => [record.id, record]));
  return ids
    .map((id) => byId.get(id))
    .filter((record): record is StandardRecord => Boolean(record))
    .map(toCitation);
}

function hasChinese(text: string): boolean {
  return /[\u3400-\u9fff]/.test(text);
}

function sanitizeAnswer(answer: string): string {
  return answer.replace(/\*\*/g, "");
}

function questionHints(question: string): {
  tokens: string[];
  wantsBinding: boolean;
  wantsBestPractice: boolean;
  wantsAssessment: boolean;
  wantsRegulation: boolean;
  wantsSotif: boolean;
  wantsTeleoperation: boolean;
  wantsScenario: boolean;
  wantsL2: boolean;
  wantsL4: boolean;
} {
  const lower = question.toLowerCase();
  return {
    tokens: Array.from(
      new Set(lower.match(/[a-z0-9]+|[\u3400-\u9fff]{2,}/g) ?? [])
    ).filter((token) => token.length > 1 && !["什么", "哪些", "如何", "有什么"].includes(token)),
    wantsBinding: /强制|法规|准入|binding|mandatory|regulation|type approval/.test(lower),
    wantsBestPractice: /最佳实践|best practice|guidance|safety case|安全案例/.test(lower),
    wantsAssessment: /测评|规程|ncap|assessment|rating/.test(lower),
    wantsRegulation: /法规|准入|regulation|type approval/.test(lower),
    wantsSotif: /sotif|21448|预期功能安全|安全案例|safety case/.test(lower),
    wantsTeleoperation: /远程|遥控|remote|teleoperation/.test(lower),
    wantsScenario: /场景|scenario|openscenario|opendrive|34502/.test(lower),
    wantsL2: /\bl2\b|level 2|组合驾驶辅助|辅助驾驶/.test(lower),
    wantsL4: /\bl4\b|level 4|无人驾驶|自动驾驶/.test(lower),
  };
}

function localFallback(question: string, errorMessage: string): {
  answer: string;
  citations: Citation[];
} {
  const records = getAllStandards();
  const hints = questionHints(question);

  const scored = records
    .map((record) => {
      const haystack = [
        record.id,
        record.org,
        record.org_full,
        record.title_en,
        record.title_cn,
        record.summary_en,
        record.summary_cn,
        record.impact_note,
        record.topics?.join(" "),
        record.automation_level?.join(" "),
        record.related_standards?.join(" "),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      const titleHaystack = [record.id, record.title_en, record.title_cn]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      let score = 0;
      for (const token of hints.tokens) {
        if (titleHaystack.includes(token)) score += token.length >= 4 ? 10 : 4;
        if (haystack.includes(token)) score += token.length >= 4 ? 2 : 1;
      }
      if (hints.wantsBinding && record.legal_force === "binding") score += 3;
      if (hints.wantsBestPractice && (record.legal_force === "best_practice" || record.legal_force === "guidance")) score += 3;
      if (hints.wantsAssessment && record.legal_force === "rating_protocol") score += 3;
      if (hints.wantsRegulation && record.type === "regulation") score += 2;
      if (hints.wantsSotif && record.topics?.includes("sotif")) score += 3;
      if (hints.wantsTeleoperation && record.topics?.includes("teleoperation")) score += 3;
      if (hints.wantsScenario && (record.topics?.includes("scenario_description") || record.topics?.includes("testing"))) score += 3;
      if (hints.wantsL2 && record.automation_level?.includes("L2")) score += 2;
      if (hints.wantsL4 && record.automation_level?.includes("L4")) score += 2;
      if (/iso\s*21448/.test(question.toLowerCase()) && record.title_en.toLowerCase().startsWith("iso 21448")) {
        score += 20;
      }
      if (/ieee\s*3321/.test(question.toLowerCase()) && record.title_en.toLowerCase().startsWith("ieee 3321")) {
        score += 20;
      }

      return { record, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);

  const citations = scored.map(({ record }) => toCitation(record));
  const zh = hasChinese(question);
  const providerNote = zh
    ? "DeepSeek 服务暂时不可用，下面先返回本地数据库检索结果。"
    : "DeepSeek is temporarily unavailable, so this response falls back to deterministic database search.";
  const cause = /balance|quota|insufficient|credit/i.test(errorMessage)
    ? zh
      ? "原因：DeepSeek API 余额或配额不足。"
      : "Reason: DeepSeek API balance or quota is insufficient."
    : errorMessage.includes("DEEPSEEK_API_KEY")
    ? zh
      ? "原因：DeepSeek API Key 未配置。"
      : "Reason: DEEPSEEK_API_KEY is not configured."
    : zh
      ? "原因：上游 AI 服务暂时失败。"
      : "Reason: upstream AI service failed.";

  if (citations.length === 0) {
    return {
      answer: zh
        ? `${providerNote}\n${cause}\n\n本地检索没有找到明确匹配记录。请换用标准号、组织名或主题词重试。`
        : `${providerNote}\n${cause}\n\nNo clear local database match was found. Try a standard number, organization, or topic keyword.`,
      citations,
    };
  }

  const lines = citations.map((citation) => {
    const title = zh && citation.title_cn ? citation.title_cn : citation.title_en;
    const legal = citation.legal_force ? `/${citation.legal_force}` : "";
    return `- ${citation.id}: ${title} (${citation.status}${legal}) ${citation.url}`;
  });

  return {
    answer: zh
      ? `${providerNote}\n${cause}\n\n可先查看这些最相关记录：\n${lines.join("\n")}\n\n依据记录：\n${lines.join("\n")}`
      : `${providerNote}\n${cause}\n\nMost relevant records:\n${lines.join("\n")}\n\nCited records:\n${lines.join("\n")}`,
    citations,
  };
}

export async function POST(request: NextRequest) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0] || "unknown";
  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: "Rate limit exceeded. Try again later." },
      { status: 429 }
    );
  }

  const body = await request.json();
  const question = body.question?.trim();
  if (!question || question.length > 500) {
    return NextResponse.json(
      { error: "Question is required (max 500 chars)" },
      { status: 400 }
    );
  }

  const apiKey = process.env.DEEPSEEK_API_KEY;
  if (!apiKey) {
    const fallback = localFallback(question, "DEEPSEEK_API_KEY not configured");
    return NextResponse.json({
      ...fallback,
      answer: sanitizeAnswer(fallback.answer),
      fallback: true,
    });
  }

  if (!cachedContext) {
    cachedContext = buildSystemContext();
  }

  try {
    const response = await fetch(DEEPSEEK_API_URL, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: DEEPSEEK_MODEL,
        max_tokens: 8000,
        reasoning_effort: DEEPSEEK_REASONING_EFFORT,
        thinking: {
          type: "enabled",
        },
        messages: [
          { role: "system", content: cachedContext },
          { role: "user", content: question },
        ],
      }),
    });

    const payloadText = await response.text();
    if (!response.ok) {
      throw new Error(`DeepSeek API error ${response.status}: ${payloadText.slice(0, 500)}`);
    }

    const payload = JSON.parse(payloadText) as DeepSeekChatResponse;
    const choice = payload.choices?.[0];
    const text = sanitizeAnswer(choice?.message?.content?.trim() ?? "");
    if (!text) {
      throw new Error("DeepSeek API returned an empty answer");
    }

    return NextResponse.json({ answer: text, citations: extractCitations(text) });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("DeepSeek API error:", message);
    const fallback = localFallback(question, message);
    return NextResponse.json({
      ...fallback,
      answer: sanitizeAnswer(fallback.answer),
      fallback: true,
    });
  }
}
