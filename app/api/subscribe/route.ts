import { NextRequest, NextResponse } from "next/server";

// TODO (productize): replace metadata-only logging with Vercel KV / Upstash Redis
// or a newsletter provider. Do not log full email addresses in runtime logs.

function maskEmail(email: string): string {
  const [name, domain] = email.split("@");
  if (!name || !domain) return "invalid";
  return `${name.slice(0, 2)}***@${domain}`;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const email = body.email?.trim()?.toLowerCase();
    const role = body.role?.trim() || "unspecified"; // OEM, supplier, regulator, etc.
    const interests = Array.isArray(body.interests) ? body.interests : [];

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Valid email required" }, { status: 400 });
    }

    console.log(
      `[AD_STANDARDS_SUBSCRIBE] ${maskEmail(email)} | role=${role} | interests=${interests.join(",")} | ${new Date().toISOString()}`
    );

    return NextResponse.json({
      ok: true,
      message: "Subscribed. You'll receive the monthly report on the 1st of each month.",
    });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
