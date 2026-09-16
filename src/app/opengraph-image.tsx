import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Buyer Founder — From buyer pain to shipped product";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "#0c0b0a",
          color: "#f5f0e8",
        }}
      >
        <div style={{ fontSize: 28, color: "#e8a54b", letterSpacing: "0.12em", textTransform: "uppercase" }}>
          Buyer Founder
        </div>
        <div style={{ marginTop: 24, fontSize: 64, fontWeight: 600, lineHeight: 1.1, maxWidth: 900 }}>
          Pain before paradigm
        </div>
        <div style={{ marginTop: 24, fontSize: 28, color: "#8a8278", maxWidth: 820, lineHeight: 1.4 }}>
          Discover buyer pain, validate before launch, ship named outcomes — not catalog theater.
        </div>
      </div>
    ),
    { ...size },
  );
}
