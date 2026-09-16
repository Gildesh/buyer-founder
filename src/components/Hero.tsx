import Link from "next/link";

export function Hero() {
  return (
    <section
      style={{
        position: "relative",
        overflow: "hidden",
        paddingTop: 140,
        paddingBottom: 64,
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "20%",
          left: "50%",
          transform: "translateX(-50%)",
          width: 700,
          height: 400,
          borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(232,165,75,0.15) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ position: "relative", maxWidth: 1152, margin: "0 auto", padding: "0 24px" }}>
        <p
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 24,
            padding: "6px 14px",
            borderRadius: 999,
            border: "1px solid #2a2622",
            background: "#1c1916",
            fontSize: 12,
            color: "#8a8278",
          }}
        >
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#e8a54b" }} />
          PainFork wizard live · waitlist for the rest
        </p>

        <h1
          className="font-display text-gradient"
          style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", lineHeight: 1.08, maxWidth: 720 }}
        >
          From buyer pain
          <br />
          to shipped product.
        </h1>

        <p style={{ marginTop: 24, maxWidth: 520, fontSize: 18, lineHeight: 1.65, color: "#8a8278" }}>
          Discover what blocks your buyer. Incubate one idea. Validate before
          you launch. Then sell named outcomes — not billable hours.
        </p>

        <div style={{ marginTop: 36, display: "flex", flexWrap: "wrap", gap: 12 }}>
          <Link
            href="/try"
            className="glow-ember"
            style={{
              padding: "14px 28px",
              borderRadius: 999,
              background: "#e8a54b",
              color: "#0c0b0a",
              fontSize: 14,
              fontWeight: 600,
            }}
          >
            Try PainFork
          </Link>
          <Link
            href="/products"
            style={{
              padding: "14px 28px",
              borderRadius: 999,
              border: "1px solid #2a2622",
              background: "#1c1916",
              color: "#f5f0e8",
              fontSize: 14,
              fontWeight: 500,
            }}
          >
            Browse products
          </Link>
        </div>

        <div
          style={{
            marginTop: 56,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: 16,
          }}
        >
          {[
            { stat: "Try", label: "PainFork", sub: "In this browser, no API key" },
            { stat: "3", label: "Pipeline stages", sub: "Discover → Incubate → Validate" },
            { stat: "0", label: "Toxic positivity", sub: "Evidence-gated everything" },
          ].map((item) => (
            <div
              key={item.label}
              style={{
                padding: 24,
                borderRadius: 16,
                border: "1px solid #2a2622",
                background: "rgba(28, 25, 22, 0.6)",
              }}
            >
              <p className="font-display" style={{ fontSize: 36, color: "#e8a54b" }}>{item.stat}</p>
              <p style={{ marginTop: 4, fontWeight: 500, color: "#f5f0e8" }}>{item.label}</p>
              <p style={{ marginTop: 4, fontSize: 13, color: "#8a8278" }}>{item.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
