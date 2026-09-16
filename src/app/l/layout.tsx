import Link from "next/link";

export default function CampaignLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "#0c0b0a" }}>
      <header
        style={{
          padding: "20px 24px",
          borderBottom: "1px solid #2a2622",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
        }}
      >
        <Link href="/" className="font-display" style={{ fontSize: 20, color: "#f5f0e8", textDecoration: "none" }}>
          Buyer Founder
        </Link>
        <Link href="/try" style={{ fontSize: 13, color: "#e8a54b" }}>
          Try PainFork
        </Link>
      </header>
      <main style={{ flex: 1 }}>{children}</main>
      <footer style={{ padding: "24px", borderTop: "1px solid #2a2622", textAlign: "center" }}>
        <p style={{ fontSize: 12, color: "#8a8278" }}>
          No catalog nav on campaign pages.{" "}
          <Link href="/" style={{ color: "#e8a54b" }}>
            Full site
          </Link>
        </p>
      </footer>
    </div>
  );
}
