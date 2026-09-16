import Link from "next/link";
import type { Product } from "@/lib/products";
import { ProductSymbol } from "./ProductSymbol";

const statusLabel: Record<Product["status"], string> = {
  live: "Live",
  beta: "Beta",
  "early-access": "Early access",
};

const statusColor: Record<Product["status"], string> = {
  live: "#34d399",
  beta: "#fbbf24",
  "early-access": "#a78bfa",
};

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/products/${product.slug}`}
      style={{
        display: "flex",
        flexDirection: "column",
        padding: 24,
        borderRadius: 16,
        border: `1px solid color-mix(in srgb, ${product.accent} 20%, #2a2622)`,
        background: "#1c1916",
        transition: "border-color 0.2s, transform 0.2s",
        textDecoration: "none",
        color: "inherit",
      }}
      className="hover:-translate-y-0.5"
    >
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
        <ProductSymbol slug={product.slug} accent={product.accent} size="md" />
        <span
          style={{
            fontSize: 11,
            fontWeight: 600,
            padding: "3px 10px",
            borderRadius: 999,
            color: statusColor[product.status],
            background: `color-mix(in srgb, ${statusColor[product.status]} 12%, transparent)`,
            border: `1px solid color-mix(in srgb, ${statusColor[product.status]} 25%, transparent)`,
          }}
        >
          {statusLabel[product.status]}
        </span>
      </div>

      <h3 className="font-display" style={{ marginTop: 16, fontSize: 22, color: "#f5f0e8" }}>
        {product.name}
      </h3>
      <p style={{ marginTop: 4, fontSize: 13, fontWeight: 500, color: product.accent }}>
        {product.tagline}
      </p>
      <p
        style={{
          marginTop: 12,
          flex: 1,
          fontSize: 14,
          lineHeight: 1.6,
          color: "#8a8278",
          display: "-webkit-box",
          WebkitLineClamp: 3,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}
      >
        {product.description}
      </p>

      <div
        style={{
          marginTop: 20,
          paddingTop: 16,
          borderTop: "1px solid #2a2622",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontSize: 12,
        }}
      >
        <span style={{ color: "#8a8278" }}>{product.pricing?.model}</span>
        <span style={{ color: product.accent, fontWeight: 500 }}>View details →</span>
      </div>
    </Link>
  );
}
