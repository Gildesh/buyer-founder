import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  products,
  getProduct,
  categoryLabels,
} from "@/lib/products";
import { ProductSymbol } from "@/components/ProductSymbol";
import { sampleForProduct } from "@/lib/status";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Product not found" };
  return {
    title: product.name,
    description: product.description,
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const isExternal = product.cta.href.startsWith("http");
  const sample = sampleForProduct(product.slug);
  const related = products
    .filter((p) => p.category === product.category && p.slug !== product.slug)
    .slice(0, 2);

  return (
    <article className="pt-28 pb-20">
      <div className="mx-auto max-w-4xl px-6">
        <Link
          href="/products"
          className="inline-flex items-center gap-1 text-sm text-muted hover:text-ember transition-colors"
        >
          ← All products
        </Link>

        <div style={{ marginTop: 32 }}>
          <ProductSymbol slug={product.slug} accent={product.accent} size="xl" />
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted">
            {categoryLabels[product.category]}
          </span>
          <span
            className="rounded-full px-2.5 py-0.5 text-xs font-medium ring-1"
            style={{
              backgroundColor: `${product.accent}15`,
              color: product.accent,
              borderColor: `${product.accent}40`,
            }}
          >
            {product.status === "live"
              ? "Live"
              : product.status === "beta"
                ? "Beta"
                : "Early access"}
          </span>
        </div>

        <h1 className="mt-4 font-display text-5xl tracking-tight md:text-6xl">
          {product.name}
        </h1>
        <p className="mt-2 text-xl font-medium" style={{ color: product.accent }}>
          {product.tagline}
        </p>
        <p className="mt-6 text-lg leading-relaxed text-muted">
          {product.description}
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          {isExternal ? (
            <a
              href={product.cta.href}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-ember px-8 py-3.5 text-sm font-semibold text-ink transition hover:bg-ember-dim"
            >
              {product.cta.label}
            </a>
          ) : (
            <Link
              href={product.cta.href}
              className="rounded-full bg-ember px-8 py-3.5 text-sm font-semibold text-ink transition hover:bg-ember-dim"
            >
              {product.cta.label}
            </Link>
          )}
          <Link
            href={sample ? sample.href : `/waitlist?product=${product.slug}&source=product`}
            className="rounded-full border border-border px-8 py-3.5 text-sm font-medium text-paper transition hover:border-ember/40"
          >
            {sample ? "Read sample artifact" : "Join waitlist"}
          </Link>
        </div>

        <div className="mt-16 grid gap-12 md:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl text-paper">Features</h2>
            <ul className="mt-4 space-y-3">
              {product.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-2 text-sm text-paper/80"
                >
                  <svg
                    className="mt-0.5 h-4 w-4 shrink-0"
                    style={{ color: product.accent }}
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
          </div>

          <div>
            <h2 className="font-display text-2xl text-paper">Who it&apos;s for</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              {product.audience}
            </p>

            {product.pricing && (
              <div className="mt-8">
                <h3 className="font-display text-xl text-paper">Pricing</h3>
                <p className="mt-2 text-sm text-muted">{product.pricing.model}</p>
                {product.pricing.tiers && (
                  <div className="mt-4 space-y-3">
                    {product.pricing.tiers.map((tier) => (
                      <div
                        key={tier.name}
                        className="rounded-xl border border-border bg-surface-raised p-4"
                      >
                        <div className="flex items-baseline justify-between">
                          <span className="font-medium text-paper">{tier.name}</span>
                          <span
                            className="font-display text-lg"
                            style={{ color: product.accent }}
                          >
                            {tier.price}
                          </span>
                        </div>
                        <p className="mt-1 text-xs text-muted">{tier.details}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {related.length > 0 && (
          <div className="mt-20 border-t border-border pt-12">
            <h2 className="font-display text-2xl text-paper">Related products</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {related.map((p) => (
                <Link
                  key={p.slug}
                  href={`/products/${p.slug}`}
                  className="flex items-center gap-4 rounded-xl border border-border bg-surface-raised p-5 transition hover:border-ember/30"
                >
                  <ProductSymbol slug={p.slug} accent={p.accent} size="sm" />
                  <div>
                    <p className="font-display text-lg text-paper">{p.name}</p>
                    <p className="mt-1 text-sm" style={{ color: p.accent }}>
                      {p.tagline}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
