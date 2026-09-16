import Link from "next/link";

const bundles = [
  {
    name: "Founder Starter",
    price: "Free",
    period: "forever",
    description: "Everything you need to discover and validate your wedge.",
    features: [
      "PainFork CLI + local wizard",
      "Kiln foundry (browser-local)",
      "Feasibility Validator scans",
      "Edge Searcher CLI",
    ],
    cta: "Start free",
    href: "/try",
    highlighted: false,
  },
  {
    name: "Founder Pro",
    price: "$49",
    period: "/month",
    description: "Ship and sell with the full pipeline unlocked.",
    features: [
      "PainFork Pro exports + libraries",
      "Feasibility Validator CI integration",
      "Planroom team workspace",
      "Priority support",
      "Early access to new products",
    ],
    cta: "Get Pro",
    href: "/waitlist?plan=pro&source=pricing",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "Legacy modernization, ops optimization, and vertical tools.",
    features: [
      "Visual API Compiler pilot",
      "Roster Solver unlimited agents",
      "Petrol Vision track license",
      "Wire Fusion early access",
      "Dedicated onboarding",
    ],
    cta: "Talk to us",
    href: "/contact?plan=enterprise",
    highlighted: false,
  },
];

interface PricingProps {
  showHeader?: boolean;
}

export function Pricing({ showHeader = true }: PricingProps) {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        {showHeader && (
          <div className="max-w-2xl">
            <h2 className="font-display text-4xl tracking-tight md:text-5xl">
              Simple pricing
            </h2>
            <p className="mt-4 text-lg text-muted">
              Start with the free pipeline. Upgrade when you&apos;re ready to ship
              and sell. Enterprise for hard problems.
            </p>
          </div>
        )}

        <div className={`grid gap-6 lg:grid-cols-3 ${showHeader ? "mt-16" : ""}`}>
          {bundles.map((bundle) => (
            <div
              key={bundle.name}
              className={`relative flex flex-col rounded-2xl border p-8 ${
                bundle.highlighted
                  ? "border-ember/50 bg-surface-raised glow-ember"
                  : "border-border bg-surface-raised/50"
              }`}
            >
              {bundle.highlighted && (
                <span className="absolute -top-3 left-6 rounded-full bg-ember px-3 py-0.5 text-xs font-semibold text-ink">
                  Most popular
                </span>
              )}
              <h3 className="font-display text-2xl text-paper">{bundle.name}</h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="font-display text-4xl text-ember">{bundle.price}</span>
                {bundle.period && (
                  <span className="text-sm text-muted">{bundle.period}</span>
                )}
              </div>
              <p className="mt-3 text-sm text-muted">{bundle.description}</p>
              <ul className="mt-6 flex-1 space-y-3">
                {bundle.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-paper/80">
                    <svg
                      className="mt-0.5 h-4 w-4 shrink-0 text-ember"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <Link
                href={bundle.href}
                className={`mt-8 block rounded-full py-3 text-center text-sm font-semibold transition ${
                  bundle.highlighted
                    ? "bg-ember text-ink hover:bg-ember-dim"
                    : "border border-border text-paper hover:border-ember/40 hover:text-ember"
                }`}
              >
                {bundle.cta}
              </Link>
            </div>
          ))}
        </div>

        <p className="mt-10 text-center text-sm text-muted">
          Individual products have their own pricing.{" "}
          <Link href="/products" className="text-ember hover:underline">
            See product pages
          </Link>{" "}
          for details.
        </p>
      </div>
    </section>
  );
}
