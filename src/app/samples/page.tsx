import type { Metadata } from "next";
import Link from "next/link";
import { samples } from "@/lib/status";

export const metadata: Metadata = {
  title: "Samples",
  description: "Named artifacts you can read before you buy: wedge one-pager, feasibility report, restriction checklist.",
};

export default function SamplesPage() {
  return (
    <div style={{ padding: "120px 24px 80px" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#e8a54b" }}>
          Proof
        </p>
        <h1 className="font-display" style={{ marginTop: 12, fontSize: "clamp(2rem, 5vw, 3.25rem)", color: "#f5f0e8" }}>
          Sample artifacts
        </h1>
        <p style={{ marginTop: 16, fontSize: 18, lineHeight: 1.65, color: "#8a8278" }}>
          Read the outcome before a sales call. These are from shipped engines or shipped sample packets — not brochure copy.
        </p>
        <ul style={{ marginTop: 40, listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: 16 }}>
          {samples.map((sample) => (
            <li key={sample.slug}>
              <Link
                href={sample.href}
                style={{
                  display: "block",
                  border: "1px solid #2a2622",
                  borderRadius: 16,
                  background: "#1c1916",
                  padding: 24,
                }}
              >
                <p className="font-display" style={{ fontSize: 24, color: "#f5f0e8" }}>{sample.title}</p>
                <p style={{ marginTop: 8, fontSize: 14, color: "#8a8278" }}>{sample.note}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
