import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sample restriction checklist",
  description: "Oak Hollow HOA / CC&R sample in Clause Finder US mode. Checklist only — not legal advice.",
};

const clauses = [
  {
    cite: "ARTICLE IV Section 4.1",
    category: "Use",
    severity: "high",
    text: "Each Lot shall be used for single-family residential purposes only. No commercial, industrial, or professional business shall be conducted from any Lot or dwelling, except a home office with no customer traffic. Short-term rentals of less than thirty (30) consecutive days are prohibited.",
  },
  {
    cite: "ARTICLE IV Section 4.2",
    category: "Building",
    severity: "high",
    text: "The heated living area of any dwelling, exclusive of garages, porches, and basements, shall not be less than 2,200 square feet. Modular, prefabricated, and mobile homes are prohibited.",
  },
  {
    cite: "ARTICLE IV Section 4.3",
    category: "Building",
    severity: "high",
    text: "No accessory dwelling unit, garage apartment, or detached living quarters shall be constructed or occupied on any Lot.",
  },
  {
    cite: "ARTICLE IV Section 4.4",
    category: "Vehicles",
    severity: "medium",
    text: "No commercial vehicle, box truck, or vehicle with a gross vehicle weight rating exceeding 10,000 pounds shall be parked overnight on any Lot or street.",
  },
  {
    cite: "ARTICLE IV Section 4.5",
    category: "Aesthetic",
    severity: "medium",
    text: "Metal roofs, solar panels visible from the front elevation, and flat roofs are prohibited without a variance from the Architectural Review Board.",
  },
  {
    cite: "ARTICLE VII Section 7.2",
    category: "Process",
    severity: "high",
    text: "No building, fence, wall, or exterior alteration shall be commenced until plans are submitted to and approved in writing by the Architectural Review Board.",
  },
];

const canI = [
  { question: "Can I operate a duplex or ADU here?", answer: "Likely no" },
  { question: "Can I run a business from the property?", answer: "Likely no, except a quiet home office" },
  { question: "Can I park a commercial vehicle overnight?", answer: "Likely no" },
  { question: "Can I install street-visible solar?", answer: "Front-elevation solar likely needs a variance" },
  { question: "Can I place a modular or prefab dwelling?", answer: "Prohibited in extracted clauses" },
];

export default function SampleClausesPage() {
  return (
    <article style={{ padding: "120px 24px 80px" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <Link href="/samples" style={{ fontSize: 14, color: "#8a8278" }}>
          ← All samples
        </Link>
        <p style={{ marginTop: 24, fontSize: 12, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#c9a86c" }}>
          Clause Finder sample
        </p>
        <h1 className="font-display" style={{ marginTop: 12, fontSize: "clamp(2rem, 4vw, 3rem)", color: "#f5f0e8" }}>
          Oak Hollow CC&Rs
        </h1>
        <p style={{ marginTop: 16, fontSize: 16, lineHeight: 1.65, color: "#8a8278" }}>
          US HOA mode on the shipped Oak Hollow sample (Fairfax, Virginia, recorded 14 March 1987).
          High friction — binding clauses extracted, several high-severity.{" "}
          <strong style={{ color: "#f5f0e8" }}>Not legal advice.</strong>
        </p>

        <h2 className="font-display" style={{ marginTop: 40, fontSize: 24, color: "#f5f0e8" }}>
          Can I…?
        </h2>
        <ul style={{ marginTop: 16, listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: 10 }}>
          {canI.map((row) => (
            <li
              key={row.question}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr auto",
                gap: 16,
                border: "1px solid #2a2622",
                borderRadius: 12,
                background: "#1c1916",
                padding: 16,
              }}
            >
              <span style={{ color: "#f5f0e8" }}>{row.question}</span>
              <span style={{ color: "#e8a54b", fontSize: 13, fontWeight: 600 }}>{row.answer}</span>
            </li>
          ))}
        </ul>

        <h2 className="font-display" style={{ marginTop: 40, fontSize: 24, color: "#f5f0e8" }}>
          Extracted restrictions
        </h2>
        <ul style={{ marginTop: 16, listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: 12 }}>
          {clauses.map((clause) => (
            <li key={clause.cite} style={{ border: "1px solid #2a2622", borderRadius: 12, background: "#1c1916", padding: 16 }}>
              <p style={{ fontSize: 12, color: "#c9a86c" }}>
                {clause.cite} · {clause.category} · {clause.severity}
              </p>
              <p style={{ marginTop: 8, fontSize: 14, lineHeight: 1.65, color: "#f5f0e8" }}>{clause.text}</p>
            </li>
          ))}
        </ul>

        <p style={{ marginTop: 32, fontSize: 13, color: "#8a8278" }}>
          Source: Clause Finder sample <code>oak-hollow-ccrs.txt</code> and US <code>can_i_rules</code>.{" "}
          <Link href="/waitlist?product=clause-finder&source=sample" style={{ color: "#e8a54b" }}>
            Waitlist for self-serve reports
          </Link>
          .
        </p>
      </div>
    </article>
  );
}
