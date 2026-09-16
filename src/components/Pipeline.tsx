import Link from "next/link";
import { ProductSymbol } from "./ProductSymbol";

const stages = [
  {
    step: "01",
    slug: "painfork",
    name: "PainFork",
    verb: "Excavate",
    description:
      "Find the pains that actually block your buyer. Validate with evidence. Generate only paradigm shifts that solve those pains.",
    href: "/products/painfork",
    color: "#e8a54b",
  },
  {
    step: "02",
    slug: "kiln",
    name: "Kiln",
    verb: "Incubate",
    description:
      "Score idea genomes, quarantine bad patterns, and keep exactly one concept in the fire. Constraint lab, kill wall, audit log.",
    href: "/products/kiln",
    color: "#d4622a",
  },
  {
    step: "03",
    slug: "feasibility-validator",
    name: "Feasibility Validator",
    verb: "Validate",
    description:
      "Upload your repo. Get an eight-axis ship/sell report — security, legal, deploy, sell, financial, technical, docs, memory.",
    href: "/products/feasibility-validator",
    color: "#5eb88e",
  },
];

interface PipelineProps {
  showHeader?: boolean;
}

export function Pipeline({ showHeader = true }: PipelineProps) {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        {showHeader && (
          <div className="max-w-2xl">
            <h2 className="font-display text-4xl tracking-tight md:text-5xl">
              The founder pipeline
            </h2>
            <p className="mt-4 text-lg text-muted">
              Three tools that turn &ldquo;I have an idea&rdquo; into &ldquo;I have
              a wedge, receipts, and a ship plan.&rdquo;
            </p>
          </div>
        )}

        <div className={`grid gap-6 lg:grid-cols-3 ${showHeader ? "mt-16" : ""}`}>
          {stages.map((stage, i) => (
            <Link
              key={stage.name}
              href={stage.href}
              className="group relative rounded-2xl border border-border bg-surface-raised p-8 transition hover:border-ember/30"
            >
              {i < stages.length - 1 && (
                <span
                  className="absolute -right-3 top-1/2 hidden h-0.5 w-6 bg-border lg:block"
                  aria-hidden
                />
              )}
              <ProductSymbol slug={stage.slug} accent={stage.color} size="lg" className="mb-6" />
              <div className="flex items-center gap-3">
                <span
                  className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold"
                  style={{
                    backgroundColor: `${stage.color}22`,
                    color: stage.color,
                  }}
                >
                  {stage.step}
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted">
                    {stage.verb}
                  </p>
                  <p className="font-display text-xl text-paper group-hover:text-ember transition-colors">
                    {stage.name}
                  </p>
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted">
                {stage.description}
              </p>
              <span className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-ember opacity-0 transition group-hover:opacity-100">
                Learn more
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 8h8M8 4l4 4-4 4" />
                </svg>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
