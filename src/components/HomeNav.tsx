import Link from "next/link";
import { ProductSymbol } from "./ProductSymbol";
import { products } from "@/lib/products";

const sections = [
  {
    href: "/try",
    title: "Try PainFork",
    description: "Live wizard in this browser",
    accent: "#e8a54b",
  },
  {
    href: "/samples",
    title: "Sample artifacts",
    description: "Wedge, scan, checklist",
    accent: "#5eb88e",
  },
  {
    href: "/pipeline",
    title: "Founder Pipeline",
    description: "Discover → Incubate → Validate",
    accent: "#d4622a",
  },
  {
    href: "/waitlist",
    title: "Waitlist",
    description: "Email when the next tool is real",
    accent: "#c4b5fd",
  },
];

export function HomeNav() {
  const featured = products.filter((p) =>
    ["painfork", "kiln", "planroom", "stillpoint"].includes(p.slug),
  );

  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="font-display text-3xl text-paper">Explore</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {sections.map((section) => (
            <Link
              key={section.href}
              href={section.href}
              className="group rounded-2xl border border-border bg-surface-raised p-6 transition hover:border-ember/30"
            >
              <div
                className="mb-4 h-1 w-10 rounded-full"
                style={{ backgroundColor: section.accent }}
              />
              <h3 className="font-display text-xl text-paper group-hover:text-ember transition-colors">
                {section.title}
              </h3>
              <p className="mt-2 text-sm text-muted">{section.description}</p>
            </Link>
          ))}
        </div>

        <h2 className="mt-16 font-display text-3xl text-paper">Featured products</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((product) => (
            <Link
              key={product.slug}
              href={`/products/${product.slug}`}
              className="group flex flex-col items-center rounded-2xl border border-border bg-surface-raised p-6 text-center transition hover:border-ember/30"
            >
              <ProductSymbol slug={product.slug} accent={product.accent} size="md" />
              <h3 className="mt-4 font-display text-lg text-paper group-hover:text-ember transition-colors">
                {product.name}
              </h3>
              <p className="mt-1 text-xs" style={{ color: product.accent }}>
                {product.tagline}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
