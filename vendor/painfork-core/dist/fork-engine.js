import { PARADIGM_PATTERNS } from "./data/patterns.js";
const MAX_VALIDATED_PAINS = 3;
export function getValidatedPains(pains) {
    return pains.filter((p) => p.validated);
}
export function canFork(pains) {
    return getValidatedPains(pains).length >= 1;
}
export function canValidateMore(pains) {
    return getValidatedPains(pains).length < MAX_VALIDATED_PAINS;
}
export function validatePain(pains, painId, evidence, severity) {
    if (!evidence.trim()) {
        throw new Error("Evidence is required to validate a pain.");
    }
    if (!severity) {
        throw new Error("Severity is required: blocking | costly | annoying");
    }
    const target = pains.find((p) => p.id === painId);
    if (!target) {
        throw new Error(`Pain not found: ${painId}`);
    }
    const alreadyValidated = getValidatedPains(pains);
    if (!target.validated && alreadyValidated.length >= MAX_VALIDATED_PAINS) {
        throw new Error(`Maximum ${MAX_VALIDATED_PAINS} validated pains allowed.`);
    }
    return pains.map((p) => p.id === painId
        ? { ...p, evidence: evidence.trim(), severity, validated: true }
        : p);
}
function contextSignals(context) {
    const signals = new Set();
    if (!context)
        return signals;
    const blob = [
        context.vertical,
        context.buyerRole,
        context.systemAge ?? "",
        ...context.stackHints,
        ...context.constraints,
        context.notes ?? "",
    ]
        .join(" ")
        .toLowerCase();
    if (/green|terminal|screen|as\/400|mainframe|3270/.test(blob)) {
        signals.add("terminal");
    }
    if (/api|mobile|digital|http/.test(blob)) {
        signals.add("api");
    }
    if (/report|analytics|dashboard|bi|warehouse|lake/.test(blob)) {
        signals.add("reporting");
    }
    if (/db|sql|oracle|db2|postgres|index|query|stored proc/.test(blob)) {
        signals.add("db");
    }
    if (/pdf|document|binder|email corpus|scan/.test(blob)) {
        signals.add("documents");
    }
    if (/module|bounded|workflow|slice/.test(blob)) {
        signals.add("module-boundary");
    }
    if (/legacy|migration|modernize|on-prem|no source/.test(blob)) {
        signals.add("legacy-core");
    }
    if (/cache/.test(blob)) {
        signals.add("cache");
    }
    for (const hint of context.stackHints) {
        signals.add(hint.toLowerCase());
    }
    for (const c of context.constraints) {
        signals.add(c.toLowerCase());
    }
    return signals;
}
function painSignals(pain) {
    const signals = new Set();
    const blob = pain.statement.toLowerCase();
    if (/green|terminal|screen/.test(blob))
        signals.add("terminal");
    if (/api|mobile|digital/.test(blob))
        signals.add("api");
    if (/report|query|index|slow|replica/.test(blob))
        signals.add("reporting");
    if (/cache/.test(blob))
        signals.add("cache");
    if (/pdf|document|corpus|search/.test(blob))
        signals.add("documents");
    if (/module|bounded|workflow/.test(blob))
        signals.add("module-boundary");
    if (/audit|compliance|lineage/.test(blob))
        signals.add("compliance");
    if (/batch|integration|re-key/.test(blob))
        signals.add("integration");
    return signals;
}
function hasAntiPattern(pattern, context, pain) {
    const painBlob = pain.statement.toLowerCase();
    const painSig = painSignals(pain);
    for (const anti of pattern.antiPatterns) {
        switch (anti) {
            case "no-terminal":
                if (!context.has("terminal") && !painSig.has("terminal"))
                    return true;
                break;
            case "api-already-exists":
                if (/already has api|existing api|exposes http/.test(painBlob))
                    return true;
                break;
            case "no-reporting-pain":
                if (pain.category !== "performance" &&
                    pain.category !== "visibility" &&
                    !/report|query|analytics/.test(painBlob)) {
                    return true;
                }
                break;
            case "greenfield-only":
                if (!context.has("legacy-core"))
                    return true;
                break;
            case "documentation-complete":
                if (pain.category !== "knowledge" &&
                    pain.category !== "schema" &&
                    !/undocumented|lineage/.test(painBlob)) {
                    return true;
                }
                break;
            case "no-db":
                if (!context.has("db") &&
                    !/index|query|stored|table|replica/.test(painBlob)) {
                    return true;
                }
                break;
            case "no-legacy-core":
                if (!context.has("legacy-core"))
                    return true;
                break;
            case "fuzzy-boundary":
                if (pain.category !== "cutover")
                    return true;
                break;
            case "structured-source-of-truth":
                if (!/pdf|document|corpus|binder|search/.test(painBlob))
                    return true;
                break;
            case "no-production-traffic":
                if (pain.grain !== "macro" && pain.category !== "cutover")
                    return true;
                break;
            case "write-path-only":
                if (!/read|report|query|replica/.test(painBlob))
                    return true;
                break;
            default:
                break;
        }
    }
    return false;
}
function meetsContextRequirements(pattern, context, pain) {
    if (pattern.contextRequirements.length === 0)
        return true;
    const painSig = painSignals(pain);
    return pattern.contextRequirements.some((req) => context.has(req) || painSig.has(req));
}
export function scorePatternForPain(pattern, pain, context) {
    const ctx = contextSignals(context);
    const painSig = painSignals(pain);
    if (!pattern.painGrains.includes(pain.grain)) {
        return null;
    }
    if (!pattern.painCategories.includes(pain.category)) {
        return null;
    }
    if (hasAntiPattern(pattern, ctx, pain)) {
        return null;
    }
    if (!meetsContextRequirements(pattern, ctx, pain)) {
        return null;
    }
    let score = 0;
    const reasons = [];
    score += 3;
    reasons.push(`Grain ${pain.grain} matches pattern`);
    score += 3;
    reasons.push(`Category ${pain.category} matches pattern`);
    for (const req of pattern.contextRequirements) {
        if (ctx.has(req) || painSig.has(req)) {
            score += 2;
            reasons.push(`Context signal: ${req}`);
        }
    }
    if (pain.grain === "micro" && pattern.id === "read-path-modern" && /slow|query|report|index/.test(pain.statement.toLowerCase())) {
        score += 4;
        reasons.push("Micro performance symptom maps to read-path modernization");
    }
    if (/green|terminal|screen/.test(pain.statement.toLowerCase()) && pattern.id === "screen-map-api") {
        score += 5;
        reasons.push("Terminal workflow pain prefers screen-map-api");
    }
    if (/cache/.test(pain.statement.toLowerCase()) && pattern.id === "read-path-modern") {
        score -= 3;
        reasons.push("Cache-specific pain — read-path-modern is not the default fit");
    }
    if (/cache/.test(pain.statement.toLowerCase()) && pattern.id === "shadow-compare") {
        score += 2;
        reasons.push("Cache invalidation benefits from shadow comparison");
    }
    if (pain.severity === "blocking") {
        score += 1;
        reasons.push("Blocking severity increases priority");
    }
    return { patternId: pattern.id, score, reasons };
}
export function matchPatternsForPain(pain, context) {
    const matches = [];
    for (const pattern of PARADIGM_PATTERNS) {
        const result = scorePatternForPain(pattern, pain, context);
        if (result) {
            matches.push(result);
        }
    }
    matches.sort((a, b) => b.score - a.score);
    return matches;
}
function instantiateTemplate(template, pain) {
    const short = pain.statement.length > 80
        ? pain.statement.slice(0, 77) + "..."
        : pain.statement;
    return template.replace(/\{painStatement\}/g, short);
}
function makeShiftId(patternId, painId, index) {
    return `${patternId}--${painId}--${index}`;
}
export function generateShiftsForPain(pain, context, maxShifts = 5) {
    const matches = matchPatternsForPain(pain, context);
    const top = matches.slice(0, maxShifts);
    return top.map((match, index) => {
        const pattern = PARADIGM_PATTERNS.find((p) => p.id === match.patternId);
        const deliverableTemplate = pattern.deliverableTemplates[index % pattern.deliverableTemplates.length];
        return {
            id: makeShiftId(pattern.id, pain.id, index),
            patternId: pattern.id,
            title: `${pattern.name}: ${pain.statement.slice(0, 60)}${pain.statement.length > 60 ? "…" : ""}`,
            assumptionBroken: pattern.assumptionBroken,
            approach: instantiateTemplate(pattern.approachTemplate, pain),
            deliverable: instantiateTemplate(deliverableTemplate, pain),
            scope: pattern.scopeDefault,
            risks: [...pattern.risks],
            notThis: pattern.notThis,
            painIds: [pain.id],
        };
    });
}
export function forkAll(pains, context) {
    if (!canFork(pains)) {
        throw new Error("Fork is locked until at least one pain is validated with evidence.");
    }
    const validated = getValidatedPains(pains);
    const shifts = [];
    for (const pain of validated) {
        const painShifts = generateShiftsForPain(pain, context, 5);
        shifts.push(...painShifts.slice(0, 5));
    }
    const seen = new Set();
    return shifts.filter((s) => {
        const key = `${s.patternId}:${s.painIds[0]}`;
        if (seen.has(key))
            return false;
        seen.add(key);
        return true;
    });
}
//# sourceMappingURL=fork-engine.js.map