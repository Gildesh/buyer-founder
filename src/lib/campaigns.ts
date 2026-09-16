export type CampaignCta = {
  label: string;
  href: string;
};

export type Campaign = {
  slug: string;
  title: string;
  headline: string;
  subhead: string;
  product: string;
  source: string;
  bullets: string[];
  primaryCta: CampaignCta;
  secondaryCta?: CampaignCta;
};

export const campaigns: Record<string, Campaign> = {
  "painfork-anti-hype": {
    slug: "painfork-anti-hype",
    title: "Pain before paradigm",
    headline: "Stop pitching features. Name the buyer pain first.",
    subhead:
      "PainFork excavates evidence-backed pains and exports a wedge one-pager — in your browser, no signup theater.",
    product: "painfork",
    source: "campaign-painfork-anti-hype",
    bullets: [
      "Five-step wizard: context → excavate → validate → fork → export",
      "Example AS/400 legacy migration ships with the page",
      "Exports markdown you can send to a buyer, not a slide deck",
    ],
    primaryCta: { label: "Try PainFork free", href: "/try" },
    secondaryCta: { label: "See sample wedge", href: "/samples/wedge" },
  },
  "clause-finder-search": {
    slug: "clause-finder-search",
    title: "Find the clause that blocks the deal",
    headline: "HOA and municipal restrictions — surfaced as searchable clauses.",
    subhead:
      "Clause Finder is on the waitlist until search ships. Join for early access when we can return cited restrictions, not summaries.",
    product: "clause-finder",
    source: "campaign-clause-finder",
    bullets: [
      "Pain-first: restrictions that kill feasibility before you bid",
      "Sample artifact shows citation style, not mock legalese",
      "Built for technical founders scoping land and infill",
    ],
    primaryCta: { label: "Join Clause Finder waitlist", href: "/waitlist?product=clause-finder&source=campaign-clause-finder" },
    secondaryCta: { label: "Read sample clauses", href: "/samples/clauses" },
  },
};

export function getCampaign(slug: string): Campaign | undefined {
  return campaigns[slug];
}

export function listCampaignSlugs(): string[] {
  return Object.keys(campaigns);
}
