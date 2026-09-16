"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const nav = [
  { href: "/try", label: "Try" },
  { href: "/pipeline", label: "Pipeline" },
  { href: "/products", label: "Products" },
  { href: "/samples", label: "Samples" },
  { href: "/pricing", label: "Pricing" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header
      style={{
        position: "fixed",
        inset: "0 0 auto 0",
        zIndex: 50,
        borderBottom: "1px solid #2a2622",
        background: "rgba(12, 11, 10, 0.92)",
        backdropFilter: "blur(12px)",
      }}
    >
      <div
        style={{
          maxWidth: 1152,
          margin: "0 auto",
          padding: "14px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
        }}
      >
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span
            style={{
              width: 32,
              height: 32,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 8,
              background: "rgba(232, 165, 75, 0.12)",
              color: "#e8a54b",
              fontSize: 12,
              fontWeight: 700,
              border: "1px solid rgba(232, 165, 75, 0.25)",
            }}
          >
            BF
          </span>
          <span className="font-display" style={{ fontSize: 20, color: "#f5f0e8" }}>
            Buyer Founder
          </span>
        </Link>

        <nav className="hidden md:flex" style={{ alignItems: "center", gap: 28 }}>
          {nav.map((item) => {
            const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  fontSize: 14,
                  color: active ? "#f5f0e8" : "#8a8278",
                  fontWeight: active ? 500 : 400,
                }}
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            href="/try"
            style={{
              fontSize: 14,
              fontWeight: 600,
              color: "#0c0b0a",
              background: "#e8a54b",
              padding: "8px 18px",
              borderRadius: 999,
            }}
          >
            Try PainFork
          </Link>
        </nav>

        <button
          type="button"
          className="md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          aria-expanded={open}
          style={{
            background: "none",
            border: "1px solid #2a2622",
            borderRadius: 8,
            color: "#f5f0e8",
            padding: 8,
            cursor: "pointer",
          }}
        >
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? <path d="M4 4l12 12M4 16L16 4" /> : <path d="M3 6h14M3 10h14" />}
          </svg>
        </button>
      </div>

      {open && (
        <nav
          className="md:hidden"
          style={{
            borderTop: "1px solid #2a2622",
            background: "#141210",
            padding: "16px 24px",
            display: "flex",
            flexDirection: "column",
            gap: 14,
          }}
        >
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              style={{ fontSize: 14, color: "#8a8278" }}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/try"
            onClick={() => setOpen(false)}
            style={{
              fontSize: 14,
              fontWeight: 600,
              color: "#0c0b0a",
              background: "#e8a54b",
              padding: "10px 18px",
              borderRadius: 999,
              textAlign: "center",
            }}
          >
            Try PainFork
          </Link>
        </nav>
      )}
    </header>
  );
}
