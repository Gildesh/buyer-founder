import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CampaignViewTracker } from "@/components/CampaignViewTracker";
import { WaitlistForm } from "@/components/WaitlistForm";
import { getCampaign, listCampaignSlugs } from "@/lib/campaigns";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return listCampaignSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const campaign = getCampaign(slug);
  if (!campaign) return { title: "Campaign" };

  return {
    title: campaign.title,
    description: campaign.subhead,
    robots: { index: true, follow: true },
  };
}

export default async function CampaignPage({ params }: PageProps) {
  const { slug } = await params;
  const campaign = getCampaign(slug);
  if (!campaign) notFound();

  const showWaitlist = campaign.primaryCta.href.startsWith("/waitlist");

  return (
    <div style={{ padding: "64px 24px 80px" }}>
      <CampaignViewTracker slug={campaign.slug} product={campaign.product} />
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <p
          style={{
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "#e8a54b",
          }}
        >
          Campaign
        </p>
        <h1 className="font-display" style={{ marginTop: 12, fontSize: "clamp(2rem, 5vw, 3rem)", color: "#f5f0e8" }}>
          {campaign.headline}
        </h1>
        <p style={{ marginTop: 16, fontSize: 18, lineHeight: 1.65, color: "#8a8278" }}>{campaign.subhead}</p>

        <ul style={{ marginTop: 28, paddingLeft: 20, color: "#f5f0e8", lineHeight: 1.7 }}>
          {campaign.bullets.map((bullet) => (
            <li key={bullet} style={{ marginBottom: 8 }}>{bullet}</li>
          ))}
        </ul>

        <div style={{ marginTop: 32, display: "flex", flexWrap: "wrap", gap: 12 }}>
          <Link
            href={campaign.primaryCta.href}
            className="glow-ember"
            style={{
              display: "inline-flex",
              alignItems: "center",
              borderRadius: 999,
              background: "#e8a54b",
              color: "#0c0b0a",
              padding: "12px 22px",
              fontSize: 14,
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            {campaign.primaryCta.label}
          </Link>
          {campaign.secondaryCta ? (
            <Link
              href={campaign.secondaryCta.href}
              style={{
                display: "inline-flex",
                alignItems: "center",
                borderRadius: 999,
                border: "1px solid #2a2622",
                color: "#f5f0e8",
                padding: "12px 22px",
                fontSize: 14,
                textDecoration: "none",
              }}
            >
              {campaign.secondaryCta.label}
            </Link>
          ) : null}
        </div>

        {showWaitlist ? (
          <div style={{ marginTop: 48 }}>
            <WaitlistForm
              defaultProduct={campaign.product}
              source={campaign.source}
              compact
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}
