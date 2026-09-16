import Link from "next/link";
import { products } from "@/lib/products";
import { ProductSymbolBare } from "./ProductSymbol";

export function Footer() {
  const featured = products.filter((p) => p.status === "live").slice(0, 4);

  return (
    <footer style={{ borderTop: "1px solid #2a2622", background: "#141210" }}>
      <div style={{ maxWidth: 1152, margin: "0 auto", padding: "64px 24px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: 40,
          }}
        >
          <div style={{ gridColumn: "span 2" }}>
            <Link href="/" className="font-display" style={{ fontSize: 24, color: "#f5f0e8" }}>
              Buyer Founder
            </Link>
            <p style={{ marginTop: 16, maxWidth: 400, fontSize: 14, lineHeight: 1.65, color: "#8a8278" }}>
              Tools for technical founders who start with buyer pain, validate
              before they ship, and sell outcomes — not hours.
            </p>
          </div>

          <div>
            <h3 style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#8a8278" }}>
              Live now
            </h3>
            <ul style={{ marginTop: 16, listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: 12 }}>
              {featured.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/products/${p.slug}`}
                    style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, color: "rgba(245,240,232,0.8)" }}
                  >
                    <ProductSymbolBare slug={p.slug} accent={p.accent} size="sm" />
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#8a8278" }}>
              Explore
            </h3>
            <ul style={{ marginTop: 16, listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { href: "/try", label: "Try PainFork" },
                { href: "/waitlist", label: "Waitlist" },
                { href: "/samples", label: "Samples" },
                { href: "/pipeline", label: "Pipeline" },
                { href: "/products", label: "Products" },
                { href: "/about", label: "About" },
                { href: "/pricing", label: "Pricing" },
                { href: "/contact", label: "Contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} style={{ fontSize: 14, color: "rgba(245,240,232,0.8)" }}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          style={{
            marginTop: 48,
            paddingTop: 24,
            borderTop: "1px solid #2a2622",
            display: "flex",
            flexWrap: "wrap",
            gap: 12,
            justifyContent: "space-between",
            fontSize: 12,
            color: "#8a8278",
          }}
        >
          <p>© {new Date().getFullYear()} Buyer Founder. Built by a solo technical founder.</p>
          <p>Pain before paradigm. Ship with receipts.</p>
        </div>
      </div>
    </footer>
  );
}
