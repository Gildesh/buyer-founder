interface PageHeaderProps {
  title: string;
  description?: string;
  eyebrow?: string;
}

export function PageHeader({ title, description, eyebrow }: PageHeaderProps) {
  return (
    <header
      style={{
        paddingTop: 120,
        paddingBottom: 48,
        borderBottom: "1px solid #2a2622",
        background: "linear-gradient(180deg, #141210 0%, #0c0b0a 100%)",
      }}
    >
      <div style={{ maxWidth: 1152, margin: "0 auto", padding: "0 24px" }}>
        {eyebrow && (
          <p
            style={{
              marginBottom: 12,
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#e8a54b",
            }}
          >
            {eyebrow}
          </p>
        )}
        <h1 className="font-display" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", lineHeight: 1.1, color: "#f5f0e8" }}>
          {title}
        </h1>
        {description && (
          <p style={{ marginTop: 16, maxWidth: 640, fontSize: 18, lineHeight: 1.6, color: "#8a8278" }}>
            {description}
          </p>
        )}
      </div>
    </header>
  );
}
