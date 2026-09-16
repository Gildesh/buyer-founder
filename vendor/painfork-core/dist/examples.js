import { PainExampleSchema } from "./schemas.js";
import { excavatePains } from "./pains.js";
import { validatePain } from "./fork-engine.js";
import { setContext, mergeExcavatedPains } from "./session-ops.js";
import examplesJson from "./data/examples.json" with { type: "json" };
const EXAMPLES = examplesJson.map((raw) => PainExampleSchema.parse(raw));
export function listExamples() {
    return EXAMPLES;
}
export function getExampleById(id) {
    return EXAMPLES.find((e) => e.id === id);
}
export function collectExampleLeaves(node) {
    if (!node.children || node.children.length === 0) {
        return [node];
    }
    return node.children.flatMap(collectExampleLeaves);
}
export function collectValidatedLeaves(node) {
    return collectExampleLeaves(node).filter((leaf) => leaf.painId && leaf.evidence && leaf.severity);
}
const SEVERITY_RANK = {
    blocking: 3,
    costly: 2,
    annoying: 1,
};
export function selectLeavesForValidation(node, max = 3) {
    return collectValidatedLeaves(node)
        .sort((a, b) => (SEVERITY_RANK[b.severity] ?? 0) - (SEVERITY_RANK[a.severity] ?? 0))
        .slice(0, max);
}
export function applyExampleToSession(session, exampleId) {
    const example = getExampleById(exampleId);
    if (!example) {
        throw new Error(`Example not found: ${exampleId}`);
    }
    const context = {
        vertical: example.vertical,
        buyerRole: example.contextHints.buyerRole,
        systemAge: example.contextHints.systemAge,
        stackHints: example.contextHints.stackHints ?? [],
        constraints: example.contextHints.constraints ?? [],
        notes: example.contextHints.notes,
    };
    let updated = setContext(session, context);
    const excavated = excavatePains(example.vertical, context);
    updated = mergeExcavatedPains(updated, excavated);
    const leaves = selectLeavesForValidation(example.root);
    let pains = updated.pains;
    for (const leaf of leaves) {
        pains = validatePain(pains, leaf.painId, leaf.evidence, leaf.severity);
    }
    return { ...updated, pains, shifts: [], pickedShiftIds: [] };
}
//# sourceMappingURL=examples.js.map