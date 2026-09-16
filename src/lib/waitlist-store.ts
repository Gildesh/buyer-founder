import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

export type WaitlistEntry = {
  email: string;
  product: string;
  plan: string;
  source: string;
  createdAt: string;
};

const FILE = path.join(process.cwd(), "data", "waitlist.jsonl");

export async function appendWaitlist(entry: WaitlistEntry): Promise<"added" | "exists"> {
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
