export type PainPage = {
  slug: string;
  title: string;
  description: string;
  problem: string;
  stakes: string[];
  approach: string;
  product: string;
  source: string;
};

export const painPages: Record<string, PainPage> = {
  "hoa-restrictions": {
    slug: "hoa-restrictions",
    title: "HOA restrictions that kill feasibility",
    description:
      "How technical founders surface HOA and municipal clauses before they commit to a lot or a bid.",
    problem:
      "You find a wedge lot or infill site. The broker says “should be fine.” The HOA CC&Rs are 200 pages. The deal dies in week three when a setback or rental cap shows up — after you've spent on surveys and soft costs.",
    stakes: [
      "Soft costs burn before the restriction is found",
      "Generic AI summaries miss the clause that blocks the product",
      "Buyers want cited language, not vibes",
    ],
    approach:
      "Start with the pain: which restriction classes actually kill your product on this parcel? Clause Finder (waitlist) targets searchable, cited HOA and municipal language. Until it ships, use the sample clauses artifact and PainFork to name the buyer pain in a wedge.",
    product: "clause-finder",
    source: "pain-hoa-restrictions",
  },
  "legacy-modernization-wedge": {
    slug: "legacy-modernization-wedge",
    title: "Legacy modernization wedge",
    description:
      "Turn slow legacy pain into a scoped engagement one-pager — the PainFork AS/400 example.",
    problem:
      "Enterprise buyers nod along to “cloud migration” decks. The real pain is operational: batch windows, twin maintenance, talent risk. Without naming it, you sell a paradigm shift nobody budgeted for.",
    stakes: [
      "RFPs reward buzzwords, not buyer pain",
      "Consulting scopes balloon without a named wedge",
      "Founders need an artifact, not another landing page",
    ],
    approach:
      "PainFork's shipped example walks AS/400 slow-modernize from context through export. Try it in-browser, download wedge.md, or read the static sample.",
    product: "painfork",
    source: "pain-legacy-wedge",
  },
};

export function getPainPage(slug: string): PainPage | undefined {
  return painPages[slug];
}

export function listPainPageSlugs(): string[] {
  return Object.keys(painPages);
}
