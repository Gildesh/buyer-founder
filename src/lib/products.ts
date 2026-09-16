export type ProductCategory =
  | "pipeline"
  | "services"
  | "enterprise"
  | "collaboration"
  | "consumer";

export type ProductStatus = "live" | "beta" | "early-access";

export interface Product {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  category: ProductCategory;
  status: ProductStatus;
  features: string[];
  audience: string;
  pricing?: {
    model: string;
    tiers?: { name: string; price: string; details: string }[];
  };
  cta: { label: string; href: string };
  accent: string;
}

export const categoryLabels: Record<ProductCategory, string> = {
  pipeline: "Founder Pipeline",
  services: "Professional Services",
  enterprise: "Enterprise Tools",
  collaboration: "Collaboration & Research",
  consumer: "Consumer Apps",
};

export const categoryDescriptions: Record<ProductCategory, string> = {
  pipeline:
    "Discover buyer pain, incubate ideas, and validate before you ship or sell.",
  services:
    "Deliver named artifacts with decision logs — privacy-first, outcome-driven.",
  enterprise:
    "Hard problems in legacy systems, compliance, operations, and energy.",
  collaboration:
    "Plan together, research the frontier, and hand off cleanly to agents.",
  consumer:
    "Thoughtful apps for meaning, travel, and everyday life.",
};

export const products: Product[] = [
  {
    slug: "painfork",
    name: "PainFork",
    tagline: "Pain before paradigm.",
    description:
      "Excavate the pains that actually block your buyer, generate only the paradigm shifts that solve those, and export a pitchable wedge one-pager. Evidence-gated, deterministic core — no API key required.",
    category: "pipeline",
    status: "live",
    features: [
      "Validated pain libraries by vertical",
      "Pattern-bound paradigm shifts",
      "CLI + web wizard export flow",
      "Deterministic fork engine",
    ],
    audience: "Solo technical sellers, fractional engineers, legacy specialists",
    pricing: {
      model: "SaaS + CLI",
      tiers: [
        { name: "Core", price: "Free", details: "CLI + local wizard" },
        { name: "Pro", price: "$29/mo", details: "Cloud exports, team libraries" },
      ],
    },
    cta: { label: "Try PainFork", href: "/try" },
    accent: "#e8a54b",
  },
  {
    slug: "kiln",
    name: "Kiln",
    tagline: "One idea in the fire.",
    description:
      "Private foundry for idea genomes — score, quarantine, and incubate exactly one concept at a time. Constraint lab, kill wall, and geo-legal spike included.",
    category: "pipeline",
    status: "live",
    features: [
      "Combinatorial genome generation",
      "Strict one-active-idea gate",
      "Audit log and kill wall",
      "Browser-local privacy",
    ],
    audience: "Solo founders managing a large idea corpus",
    pricing: {
      model: "Free (self-hosted)",
      tiers: [{ name: "Foundry", price: "$0", details: "Vercel Hobby deploy" }],
    },
    cta: { label: "Join the waitlist", href: "/waitlist?product=kiln&source=product" },
    accent: "#d4622a",
  },
  {
    slug: "feasibility-validator",
    name: "Feasibility Validator",
    tagline: "Ship or sell — know before you launch.",
    description:
      "Upload your repo zip and get an eight-axis feasibility report: security, legal, deploy, sell, financial, technical, docs, and project memory. Browser-only — your source never leaves your machine.",
    category: "pipeline",
    status: "beta",
    features: [
      "8-axis rules-based scoring",
      "Zip upload or CLI scan JSON",
      "History in localStorage",
      "Zero server upload in v1",
    ],
    audience: "Indie hackers and solo builders pre-launch",
    pricing: {
      model: "SaaS",
      tiers: [
        { name: "Scan", price: "Free", details: "Unlimited local scans" },
        { name: "Pro", price: "$19/mo", details: "CI integration, team reports" },
      ],
    },
    cta: { label: "See a sample report", href: "/samples/feasibility" },
    accent: "#5eb88e",
  },
  {
    slug: "fullstack-assistant",
    name: "Fullstack Assistant",
    tagline: "Named artifacts. Decision logs.",
    description:
      "Privacy-first freelance desk for a single principal. Clients buy a bounded deliverable with a full decision trail. Stripe checkout, WIP lock, artifact upload — agents execute under your skills.",
    category: "services",
    status: "beta",
    features: [
      "Intake → payment → WIP lock flow",
      "Artifact delivery with audit trail",
      "Geo-legal report wedge",
      "Operator admin dashboard",
    ],
    audience: "Principal freelancers selling technical deliverables",
    pricing: {
      model: "Per engagement",
      tiers: [
        { name: "Engagement", price: "Custom", details: "Scoped artifact + decision log" },
      ],
    },
    cta: { label: "Book an engagement", href: "/contact?product=fullstack-assistant" },
    accent: "#6b8cff",
  },
  {
    slug: "clause-finder",
    name: "Clause Finder",
    tagline: "Binding clauses, before AI.",
    description:
      "Shrink property PDFs down to restriction sentences and a 'Can I…?' checklist — locally, before any LLM sees them. US HOA/CC&R and India 7/12 modes. Rust extraction + FastAPI UI.",
    category: "services",
    status: "beta",
    features: [
      "Rust PDF/text extraction",
      "US and India document modes",
      "Cited restriction checklist",
      "No cloud database required",
    ],
    audience: "Real estate buyers, flippers, India title researchers",
    pricing: {
      model: "Per report",
      tiers: [
        { name: "Self-serve", price: "$9/report", details: "Local processing" },
        { name: "Pro", price: "$49/mo", details: "Batch uploads, API access" },
      ],
    },
    cta: { label: "See a sample checklist", href: "/samples/clauses" },
    accent: "#c9a86c",
  },
  {
    slug: "visual-api-compiler",
    name: "Visual API Compiler",
    tagline: "Green screens to REST APIs.",
    description:
      "Turn legacy UI recordings into typed REST APIs. Record → VLM map → compile → visual regression gate → serve. Built for systems you can't rewrite — regional banks, utilities, logistics.",
    category: "enterprise",
    status: "early-access",
    features: [
      "Screen recording to API pipeline",
      "Visual regression gate",
      "Operator console",
      "Correction flywheel",
    ],
    audience: "Enterprise IT teams with legacy green-screen systems",
    pricing: {
      model: "Enterprise license",
      tiers: [{ name: "Pilot", price: "Custom", details: "One workflow, proof of value" }],
    },
    cta: { label: "Request pilot", href: "/contact?product=visual-api-compiler" },
    accent: "#8b7cf6",
  },
  {
    slug: "wire-fusion",
    name: "Wire Fusion",
    tagline: "LLVM for integrations.",
    description:
      "Compile and optimize API/agent integration glue. Fuse N+1 calls into fewer round trips. OpenAPI → Integration IR → optimizer → emitted adapter + cost report.",
    category: "enterprise",
    status: "early-access",
    features: [
      "OpenAPI to Integration IR",
      "Round-trip optimizer",
      "Adapter code generation",
      "Cost report per fusion",
    ],
    audience: "Integration engineers and agent builders",
    pricing: {
      model: "Dev tool license",
      tiers: [{ name: "Early access", price: "Contact", details: "Phase 1.5 fixtures" }],
    },
    cta: { label: "Join early access", href: "/contact?product=wire-fusion" },
    accent: "#4ecdc4",
  },
  {
    slug: "roster-solver",
    name: "Roster Solver",
    tagline: "Schedules, not guesses.",
    description:
      "Staff scheduling as OR-Tools constraint optimization — coverage, hours, rest rules, and infeasibility explanations. Deterministic math, no LLM dependency.",
    category: "enterprise",
    status: "beta",
    features: [
      "CP-SAT constraint model",
      "Coverage and rest rules",
      "Infeasibility explain",
      "Benchmark vs greedy baseline",
    ],
    audience: "Call-center ops managers, workforce planners",
    pricing: {
      model: "B2B SaaS",
      tiers: [
        { name: "Team", price: "$99/mo", details: "Up to 50 agents" },
        { name: "Enterprise", price: "Custom", details: "Unlimited + API" },
      ],
    },
    cta: { label: "Solve your roster", href: "/contact?product=roster-solver" },
    accent: "#f472b6",
  },
  {
    slug: "form-compiler",
    name: "Form Compiler",
    tagline: "Export only when every rule passes.",
    description:
      "AI drafts application forms; a strict checker blocks export until every rulebook requirement is met. Job applications, internships, campus placements — ATS-compliant packets.",
    category: "enterprise",
    status: "early-access",
    features: [
      "Rulebook-driven validation",
      "Structured error reports",
      "Compile-to-packet CLI",
      "Applicant profile model",
    ],
    audience: "Students, job seekers, placement cells",
    pricing: {
      model: "Freemium",
      tiers: [
        { name: "Free", price: "$0", details: "3 exports/month" },
        { name: "Pro", price: "$12/mo", details: "Unlimited exports" },
      ],
    },
    cta: { label: "Compile your packet", href: "/contact?product=form-compiler" },
    accent: "#a3e635",
  },
  {
    slug: "petrol-vision",
    name: "Petrol Vision",
    tagline: "CV meets ESG meets storage.",
    description:
      "Unified platform for on-site petrol computer vision, refinery flaring ESG validation, and storage tank inventory from SAR imagery. Three revenue tracks, one modular monolith.",
    category: "enterprise",
    status: "early-access",
    features: [
      "Pump/receipt YOLO + OCR",
      "Sentinel-3 flaring validation",
      "SAR tank fill estimation",
      "FastAPI upload UI",
    ],
    audience: "Fuel retail ops, ESG analysts, energy traders",
    pricing: {
      model: "Per track",
      tiers: [{ name: "Track license", price: "Custom", details: "CV, ESG, or storage" }],
    },
    cta: { label: "Explore tracks", href: "/contact?product=petrol-vision" },
    accent: "#fb923c",
  },
  {
    slug: "planroom",
    name: "Planroom",
    tagline: "Plans in the center. Comments on the side.",
    description:
      "Markdown collaboration that separates discussion and approvals from the main text. GitHub OAuth, Supabase-backed snapshots, Pulse analytics, and Ship agent-brief copy.",
    category: "collaboration",
    status: "live",
    features: [
      "Markdown plan editor",
      "Comments and approvals sidebar",
      "GitHub sign-in",
      "Agent brief export",
    ],
    audience: "Teams collaborating on plans with AI handoff",
    pricing: {
      model: "SaaS",
      tiers: [
        { name: "Free", price: "$0", details: "Personal plans" },
        { name: "Team", price: "$15/user/mo", details: "Shared workspaces" },
      ],
    },
    cta: {
      label: "Open Planroom",
      href: "https://planroom-seven.vercel.app",
    },
    accent: "#38bdf8",
  },
  {
    slug: "edge-searcher",
    name: "Edge Searcher",
    tagline: "What's new at the frontier.",
    description:
      "Aggregate cutting-edge tech from GitHub, Hacker News, arXiv, Hugging Face, and X. Find synergies between ideas, search papers, and generate build briefs with existence checks.",
    category: "collaboration",
    status: "beta",
    features: [
      "Multi-source latest search",
      "Synergy finder between topics",
      "Paper search and inspect",
      "MCP server for agents",
    ],
    audience: "Founders, researchers, AI agents",
    pricing: {
      model: "Research tool",
      tiers: [{ name: "Operator", price: "Free", details: "CLI + local MCP" }],
    },
    cta: { label: "Join the waitlist", href: "/waitlist?product=edge-searcher&source=product" },
    accent: "#818cf8",
  },
  {
    slug: "stillpoint",
    name: "Stillpoint",
    tagline: "Nothing lost. Only unindexed.",
    description:
      "An epistemically honest hope engine for grief, nostalgia, and mortality. Structured argument library with claims, parallel families, seasonal renderers, and a synthesis vault.",
    category: "consumer",
    status: "beta",
    features: [
      "Claims with confidence bands",
      "Six parallel argument families",
      "Atlas / Elf / Hobbit renderers",
      "Hearth workbench rituals",
    ],
    audience: "People navigating grief and existential questions",
    pricing: {
      model: "Freemium",
      tiers: [
        { name: "Atlas Free", price: "$0", details: "Browse claims and families" },
        { name: "Pro", price: "$8–15/mo", details: "Personal priors, PDF export" },
        { name: "Lifetime", price: "$49", details: "Offline, print-quality" },
      ],
    },
    cta: { label: "Join the waitlist", href: "/waitlist?product=stillpoint&source=product" },
    accent: "#c4b5fd",
  },
  {
    slug: "travel-companion",
    name: "Travel Companion",
    tagline: "Stop opening Chrome.",
    description:
      "Real-time leisure trip companion for India. Mood-based recommendations, trip mode, Google Places integration, weather, concierge routes, and itinerary planning.",
    category: "consumer",
    status: "early-access",
    features: [
      "Onboarding questionnaire",
      "Mood-based recommendations",
      "Live trip mode",
      "Weather and distance matrix",
    ],
    audience: "Indian leisure travelers",
    pricing: {
      model: "Freemium",
      tiers: [
        { name: "Free", price: "$0", details: "Basic trip planning" },
        { name: "Plus", price: "$5/mo", details: "Concierge and offline maps" },
      ],
    },
    cta: { label: "Join the waitlist", href: "/waitlist?product=travel-companion&source=product" },
    accent: "#34d399",
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: ProductCategory): Product[] {
  return products.filter((p) => p.category === category);
}
