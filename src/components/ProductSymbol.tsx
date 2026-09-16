import type { ReactNode } from "react";

type SymbolSize = "sm" | "md" | "lg" | "xl";

const sizeClass: Record<SymbolSize, string> = {
  sm: "product-icon--sm",
  md: "product-icon--md",
  lg: "product-icon--lg",
  xl: "product-icon--xl",
};

interface ProductSymbolProps {
  slug: string;
  accent?: string;
  size?: SymbolSize;
  className?: string;
}

function SymbolSvg({ slug, accent = "#e8a54b" }: { slug: string; accent?: string }) {
  const icons: Record<string, ReactNode> = {
    painfork: (
      <>
        <path d="M32 12v40M32 28L20 40M32 28L44 40" stroke={accent} strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="32" cy="10" r="4" fill={accent} opacity="0.8" />
        <path d="M16 48c4-8 10-12 16-12s12 4 16 12" stroke={accent} strokeWidth="1.5" opacity="0.5" strokeLinecap="round" />
      </>
    ),
    kiln: (
      <>
        <rect x="18" y="20" width="28" height="32" rx="2" stroke={accent} strokeWidth="2" fill="none" />
        <path d="M24 52h16" stroke={accent} strokeWidth="2" strokeLinecap="round" />
        <path d="M28 36c2-6 4-10 4-14M36 36c-2-6-4-10-4-14" stroke={accent} strokeWidth="2" strokeLinecap="round" opacity="0.9" />
        <circle cx="32" cy="14" r="3" fill={accent} opacity="0.6" />
      </>
    ),
    "feasibility-validator": (
      <>
        <path d="M32 8l20 8v16c0 12-8 20-20 24C20 52 12 44 12 32V16l20-8z" stroke={accent} strokeWidth="2" fill="none" />
        <path d="M24 32l6 6 12-14" stroke={accent} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
    "fullstack-assistant": (
      <>
        <rect x="14" y="12" width="24" height="32" rx="2" stroke={accent} strokeWidth="2" fill="none" />
        <path d="M20 22h16M20 30h12M20 38h8" stroke={accent} strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
        <circle cx="48" cy="44" r="10" stroke={accent} strokeWidth="2" fill="none" />
        <path d="M44 44l3 3 6-6" stroke={accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
    "clause-finder": (
      <>
        <rect x="16" y="10" width="28" height="38" rx="2" stroke={accent} strokeWidth="2" fill="none" />
        <path d="M22 20h20M22 28h16M22 36h12" stroke={accent} strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
        <circle cx="44" cy="44" r="12" stroke={accent} strokeWidth="2" fill="none" />
        <path d="M40 44h8M44 40v8" stroke={accent} strokeWidth="2" strokeLinecap="round" />
      </>
    ),
    "visual-api-compiler": (
      <>
        <rect x="10" y="14" width="22" height="16" rx="1" stroke={accent} strokeWidth="2" fill="none" />
        <path d="M14 22h14M14 26h10" stroke={accent} strokeWidth="1" opacity="0.5" />
        <path d="M36 22h8l6 6v12l-6 6H36" stroke={accent} strokeWidth="2" fill="none" strokeLinejoin="round" />
        <path d="M40 28v8M44 32h-4" stroke={accent} strokeWidth="1.5" strokeLinecap="round" />
        <path d="M32 22l4 4" stroke={accent} strokeWidth="1.5" strokeLinecap="round" />
      </>
    ),
    "wire-fusion": (
      <>
        <circle cx="16" cy="20" r="4" stroke={accent} strokeWidth="2" fill="none" />
        <circle cx="16" cy="44" r="4" stroke={accent} strokeWidth="2" fill="none" />
        <circle cx="48" cy="32" r="6" stroke={accent} strokeWidth="2" fill={accent} fillOpacity="0.2" />
        <path d="M20 20c8 0 12 4 22 8M20 44c8 0 12-4 22-8" stroke={accent} strokeWidth="2" strokeLinecap="round" />
      </>
    ),
    "roster-solver": (
      <>
        <rect x="12" y="14" width="40" height="36" rx="2" stroke={accent} strokeWidth="2" fill="none" />
        <path d="M12 26h40M24 14v36M36 14v36" stroke={accent} strokeWidth="1.5" opacity="0.5" />
        <circle cx="18" cy="20" r="2" fill={accent} />
        <circle cx="30" cy="32" r="2" fill={accent} />
        <circle cx="42" cy="44" r="2" fill={accent} />
      </>
    ),
    "form-compiler": (
      <>
        <rect x="16" y="10" width="32" height="44" rx="2" stroke={accent} strokeWidth="2" fill="none" />
        <rect x="22" y="18" width="20" height="4" rx="1" stroke={accent} strokeWidth="1.5" fill="none" opacity="0.5" />
        <rect x="22" y="28" width="20" height="4" rx="1" stroke={accent} strokeWidth="1.5" fill="none" opacity="0.5" />
        <path d="M22 40l4 4 8-10" stroke={accent} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
    "petrol-vision": (
      <>
        <path d="M20 48V28l4-8h16l4 8v20" stroke={accent} strokeWidth="2" fill="none" strokeLinejoin="round" />
        <rect x="26" y="32" width="12" height="8" rx="1" stroke={accent} strokeWidth="1.5" fill="none" />
        <circle cx="44" cy="24" r="10" stroke={accent} strokeWidth="2" fill="none" />
        <circle cx="44" cy="24" r="4" fill={accent} opacity="0.4" />
      </>
    ),
    planroom: (
      <>
        <rect x="12" y="12" width="28" height="40" rx="2" stroke={accent} strokeWidth="2" fill="none" />
        <path d="M18 22h16M18 30h12M18 38h14" stroke={accent} strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
        <rect x="44" y="16" width="10" height="32" rx="1" stroke={accent} strokeWidth="1.5" fill="none" opacity="0.7" />
      </>
    ),
    "edge-searcher": (
      <>
        <circle cx="32" cy="32" r="20" stroke={accent} strokeWidth="2" fill="none" opacity="0.3" />
        <circle cx="32" cy="32" r="12" stroke={accent} strokeWidth="2" fill="none" opacity="0.5" />
        <circle cx="32" cy="32" r="4" fill={accent} />
        <path d="M38 26l10-8" stroke={accent} strokeWidth="2" strokeLinecap="round" />
      </>
    ),
    stillpoint: (
      <>
        <circle cx="32" cy="32" r="24" stroke={accent} strokeWidth="1" fill="none" opacity="0.2" />
        <circle cx="32" cy="32" r="16" stroke={accent} strokeWidth="1.5" fill="none" opacity="0.4" />
        <circle cx="32" cy="32" r="8" stroke={accent} strokeWidth="2" fill="none" opacity="0.7" />
        <circle cx="32" cy="32" r="3" fill={accent} />
      </>
    ),
    "travel-companion": (
      <>
        <circle cx="32" cy="28" r="16" stroke={accent} strokeWidth="2" fill="none" />
        <path d="M32 20v16M26 28h12" stroke={accent} strokeWidth="2" strokeLinecap="round" />
        <path d="M32 44l-8 10h16l-8-10z" stroke={accent} strokeWidth="2" fill="none" strokeLinejoin="round" />
      </>
    ),
  };

  const content = icons[slug] ?? (
    <circle cx="32" cy="32" r="16" stroke={accent} strokeWidth="2" fill="none" />
  );

  return (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden>
      {content}
    </svg>
  );
}

export function ProductSymbol({ slug, accent, size = "md", className }: ProductSymbolProps) {
  return (
    <div
      className={`product-icon ${sizeClass[size]} ${className ?? ""}`}
      style={{ boxShadow: accent ? `0 0 20px -6px ${accent}55` : undefined }}
    >
      <SymbolSvg slug={slug} accent={accent} />
    </div>
  );
}

export function ProductSymbolBare({ slug, accent, size = "md", className }: ProductSymbolProps) {
  return (
    <div className={`product-icon ${sizeClass[size]} ${className ?? ""}`}>
      <SymbolSvg slug={slug} accent={accent} />
    </div>
  );
}
