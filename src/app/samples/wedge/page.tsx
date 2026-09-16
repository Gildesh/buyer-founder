import type { Metadata } from "next";
import Link from "next/link";
import { exportMarkdown } from "@painfork/core/browser";
import { buildExampleWedge } from "@/lib/example-wedge";
export const metadata: Metadata = {
  title: "Sample wedge one-pager",
  description: "PainFork export from the shipped AS/400 legacy-migration example.",
};

export default function SampleWedgePage() {
  const wedge = buildExampleWedge();
  const markdown = exportMarkdown(wedge);

  return (
    <article style={{ padding: "120px 24px 80px" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <Link href="/samples" style={{ fontSize: 14, color: "#8a8278" }}>
          ← All samples
        </Link>
        <p style={{ marginTop: 24, fontSize: 12, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#e8a54b" }}>
          PainFork sample
        </p>
        <h1 className="font-display" style={{ marginTop: 12, fontSize: "clamp(2rem, 4vw, 3rem)", color: "#f5f0e8" }}>
          Scoped engagement wedge
        </h1>
        <p style={{ marginTop: 16, fontSize: 16, lineHeight: 1.65, color: "#8a8278" }}>
          Generated from the shipped example <code>ex-as400-slow-modernize</code> — not a mock.
          Same engine as <Link href="/try" style={{ color: "#e8a54b" }}>Try PainFork</Link>.
        </p>
        <p style={{ marginTop: 20, fontSize: 17, lineHeight: 1.65, color: "#f5f0e8" }}>{wedge.pitch}</p>
        <pre
          style={{
            marginTop: 32,
            padding: 24,
            borderRadius: 12,
            border: "1px solid #2a2622",
            background: "#141210",
            fontSize: 13,
            lineHeight: 1.65,
            color: "#f5f0e8",
            whiteSpace: "pre-wrap",
          }}
        >
          {markdown}
        </pre>
      </div>
    </article>
  );
}
