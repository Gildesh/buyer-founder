import { getValidatedPains } from "./fork-engine.js";
function formatPain(pain) {
    const parts = [
        `- **${pain.statement}**`,
        `  - Grain: ${pain.grain} | Category: ${pain.category}`,
        `  - Evidence: ${pain.evidence ?? "—"}`,
        `  - Severity: ${pain.severity ?? "—"}`,
    ];
    return parts.join("\n");
}
function formatShift(shift) {
    return [
        `### ${shift.title}`,
        "",
        `**Pattern:** ${shift.patternId}`,
        "",
        `**Assumption broken:** ${shift.assumptionBroken}`,
        "",
        `**Approach:** ${shift.approach}`,
        "",
        `**Deliverable:** ${shift.deliverable}`,
        "",
        `**Scope:** ${shift.scope}`,
        "",
        `**Risks:**`,
        ...shift.risks.map((r) => `- ${r}`),
        "",
        `**Not this:** ${shift.notThis}`,
        "",
    ].join("\n");
}
export function generatePitch(context, pains, shifts) {
    const validated = getValidatedPains(pains);
    const primaryPain = validated[0];
    const primaryShift = shifts[0];
    if (!primaryPain || !primaryShift) {
        return "Set context, validate pains with evidence, and pick a paradigm shift to generate a pitch.";
    }
    const constraint = context.constraints.length > 0
        ? context.constraints.slice(0, 2).join(", ")
        : "legacy constraints";
    return [
        `Your ${context.buyerRole} is blocked by ${primaryPain.statement.split(".")[0]}.`,
        `That is not a tooling problem — it is a ${primaryPain.category} constraint under ${constraint}.`,
        `I propose ${primaryShift.deliverable} in ${primaryShift.scope}, using the ${primaryShift.patternId} pattern so we ship a bounded wedge without a big-bang migration.`,
        `Out of scope: ${primaryShift.notThis}.`,
    ].join(" ");
}
export function buildWedge(context, pains, shifts) {
    const validated = getValidatedPains(pains);
    const pitch = generatePitch(context, pains, shifts);
    return {
        context,
        pains: validated,
        shifts,
        pitch,
        exportedAt: new Date().toISOString(),
    };
}
export function exportMarkdown(wedge) {
    const lines = [
        "# Scoped Engagement Wedge",
        "",
        "## Buyer & Context",
        "",
        `- **Vertical:** ${wedge.context.vertical}`,
        `- **Buyer role:** ${wedge.context.buyerRole}`,
    ];
    if (wedge.context.systemAge) {
        lines.push(`- **System age:** ${wedge.context.systemAge}`);
    }
    if (wedge.context.stackHints.length) {
        lines.push(`- **Stack hints:** ${wedge.context.stackHints.join(", ")}`);
    }
    if (wedge.context.constraints.length) {
        lines.push(`- **Constraints:** ${wedge.context.constraints.join(", ")}`);
    }
    if (wedge.context.notes) {
        lines.push(`- **Notes:** ${wedge.context.notes}`);
    }
    lines.push("", "## Validated Pains (with evidence)", "");
    for (const pain of wedge.pains) {
        lines.push(formatPain(pain));
        lines.push("");
    }
    lines.push("## Chosen Paradigm Shift(s)", "");
    for (const shift of wedge.shifts) {
        lines.push(formatShift(shift));
    }
    const outOfScope = wedge.shifts.map((s) => s.notThis).join("; ");
    const timelines = wedge.shifts.map((s) => s.scope).join(", ");
    const deliverables = wedge.shifts.map((s) => s.deliverable).join("; ");
    lines.push("## Fixed Deliverable & Timeline", "");
    lines.push(`- **Deliverable:** ${deliverables}`);
    lines.push(`- **Timeline:** ${timelines}`);
    lines.push(`- **Out of scope:** ${outOfScope}`);
    lines.push("");
    lines.push("## Opening Pitch", "");
    lines.push(wedge.pitch);
    lines.push("");
    return lines.join("\n");
}
export function exportJson(wedge) {
    return JSON.stringify(wedge, null, 2);
}
//# sourceMappingURL=crystallize.js.map