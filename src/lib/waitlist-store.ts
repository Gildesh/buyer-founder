import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { getSupabaseServer } from "@/lib/supabase-server";

export type WaitlistEntry = {
  email: string;
  product: string;
  plan: string;
  source: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  createdAt: string;
};

const FILE = path.join(process.cwd(), "data", "waitlist.jsonl");

async function appendWaitlistFile(entry: WaitlistEntry): Promise<"added" | "exists"> {
  await mkdir(path.dirname(FILE), { recursive: true });

  let existing = "";
  try {
    existing = await readFile(FILE, "utf8");
  } catch (error) {
    const code = (error as NodeJS.ErrnoException).code;
    if (code !== "ENOENT") throw error;
  }

  const already = existing
    .split("\n")
    .filter(Boolean)
    .some((line) => {
      try {
        const row = JSON.parse(line) as WaitlistEntry;
        return row.email === entry.email;
      } catch {
        return false;
      }
    });

  if (already) return "exists";

  await writeFile(FILE, `${existing}${JSON.stringify(entry)}\n`, "utf8");
  return "added";
}

async function appendWaitlistSupabase(entry: WaitlistEntry): Promise<"added" | "exists"> {
  const supabase = getSupabaseServer();
  if (!supabase) throw new Error("SUPABASE_NOT_CONFIGURED");

  const { error } = await supabase.from("waitlist_signups").insert({
    email: entry.email,
    product: entry.product || "general",
    plan: entry.plan || "waitlist",
    source: entry.source || "site",
    utm_source: entry.utmSource ?? null,
    utm_medium: entry.utmMedium ?? null,
    utm_campaign: entry.utmCampaign ?? null,
  });

  if (!error) return "added";

  if (error.code === "23505") return "exists";

  throw error;
}

export async function appendWaitlist(entry: WaitlistEntry): Promise<"added" | "exists"> {
  const supabase = getSupabaseServer();
  if (supabase) {
    return appendWaitlistSupabase(entry);
  }
  return appendWaitlistFile(entry);
}
