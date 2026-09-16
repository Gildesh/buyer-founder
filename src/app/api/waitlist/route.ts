import { NextResponse } from "next/server";
import { appendWaitlist } from "@/lib/waitlist-store";
import {
  isProductSlug,
  isWaitlistPlan,
  normalizeEmail,
} from "@/lib/waitlist";

const WINDOW_MS = 60 * 60 * 1000;
const MAX_PER_WINDOW = 8;
const hits = new Map<string, number[]>();

function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  return request.headers.get("x-real-ip") ?? "unknown";
}

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  return false;
}

export async function POST(request: Request) {
  if (rateLimited(clientIp(request))) {
    return NextResponse.json({ error: "Too many attempts. Try again later." }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  if (typeof body !== "object" || body === null) {
    return NextResponse.json({ error: "Invalid body." }, { status: 400 });
  }

  const record = body as Record<string, unknown>;

  if (typeof record.website === "string" && record.website.trim() !== "") {
    return NextResponse.json({ ok: true, status: "added" });
  }

  const email = typeof record.email === "string" ? normalizeEmail(record.email) : null;
  if (!email) {
    return NextResponse.json({ error: "A valid email is required." }, { status: 400 });
  }

  const product =
    typeof record.product === "string" && isProductSlug(record.product) ? record.product : "";
  const plan =
    typeof record.plan === "string" && isWaitlistPlan(record.plan) ? record.plan : "";
  const source =
    typeof record.source === "string" ? record.source.trim().slice(0, 80) : "waitlist";

  try {
    const status = await appendWaitlist({
      email,
      product,
      plan,
      source,
      createdAt: new Date().toISOString(),
    });
    return NextResponse.json({ ok: true, status });
  } catch (error) {
    const code = (error as NodeJS.ErrnoException).code;
    if (code === "EROFS" || code === "EPERM" || code === "EACCES") {
      return NextResponse.json(
        {
          error:
            "This deploy cannot persist the waitlist file. Run locally, or email hello@buyerfounder.com.",
        },
        { status: 503 },
      );
    }
    return NextResponse.json({ error: "Could not save signup." }, { status: 500 });
  }
}
