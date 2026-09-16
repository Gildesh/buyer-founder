"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import type { CSSProperties } from "react";
import {
  addCustomPain,
  appendNote,
  applyExampleToSession,
  buildWedge,
  canFork,
  excavatePains,
  exportMarkdown,
  forkAll,
  getContextOptions,
  getPickedShifts,
  getValidatedPains,
  listExamples,
  listVerticalOptions,
  loadBrowserSession,
  mergeExcavatedPains,
  pickShift,
  unpickShift,
  resetBrowserSession,
  saveBrowserSession,
  setContext,
  setShifts,
  updatePains,
  validatePain,
  type Pain,
  type Session,
  type Severity,
} from "@painfork/core/browser";

const STEPS = ["Context", "Excavate", "Validate", "Fork", "Export"] as const;
const EXAMPLE_ID = "ex-as400-slow-modernize";

const field: CSSProperties = {
  marginTop: 6,
  width: "100%",
  borderRadius: 8,
  border: "1px solid #2a2622",
  background: "#0c0b0a",
  padding: "10px 14px",
  fontSize: 14,
  color: "#f5f0e8",
};

const chip: CSSProperties = {
  borderRadius: 999,
  border: "1px solid #2a2622",
  background: "#141210",
  color: "#f5f0e8",
  padding: "6px 12px",
  fontSize: 12,
  cursor: "pointer",
};

function toggle(list: string[], item: string): string[] {
  return list.includes(item) ? list.filter((x) => x !== item) : [...list, item];
}

export function PainForkWizard() {
  const [session, setSessionState] = useState<Session | null>(null);
  const [step, setStep] = useState(0);
  const [customStatement, setCustomStatement] = useState("");
  const [evidenceDraft, setEvidenceDraft] = useState<Record<string, { evidence: string; severity: Severity }>>({});
  const [error, setError] = useState("");

  useEffect(() => {
    setSessionState(loadBrowserSession());
  }, []);

  function setSession(next: Session) {
    saveBrowserSession(next);
    setSessionState(next);
    setError("");
  }

  const options = getContextOptions();
  const verticals = listVerticalOptions();
  const example = listExamples().find((item) => item.id === EXAMPLE_ID);

  const validated = session ? getValidatedPains(session.pains) : [];
  const forkUnlocked = session ? canFork(session.pains) : false;
  const wedge = useMemo(() => {
    if (!session?.context || !forkUnlocked) return null;
    const shifts = getPickedShifts(session);
    if (shifts.length === 0) return null;
    return buildWedge(session.context, session.pains, shifts);
  }, [session, forkUnlocked]);

  if (!session) {
    return <p style={{ color: "#8a8278" }}>Loading PainFork…</p>;
  }

  const context = session.context ?? {
    vertical: "legacy-migration",
    buyerRole: "CTO",
    systemAge: "25+ years",
    stackHints: [],
    constraints: [],
    notes: "",
  };

  function go(next: number) {
    if (next === 3 && !forkUnlocked) return;
    setStep(Math.max(0, Math.min(STEPS.length - 1, next)));
  }

  function loadExample() {
    const applied = applyExampleToSession(resetBrowserSession(), EXAMPLE_ID);
    const withShifts = setShifts(applied, forkAll(applied.pains, applied.context));
    setSession(withShifts);
    setStep(3);
  }

  function excavate() {
    if (!session) return;
    try {
      const pains = excavatePains(context.vertical, context);
      setSession(mergeExcavatedPains(setContext(session, context), pains));
      setStep(1);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Excavate failed.");
    }
  }

  function onValidate(pain: Pain) {
    if (!session) return;
    const draft = evidenceDraft[pain.id] ?? {
      evidence: pain.evidence ?? pain.suggestedEvidence ?? "",
      severity: (pain.severity ?? "blocking") as Severity,
    };
    try {
      setSession(updatePains(session, validatePain(session.pains, pain.id, draft.evidence, draft.severity)));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Validation failed.");
    }
  }

  function onFork() {
    if (!session) return;
    try {
      setSession(setShifts(session, forkAll(session.pains, session.context)));
      setStep(3);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Fork failed.");
    }
  }

  const markdown = wedge ? exportMarkdown(wedge) : "";

  return (
    <div>
      <div
        style={{
          position: "sticky",
          top: 64,
          zIndex: 20,
          display: "flex",
          flexWrap: "wrap",
          gap: 12,
          justifyContent: "space-between",
          alignItems: "center",
          padding: "12px 0",
          background: "#0c0b0a",
        }}
      >
        <ol style={{ display: "flex", flexWrap: "wrap", gap: 8, listStyle: "none", padding: 0, margin: 0 }}>
          {STEPS.map((label, i) => {
            const locked = label === "Fork" && !forkUnlocked && i > step;
            return (
              <li key={label}>
                <button
                  type="button"
                  disabled={locked}
                  onClick={() => go(i)}
                  style={{
                    ...chip,
                    borderColor: i === step ? "#e8a54b" : "#2a2622",
                    color: i === step ? "#e8a54b" : "#8a8278",
                    opacity: locked ? 0.4 : 1,
                  }}
                >
                  {String(i + 1).padStart(2, "0")} {label}
                </button>
              </li>
            );
          })}
        </ol>
        <div style={{ display: "flex", gap: 8 }}>
          <button type="button" onClick={loadExample} style={chip}>
            Load AS/400 example
          </button>
          <button
            type="button"
            onClick={() => {
              setSession(resetBrowserSession());
              setStep(0);
            }}
            style={chip}
          >
            New session
          </button>
        </div>
      </div>

      {error && <p style={{ marginTop: 16, fontSize: 13, color: "#f0a0a0" }}>{error}</p>}

      {step === 0 && (
        <section style={{ marginTop: 28 }}>
          <h2 className="font-display" style={{ fontSize: 28, color: "#f5f0e8" }}>
            Buyer context
          </h2>
          <p style={{ marginTop: 8, maxWidth: 640, color: "#8a8278" }}>
            Vertical and buyer first. The library will not fork until at least one pain has evidence.
          </p>
          <div style={{ marginTop: 24, display: "grid", gap: 16, gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
            <label style={{ fontSize: 13 }}>
              Vertical
              <select
                value={context.vertical}
                onChange={(e) => setSession(setContext(session, { ...context, vertical: e.target.value }))}
                style={field}
              >
                {verticals.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.label}
                  </option>
                ))}
              </select>
            </label>
            <label style={{ fontSize: 13 }}>
              Buyer role
              <select
                value={context.buyerRole}
                onChange={(e) => setSession(setContext(session, { ...context, buyerRole: e.target.value }))}
                style={field}
              >
                {options.buyerRoles.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </label>
            <label style={{ fontSize: 13 }}>
              System age
              <select
                value={context.systemAge ?? ""}
                onChange={(e) => setSession(setContext(session, { ...context, systemAge: e.target.value }))}
                style={field}
              >
                {options.systemAges.map((age) => (
                  <option key={age} value={age}>
                    {age}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <p style={{ marginTop: 20, fontSize: 13, color: "#8a8278" }}>Stack hints</p>
          <div style={{ marginTop: 8, display: "flex", flexWrap: "wrap", gap: 8 }}>
            {options.stackHints.slice(0, 16).map((hint) => (
              <button
                key={hint}
                type="button"
                onClick={() =>
                  setSession(setContext(session, { ...context, stackHints: toggle(context.stackHints, hint) }))
                }
                style={{
                  ...chip,
                  borderColor: context.stackHints.includes(hint) ? "#e8a54b" : "#2a2622",
                  color: context.stackHints.includes(hint) ? "#e8a54b" : "#8a8278",
                }}
              >
                {hint}
              </button>
            ))}
          </div>
          <p style={{ marginTop: 20, fontSize: 13, color: "#8a8278" }}>Constraints</p>
          <div style={{ marginTop: 8, display: "flex", flexWrap: "wrap", gap: 8 }}>
            {options.constraints.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() =>
                  setSession(setContext(session, { ...context, constraints: toggle(context.constraints, item) }))
                }
                style={{
                  ...chip,
                  borderColor: context.constraints.includes(item) ? "#e8a54b" : "#2a2622",
                  color: context.constraints.includes(item) ? "#e8a54b" : "#8a8278",
                }}
              >
                {item}
              </button>
            ))}
          </div>
          <label style={{ display: "block", marginTop: 20, fontSize: 13 }}>
            Notes
            <textarea
              rows={3}
              value={context.notes ?? ""}
              onChange={(e) => setSession(setContext(session, { ...context, notes: e.target.value }))}
              style={{ ...field, resize: "vertical" }}
            />
          </label>
          <div style={{ marginTop: 8, display: "flex", flexWrap: "wrap", gap: 8 }}>
            {options.notePrompts.slice(0, 4).map((prompt) => (
              <button
                key={prompt}
                type="button"
                onClick={() =>
                  setSession(setContext(session, { ...context, notes: appendNote(context.notes ?? "", prompt) }))
                }
                style={chip}
              >
                {prompt}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={excavate}
            className="glow-ember"
            style={{
              marginTop: 28,
              border: "none",
              borderRadius: 999,
              background: "#e8a54b",
              color: "#0c0b0a",
              padding: "12px 22px",
              fontSize: 14,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Excavate pains
          </button>
        </section>
      )}

      {step === 1 && (
        <section style={{ marginTop: 28 }}>
          <h2 className="font-display" style={{ fontSize: 28, color: "#f5f0e8" }}>
            Excavated pains
          </h2>
          <p style={{ marginTop: 8, color: "#8a8278" }}>
            {session.pains.length} from the {context.vertical} library. Add a custom pain if the buyer said something the library missed.
          </p>
          <ul style={{ marginTop: 20, listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: 12 }}>
            {session.pains.map((pain) => (
              <li key={pain.id} style={{ border: "1px solid #2a2622", borderRadius: 12, background: "#1c1916", padding: 16 }}>
                <p style={{ fontSize: 12, color: "#e8a54b" }}>
                  {pain.grain} · {pain.category}
                  {pain.validated ? " · validated" : ""}
                </p>
                <p style={{ marginTop: 6, color: "#f5f0e8" }}>{pain.statement}</p>
              </li>
            ))}
          </ul>
          <div style={{ marginTop: 16, display: "flex", gap: 8, flexWrap: "wrap" }}>
            <input
              value={customStatement}
              onChange={(e) => setCustomStatement(e.target.value)}
              placeholder="Custom pain the buyer actually said"
              style={{ ...field, marginTop: 0, flex: 1, minWidth: 220 }}
            />
            <button
              type="button"
              onClick={() => {
                if (!customStatement.trim()) return;
                setSession(addCustomPain(session, customStatement.trim(), "micro", "visibility"));
                setCustomStatement("");
              }}
              style={chip}
            >
              Add pain
            </button>
          </div>
          <button type="button" onClick={() => setStep(2)} style={{ ...chip, marginTop: 24, borderColor: "#e8a54b", color: "#e8a54b" }}>
            Validate with evidence
          </button>
        </section>
      )}

      {step === 2 && (
        <section style={{ marginTop: 28 }}>
          <h2 className="font-display" style={{ fontSize: 28, color: "#f5f0e8" }}>
            Evidence gate
          </h2>
          <p style={{ marginTop: 8, color: "#8a8278" }}>
            Max three validated pains. Fork stays locked until at least one has evidence and severity.
            {example ? ` Suggested evidence lives in “${example.title}”.` : ""}
          </p>
          <ul style={{ marginTop: 20, listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: 16 }}>
            {session.pains.map((pain) => {
              const draft = evidenceDraft[pain.id] ?? {
                evidence: pain.evidence ?? "",
                severity: (pain.severity ?? "blocking") as Severity,
              };
              return (
                <li key={pain.id} style={{ border: "1px solid #2a2622", borderRadius: 12, background: "#1c1916", padding: 16 }}>
                  <p style={{ color: "#f5f0e8" }}>{pain.statement}</p>
                  {pain.suggestedEvidence && (
                    <p style={{ marginTop: 8, fontSize: 13, color: "#8a8278" }}>Suggested: {pain.suggestedEvidence}</p>
                  )}
                  <textarea
                    rows={2}
                    value={draft.evidence}
                    onChange={(e) =>
                      setEvidenceDraft((prev) => ({
                        ...prev,
                        [pain.id]: { ...draft, evidence: e.target.value },
                      }))
                    }
                    placeholder="What the buyer said or you observed"
                    style={{ ...field, resize: "vertical" }}
                  />
                  <div style={{ marginTop: 10, display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
                    {(["blocking", "costly", "annoying"] as Severity[]).map((sev) => (
                      <button
                        key={sev}
                        type="button"
                        onClick={() =>
                          setEvidenceDraft((prev) => ({ ...prev, [pain.id]: { ...draft, severity: sev } }))
                        }
                        style={{
                          ...chip,
                          borderColor: draft.severity === sev ? "#e8a54b" : "#2a2622",
                          color: draft.severity === sev ? "#e8a54b" : "#8a8278",
                        }}
                      >
                        {sev}
                      </button>
                    ))}
                    <button type="button" onClick={() => onValidate(pain)} style={{ ...chip, borderColor: "#e8a54b", color: "#e8a54b" }}>
                      {pain.validated ? "Update" : "Validate"}
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
          <p style={{ marginTop: 12, fontSize: 13, color: "#8a8278" }}>{validated.length} / 3 validated</p>
          <button
            type="button"
            disabled={!forkUnlocked}
            onClick={onFork}
            className="glow-ember"
            style={{
              marginTop: 16,
              border: "none",
              borderRadius: 999,
              background: forkUnlocked ? "#e8a54b" : "#2a2622",
              color: forkUnlocked ? "#0c0b0a" : "#8a8278",
              padding: "12px 22px",
              fontSize: 14,
              fontWeight: 600,
              cursor: forkUnlocked ? "pointer" : "not-allowed",
            }}
          >
            Fork paradigm shifts
          </button>
        </section>
      )}

      {step === 3 && (
        <section style={{ marginTop: 28 }}>
          <h2 className="font-display" style={{ fontSize: 28, color: "#f5f0e8" }}>
            Pattern-bound shifts
          </h2>
          <p style={{ marginTop: 8, color: "#8a8278" }}>
            Pick the wedge you will sell. Each shift cites a shipped pattern — not a free-form LLM idea.
          </p>
          {session.shifts.length === 0 && (
            <button type="button" onClick={onFork} style={{ ...chip, marginTop: 16, borderColor: "#e8a54b", color: "#e8a54b" }}>
              Generate shifts
            </button>
          )}
          <ul style={{ marginTop: 20, listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: 12 }}>
            {session.shifts.map((shift) => {
              const picked = getPickedShifts(session).some((s) => s.id === shift.id);
              return (
                <li key={shift.id} style={{ border: `1px solid ${picked ? "#e8a54b" : "#2a2622"}`, borderRadius: 12, background: "#1c1916", padding: 16 }}>
                  <p style={{ fontSize: 12, color: "#e8a54b" }}>{shift.patternId}</p>
                  <p className="font-display" style={{ marginTop: 6, fontSize: 22, color: "#f5f0e8" }}>
                    {shift.title}
                  </p>
                  <p style={{ marginTop: 8, fontSize: 14, color: "#8a8278" }}>{shift.assumptionBroken}</p>
                  <p style={{ marginTop: 8, fontSize: 14, color: "#f5f0e8" }}>{shift.deliverable}</p>
                  <button
                    type="button"
                    onClick={() => {
                      let next = session;
                      for (const id of session.pickedShiftIds) {
                        if (id !== shift.id) next = unpickShift(next, id);
                      }
                      setSession(pickShift(next, shift.id));
                    }}
                    style={{ ...chip, marginTop: 12, borderColor: "#e8a54b", color: "#e8a54b" }}
                  >
                    {picked ? "Selected" : "Pick this wedge"}
                  </button>
                </li>
              );
            })}
          </ul>
          {session.shifts.length > 0 && (
            <button type="button" onClick={() => setStep(4)} style={{ ...chip, marginTop: 16, borderColor: "#e8a54b", color: "#e8a54b" }}>
              Export one-pager
            </button>
          )}
        </section>
      )}

      {step === 4 && (
        <section style={{ marginTop: 28 }}>
          <h2 className="font-display" style={{ fontSize: 28, color: "#f5f0e8" }}>
            Named outcome
          </h2>
          {!markdown ? (
            <p style={{ marginTop: 8, color: "#8a8278" }}>Pick a shift first.</p>
          ) : (
            <>
              {wedge && (
                <p style={{ marginTop: 12, maxWidth: 720, fontSize: 16, lineHeight: 1.65, color: "#f5f0e8" }}>
                  {wedge.pitch}
                </p>
              )}
              <pre
                style={{
                  marginTop: 20,
                  padding: 20,
                  borderRadius: 12,
                  border: "1px solid #2a2622",
                  background: "#141210",
                  fontSize: 13,
                  lineHeight: 1.6,
                  color: "#f5f0e8",
                  whiteSpace: "pre-wrap",
                  overflow: "auto",
                }}
              >
                {markdown}
              </pre>
              <div style={{ marginTop: 16, display: "flex", flexWrap: "wrap", gap: 8 }}>
                <button
                  type="button"
                  onClick={() => {
                    const blob = new Blob([markdown], { type: "text/markdown;charset=utf-8" });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement("a");
                    a.href = url;
                    a.download = "wedge.md";
                    a.click();
                    URL.revokeObjectURL(url);
                  }}
                  className="glow-ember"
                  style={{
                    border: "none",
                    borderRadius: 999,
                    background: "#e8a54b",
                    color: "#0c0b0a",
                    padding: "12px 22px",
                    fontSize: 14,
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Download wedge.md
                </button>
                <button
                  type="button"
                  onClick={() => void navigator.clipboard.writeText(markdown)}
                  style={chip}
                >
                  Copy markdown
                </button>
                <Link href="/waitlist?product=painfork&source=try" style={{ ...chip, display: "inline-flex", alignItems: "center" }}>
                  Join waitlist for Pro
                </Link>
              </div>
            </>
          )}
        </section>
      )}
    </div>
  );
}
