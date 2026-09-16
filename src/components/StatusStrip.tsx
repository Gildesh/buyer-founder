import Link from "next/link";
import { samples, usableToday } from "@/lib/status";

export function StatusStrip() {
  return (
    <section style={{ padding: "16px 0 64px" }}>
      <div style={{ maxWidth: 1152, margin: "0 auto", padding: "0 24px" }}>
        <h2 className="font-display" style={{ fontSize: 28, color: "#f5f0e8" }}>
          Usable today
        </h2>
        <p style={{ marginTop: 8, maxWidth: 560, fontSize: 15, color: "#8a8278" }}>
          The catalog has fourteen names. These three can be opened without a mailto.
        </p>
        <div
          style={{
            marginTop: 24,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: 16,
          }}
        >
          {usableToday.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              {...("external" in item && item.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              style={{
                display: "block",
                padding: 24,
                borderRadius: 16,
                border: "1px solid #2a2622",
                background: "rgba(28, 25, 22, 0.6)",
              }}
            >
              <p className="font-display" style={{ fontSize: 22, color: "#e8a54b" }}>
                {item.name}
              </p>
              <p style={{ marginTop: 8, fontSize: 14, lineHeight: 1.6, color: "#8a8278" }}>
                {item.note}
              </p>
            </Link>
          ))}
        </div>

        <h2 className="font-display" style={{ marginTop: 48, fontSize: 28, color: "#f5f0e8" }}>
          Sample artifacts
        </h2>
        <div
          style={{
            marginTop: 24,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: 16,
          }}
        >
          {samples.map((sample) => (
            <Link
              key={sample.slug}
              href={sample.href}
              style={{
                display: "block",
                padding: 24,
                borderRadius: 16,
                border: "1px solid #2a2622",
                background: "rgba(28, 25, 22, 0.6)",
              }}
            >
              <p style={{ fontWeight: 500, color: "#f5f0e8" }}>{sample.title}</p>
              <p style={{ marginTop: 8, fontSize: 14, color: "#8a8278" }}>{sample.note}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
