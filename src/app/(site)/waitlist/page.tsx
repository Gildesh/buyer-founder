import type { Metadata } from "next";
import Link from "next/link";
import { WaitlistForm } from "@/components/WaitlistForm";

export const metadata: Metadata = {
  title: "Waitlist",
  description: "Get email when the next Buyer Founder tool is actually usable.",
};

interface PageProps {
  searchParams: Promise<{ product?: string; plan?: string; source?: string }>;
}

export default async function WaitlistPage({ searchParams }: PageProps) {
  const params = await searchParams;

  return (
    <div style={{ padding: "128px 24px 80px" }}>
      <div
        style={{
          maxWidth: 960,
          margin: "0 auto",
          display: "grid",
          gap: 48,
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          alignItems: "start",
        }}
      >
        <div>
          <p
            style={{
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#e8a54b",
            }}
          >
            Capture
          </p>
          <h1 className="font-display" style={{ marginTop: 12, fontSize: "clamp(2rem, 5vw, 3rem)", color: "#f5f0e8" }}>
            Join the waitlist
          </h1>
          <p style={{ marginTop: 16, fontSize: 18, lineHeight: 1.65, color: "#8a8278" }}>
            PainFork is live in this browser now. Everything else joins the list until it
            can ship a named artifact — not a catalog card.
          </p>
          <p style={{ marginTop: 24, fontSize: 15, lineHeight: 1.65, color: "#8a8278" }}>
            Prefer to excavate first?{" "}
            <Link href="/try" style={{ color: "#e8a54b" }}>
              Try PainFork
            </Link>
            . Need a scoped engagement?{" "}
            <Link href="/contact" style={{ color: "#e8a54b" }}>
              Contact
            </Link>
            .
          </p>
        </div>
        <WaitlistForm
          defaultProduct={params.product ?? ""}
          defaultPlan={params.plan ?? ""}
          source={params.source ?? "waitlist"}
        />
      </div>
    </div>
  );
}
