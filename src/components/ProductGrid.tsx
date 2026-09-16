import {
  products,
  categoryLabels,
  categoryDescriptions,
  type ProductCategory,
} from "@/lib/products";
import { ProductCard } from "./ProductCard";

const categoryOrder: ProductCategory[] = [
  "pipeline",
  "services",
  "enterprise",
  "collaboration",
  "consumer",
];

interface ProductGridProps {
  showHeader?: boolean;
}

export function ProductGrid({ showHeader = true }: ProductGridProps) {
  return (
    <section style={{ padding: "48px 0 80px" }}>
      <div style={{ maxWidth: 1152, margin: "0 auto", padding: "0 24px" }}>
        {showHeader && (
          <div style={{ maxWidth: 640, marginBottom: 48 }}>
            <h2 className="font-display" style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", color: "#f5f0e8" }}>
              The product suite
            </h2>
            <p style={{ marginTop: 12, fontSize: 17, lineHeight: 1.6, color: "#8a8278" }}>
              Fourteen tools across five categories — from evidence-gated wedge
              generation to enterprise legacy modernization.
            </p>
          </div>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: 64 }}>
          {categoryOrder.map((category) => {
            const items = products.filter((p) => p.category === category);
            if (items.length === 0) return null;

            return (
              <div key={category} id={category}>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "flex-end",
                    justifyContent: "space-between",
                    gap: 12,
                    marginBottom: 24,
                  }}
                >
                  <div>
                    <h3 className="font-display" style={{ fontSize: 24, color: "#f5f0e8" }}>
                      {categoryLabels[category]}
                    </h3>
                    <p style={{ marginTop: 4, fontSize: 14, color: "#8a8278" }}>
                      {categoryDescriptions[category]}
                    </p>
                  </div>
                  <span style={{ fontSize: 12, color: "#8a8278" }}>
                    {items.length} product{items.length !== 1 ? "s" : ""}
                  </span>
                </div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                    gap: 20,
                  }}
                >
                  {items.map((product) => (
                    <ProductCard key={product.slug} product={product} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
