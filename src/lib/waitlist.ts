import { products } from "./products";

export const WAITLIST_PLANS = ["starter", "pro", "enterprise"] as const;
export type WaitlistPlan = (typeof WAITLIST_PLANS)[number];

const productSlugs = new Set(products.map((p) => p.slug));

export function isWaitlistPlan(value: string): value is WaitlistPlan {
  return (WAITLIST_PLANS as readonly string[]).includes(value);
}

export function isProductSlug(value: string): boolean {
  return productSlugs.has(value);
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function normalizeEmail(value: string): string | null {
  const email = value.trim().toLowerCase();
  if (email.length < 3 || email.length > 254) return null;
  if (!EMAIL_RE.test(email)) return null;
  return email;
}
