"use client";

import { useState, type CSSProperties } from "react";
import { trackEvent } from "@/lib/analytics";
import { products } from "@/lib/products";
import { WAITLIST_PLANS } from "@/lib/waitlist";
import { readUtmFromCookies } from "@/lib/utm";

const inputStyle: CSSProperties = {
  marginTop: 6,
  width: "100%",
  borderRadius: 8,
  border: "1px solid #2a2622",
  background: "#0c0b0a",
  padding: "10px 14px",
  fontSize: 14,
  color: "#f5f0e8",
};

type WaitlistFormProps = {
  defaultProduct?: string;
  defaultPlan?: string;
  source?: string;
  compact?: boolean;
};

export function WaitlistForm({
  defaultProduct = "",
  defaultPlan = "",
  source = "waitlist",
  compact = false,
}: WaitlistFormProps) {
  const [email, setEmail] = useState("");
  const [product, setProduct] = useState(defaultProduct);
  const [plan, setPlan] = useState(defaultPlan);
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<"idle" | "saving" | "added" | "exists" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("saving");
    setMessage("");
    try {
      const utm = readUtmFromCookies();
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          product,
          plan,
          source,
          website,
          utmSource: utm.utmSource,
          utmMedium: utm.utmMedium,
          utmCampaign: utm.utmCampaign,
        }),
      });
      const data = (await res.json()) as { status?: string; error?: string };
      if (!res.ok) {
        setStatus("error");
        setMessage(data.error ?? "Could not join the waitlist.");
        return;
      }
      const nextStatus = data.status === "exists" ? "exists" : "added";
      setStatus(nextStatus);
      if (nextStatus === "added") {
        trackEvent("waitlist_signup", {
          product: product || "general",
          plan: plan || "waitlist",
          source,
        });
      }
    } catch {
      setStatus("error");
      setMessage("Network error. Try again, or email hello@buyerfounder.com.");
    }
  }

  if (status === "added" || status === "exists") {
    return (
      <div
        style={{
          borderRadius: 16,
          border: "1px solid rgba(232,165,75,0.3)",
          background: "#1c1916",
          padding: compact ? 20 : 32,
          textAlign: "center",
        }}
      >
        <p className="font-display" style={{ fontSize: compact ? 20 : 24, color: "#f5f0e8" }}>
          {status === "exists" ? "You are already on the list." : "You are on the list."}
        </p>
        <p style={{ marginTop: 8, fontSize: 14, color: "#8a8278" }}>
          We will email when the next tool is actually usable — not when a catalog card ships.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        position: "relative",
        borderRadius: 16,
        border: "1px solid #2a2622",
        background: "#1c1916",
        padding: compact ? 20 : 32,
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div>
          <label htmlFor="waitlist-email" style={{ fontSize: 13, fontWeight: 500, color: "#f5f0e8" }}>
            Email
          </label>
          <input
            id="waitlist-email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            style={inputStyle}
          />
        </div>

        {!compact && (
          <div style={{ display: "grid", gap: 16, gridTemplateColumns: "1fr 1fr" }}>
            <div>
              <label htmlFor="waitlist-product" style={{ fontSize: 13, fontWeight: 500, color: "#f5f0e8" }}>
                Product
              </label>
              <select
                id="waitlist-product"
                value={product}
                onChange={(e) => setProduct(e.target.value)}
                style={inputStyle}
              >
                <option value="">No preference</option>
                {products.map((p) => (
                  <option key={p.slug} value={p.slug}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="waitlist-plan" style={{ fontSize: 13, fontWeight: 500, color: "#f5f0e8" }}>
                Plan
              </label>
              <select
                id="waitlist-plan"
                value={plan}
                onChange={(e) => setPlan(e.target.value)}
                style={inputStyle}
              >
                <option value="">No preference</option>
                {WAITLIST_PLANS.map((item) => (
                  <option key={item} value={item}>
                    {item === "starter" ? "Founder Starter" : item === "pro" ? "Founder Pro" : "Enterprise"}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        <div
          aria-hidden
          style={{
            position: "absolute",
            left: "-9999px",
            height: 0,
            overflow: "hidden",
          }}
        >
          <label htmlFor="waitlist-website">Company website</label>
          <input
            id="waitlist-website"
            tabIndex={-1}
            autoComplete="off"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={status === "saving"}
        className="glow-ember"
        style={{
          marginTop: 20,
          width: "100%",
          border: "none",
          borderRadius: 999,
          background: "#e8a54b",
          color: "#0c0b0a",
          padding: "12px 18px",
          fontSize: 14,
          fontWeight: 600,
          cursor: status === "saving" ? "wait" : "pointer",
        }}
      >
        {status === "saving" ? "Saving…" : "Join the waitlist"}
      </button>

      {status === "error" && (
        <p style={{ marginTop: 12, fontSize: 13, color: "#f0a0a0" }}>{message}</p>
      )}

      <p style={{ marginTop: 12, fontSize: 12, textAlign: "center", color: "#8a8278" }}>
        Stored so we can email you. Not sold. PainFork itself stays in the browser.
      </p>
    </form>
  );
}
