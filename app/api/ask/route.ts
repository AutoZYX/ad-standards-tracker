import Anthropic from "@anthropic-ai/sdk";
import { buildSystemContext } from "@/lib/context";
import { getAllStandards } from "@/lib/data";
import type { StandardRecord } from "@/lib/types";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 20; // requests per window per IP
const WINDOW_MS = 60 * 60 * 1000; // 1 hour

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
    .map((record) => ({
      id: record.id,
      title_en: record.title_en,
      title_cn: record.title_cn,
      url: record.url,
      status: record.status,
      legal_force: record.legal_force,
      evidence_level: record.evidence_level,
      source_status: record.source_status,
    }));
}

export async function POST(request: NextRequest) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "ANTHROPIC_API_KEY not configured" },
      { status: 500 }
    );
  }

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

  if (!cachedContext) {
    cachedContext = buildSystemContext();
  }

  const client = new Anthropic({ apiKey });

  try {
    const message = await client.messages.create({
      model: "claude-sonnet-4-5-20250929",
      max_tokens: 1500,
      system: cachedContext,
      messages: [{ role: "user", content: question }],
    });

    const text =
      message.content[0].type === "text" ? message.content[0].text : "";
    return NextResponse.json({ answer: text, citations: extractCitations(text) });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("Claude API error:", message);
    return NextResponse.json(
      { error: "AI service error. Please try again later." },
      { status: 500 }
    );
  }
}
