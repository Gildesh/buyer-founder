import type { Metadata } from "next";
import Link from "next/link";
import { PainForkWizard } from "@/components/PainForkWizard";

export const metadata: Metadata = {
  title: "Try PainFork",
  description: "Excavate buyer pain, validate with evidence, export a wedge one-pager. Runs in your browser.",
};

export default function TryPage() {
  return (
    <div style={{ padding: "120px 24px 80px" }}>
      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        <p
          style={{
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "#e8a54b",
          }}
        >
          Live on this site
        </p>
        <h1 className="font-display" style={{ marginTop: 12, fontSize: "clamp(2rem, 5vw, 3.25rem)", color: "#f5f0e8" }}>
          PainFork
        </h1>
        <p style={{ marginTop: 16, maxWidth: 640, fontSize: 18, lineHeight: 1.65, color: "#8a8278" }}>
          Deterministic core — no API key. Session stays in this browser.{" "}
          <Link href="/samples/wedge" style={{ color: "#e8a54b" }}>
            See a finished one-pager
          </Link>
          .
        </p>
        <div style={{ marginTop: 40 }}>
          <PainForkWizard />
        </div>
      </div>
    </div>
  );
}
