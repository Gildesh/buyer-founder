import type { Metadata } from "next";
import Link from "next/link";
import { TrackSampleView } from "@/components/TrackSampleView";

export const metadata: Metadata = {
  title: "Sample feasibility report",
  description: "Eight-axis Feasibility Validator demo scan of fullstack-assistant. Verdict: fix-first.",
};

const axes = [
  { axis: "Security", score: 85, weight: "20%", summary: "1 high-severity item to address." },
  { axis: "Legal", score: 100, weight: "20%", summary: "No blockers on this axis." },
  { axis: "Deploy", score: 93, weight: "15%", summary: "No blockers on this axis." },
  { axis: "Sell", score: 95, weight: "15%", summary: "No blockers on this axis." },
  { axis: "Financial", score: 80, weight: "10%", summary: "No blockers on this axis." },
  { axis: "Technical", score: 100, weight: "10%", summary: "No blockers on this axis." },
  { axis: "Docs", score: 100, weight: "5%", summary: "No blockers on this axis." },
  { axis: "Cursor", score: 100, weight: "5%", summary: "No blockers on this axis." },
];

const findings = [
  {
    severity: "high",
    title: "No lockfile detected",
    detail: "Supply-chain reproducibility is weaker without a committed lockfile.",
    advice: "Commit package-lock.json (or pnpm/yarn lock) and enable dependency scanning.",
  },
  {
    severity: "medium",
    title: "12 API route file(s) detected",
    detail: "Server routes add function CPU and complexity on Vercel Hobby.",
    advice: "For personal Hobby deploys, prefer client-side spikes. Keep API routes for local-only or upgrade plan.",
  },
  {
    severity: "medium",
    title: "Payment SDK or provider detected",
    detail: "Stripe or similar payment integration increases PCI and policy obligations.",
    advice: "Add refund policy, ToS, and privacy policy before charging. Use hosted checkout where possible.",
  },
  {
    severity: "medium",
    title: "No ICP or buyer language in README",
    detail: "Who pays and for what outcome is unclear from README alone.",
    advice: "Name the buyer persona, wedge, and why they pay now — not just features.",
  },
];

export default function SampleFeasibilityPage() {
  return (
    <article style={{ padding: "120px 24px 80px" }}>
      <TrackSampleView sample="feasibility" />
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <Link href="/samples" style={{ fontSize: 14, color: "#8a8278" }}>
          ← All samples
        </Link>
        <p style={{ marginTop: 24, fontSize: 12, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#5eb88e" }}>
          Feasibility Validator sample
        </p>
        <h1 className="font-display" style={{ marginTop: 12, fontSize: "clamp(2rem, 4vw, 3rem)", color: "#f5f0e8" }}>
          Ship/sell report
        </h1>
        <p style={{ marginTop: 16, fontSize: 16, lineHeight: 1.65, color: "#8a8278" }}>
          Excerpt of the demo scan of <strong style={{ color: "#f5f0e8" }}>fullstack-assistant</strong>{" "}
          (scanned 2026-09-14). Operator score 93 · composite overall 73 · verdict{" "}
          <strong style={{ color: "#e8a54b" }}>fix-first</strong>. Not a live zip upload on this
          marketing site — the engine lives in the Feasibility Validator app.
        </p>

        <div style={{ marginTop: 32, display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))" }}>
          {axes.map((axis) => (
            <div key={axis.axis} style={{ border: "1px solid #2a2622", borderRadius: 12, background: "#1c1916", padding: 16 }}>
              <p className="font-display" style={{ fontSize: 28, color: "#5eb88e" }}>{axis.score}</p>
              <p style={{ marginTop: 4, fontWeight: 500, color: "#f5f0e8" }}>{axis.axis}</p>
              <p style={{ marginTop: 4, fontSize: 12, color: "#8a8278" }}>{axis.weight} · {axis.summary}</p>
            </div>
          ))}
        </div>

        <h2 className="font-display" style={{ marginTop: 40, fontSize: 24, color: "#f5f0e8" }}>
          Findings
        </h2>
        <ul style={{ marginTop: 16, listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: 12 }}>
          {findings.map((finding) => (
            <li key={finding.title} style={{ border: "1px solid #2a2622", borderRadius: 12, background: "#1c1916", padding: 16 }}>
              <p style={{ fontSize: 12, color: finding.severity === "high" ? "#f0a0a0" : "#e8a54b" }}>
                {finding.severity}
              </p>
              <p style={{ marginTop: 4, fontWeight: 500, color: "#f5f0e8" }}>{finding.title}</p>
              <p style={{ marginTop: 6, fontSize: 14, color: "#8a8278" }}>{finding.detail}</p>
              <p style={{ marginTop: 6, fontSize: 14, color: "#f5f0e8" }}>{finding.advice}</p>
            </li>
          ))}
        </ul>

        <p style={{ marginTop: 32, fontSize: 13, color: "#8a8278" }}>
          Source: Feasibility Validator demo report{" "}
          <code>fullstack-assistant-report.json</code>.{" "}
          <Link href="/waitlist?product=feasibility-validator&source=sample" style={{ color: "#e8a54b" }}>
            Waitlist for CI scans
          </Link>
          .
        </p>
      </div>
    </article>
  );
}
