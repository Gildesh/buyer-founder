export const usableToday = [
  {
    name: "PainFork",
    href: "/try",
    note: "In-browser wizard on this site. Evidence-gated wedge export.",
  },
  {
    name: "Planroom",
    href: "https://planroom-seven.vercel.app",
    note: "Hosted markdown plans with comments on the side.",
    external: true,
  },
  {
    name: "Kiln",
    href: "/products/kiln",
    note: "Live as a self-hosted foundry. Ask for a deploy, or waitlist.",
  },
] as const;

export const samples = [
  {
    slug: "wedge",
    href: "/samples/wedge",
    product: "painfork",
    title: "Wedge one-pager",
    note: "PainFork export from the shipped AS/400 example.",
  },
  {
    slug: "feasibility",
    href: "/samples/feasibility",
    product: "feasibility-validator",
    title: "8-axis feasibility report",
    note: "Demo scan of fullstack-assistant. Verdict: fix-first.",
  },
  {
    slug: "clauses",
    href: "/samples/clauses",
    product: "clause-finder",
    title: "Restriction checklist",
    note: "Oak Hollow HOA sample. Checklist only — not legal advice.",
  },
] as const;

export function sampleForProduct(slug: string) {
  return samples.find((s) => s.product === slug);
}
