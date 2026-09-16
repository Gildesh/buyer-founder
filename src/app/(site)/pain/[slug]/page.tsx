import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPainPage, listPainPageSlugs } from "@/lib/pain-pages";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return listPainPageSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getPainPage(slug);
  if (!page) return { title: "Pain" };

  return {
    title: page.title,
    description: page.description,
  };
}

export default async function PainPage({ params }: PageProps) {
  const { slug } = await params;
  const page = getPainPage(slug);
  if (!page) notFound();

  const tryHref = page.product === "painfork" ? "/try" : `/waitlist?product=${page.product}&source=${page.source}`;

  return (
    <article style={{ padding: "128px 24px 80px" }}>
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
          Buyer pain
        </p>
        <h1 className="font-display" style={{ marginTop: 12, fontSize: "clamp(2rem, 5vw, 3rem)", color: "#f5f0e8" }}>
          {page.title}
        </h1>
        <p style={{ marginTop: 20, fontSize: 18, lineHeight: 1.7, color: "#f5f0e8" }}>{page.problem}</p>

        <h2 className="font-display" style={{ marginTop: 36, fontSize: 24, color: "#f5f0e8" }}>What is at stake</h2>
        <ul style={{ marginTop: 16, paddingLeft: 20, lineHeight: 1.7, color: "#8a8278" }}>
          {page.stakes.map((stake) => (
            <li key={stake} style={{ marginBottom: 8 }}>{stake}</li>
          ))}
        </ul>

        <h2 className="font-display" style={{ marginTop: 36, fontSize: 24, color: "#f5f0e8" }}>How we approach it</h2>
        <p style={{ marginTop: 16, fontSize: 16, lineHeight: 1.7, color: "#8a8278" }}>{page.approach}</p>

        <div style={{ marginTop: 40, display: "flex", flexWrap: "wrap", gap: 12 }}>
          <Link
            href={tryHref}
            className="glow-ember"
            style={{
              borderRadius: 999,
              background: "#e8a54b",
              color: "#0c0b0a",
              padding: "12px 22px",
              fontSize: 14,
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            {page.product === "painfork" ? "Try PainFork" : "Join waitlist"}
          </Link>
          <Link
            href="/samples"
            style={{
              borderRadius: 999,
              border: "1px solid #2a2622",
              color: "#f5f0e8",
              padding: "12px 22px",
              fontSize: 14,
              textDecoration: "none",
            }}
          >
            See samples
          </Link>
        </div>
      </div>
    </article>
  );
}
