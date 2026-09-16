import { PainLibrarySchema } from "./schemas.js";
import legacyMigration from "./data/legacy-migration.json" with { type: "json" };
import enterpriseErp from "./data/enterprise-erp.json" with { type: "json" };
import financialServices from "./data/financial-services.json" with { type: "json" };
import infraPlatform from "./data/infra-platform.json" with { type: "json" };
import dataResidue from "./data/data-residue.json" with { type: "json" };
const RAW_LIBRARIES = {
    "legacy-migration": legacyMigration,
    "enterprise-erp": enterpriseErp,
    "financial-services": financialServices,
    "infra-platform": infraPlatform,
    "data-residue": dataResidue,
};
const VERTICAL_TAG_BOOST = {
    "legacy-migration": ["terminal", "green-screen", "mainframe", "cutover"],
    "enterprise-erp": ["erp", "sap", "integration", "warehouse"],
    "financial-services": ["core banking", "payment rails", "compliance", "audit"],
    "infra-platform": ["observability", "kubernetes", "terraform", "on-call"],
    "data-residue": ["documents", "pdf", "sharepoint", "compliance"],
};
export function loadPainLibrary(vertical) {
    const raw = RAW_LIBRARIES[vertical];
    if (!raw) {
        throw new Error(`Unknown vertical: ${vertical}. Available: ${Object.keys(RAW_LIBRARIES).join(", ")}`);
    }
    return PainLibrarySchema.parse(raw);
}
export function listVerticals() {
    return Object.keys(RAW_LIBRARIES);
}
export function libraryEntryToPain(entry) {
    return {
        id: entry.id,
        statement: entry.statement,
        grain: entry.grain,
        category: entry.category,
        suggestedEvidence: entry.suggestedEvidence,
        validated: false,
        parentMacroId: entry.parentMacroId,
    };
}
function hintBlob(context) {
    return [
        ...context.stackHints,
        ...context.constraints,
        context.systemAge ?? "",
        context.buyerRole,
        context.notes ?? "",
    ]
        .join(" ")
        .toLowerCase();
}
export function rankPainsByContext(entries, context) {
    if (!context) {
        return [...entries];
    }
    const hints = hintBlob(context);
    const verticalBoost = VERTICAL_TAG_BOOST[context.vertical] ?? [];
    const scored = entries.map((entry) => {
        let score = 0;
        const tags = entry.contextTags ?? [];
        for (const tag of tags) {
            if (hints.includes(tag.toLowerCase())) {
                score += 2;
            }
            if (verticalBoost.some((b) => tag.toLowerCase().includes(b) || b.includes(tag.toLowerCase()))) {
                score += 1;
            }
        }
        if (context.vertical === "legacy-migration" && entry.grain === "meso") {
            score += 1;
        }
        if (hints.includes("as/400") || hints.includes("mainframe") || hints.includes("green")) {
            if (tags.includes("terminal") || tags.includes("green-screen")) {
                score += 3;
            }
        }
        if (hints.includes("sap") || hints.includes("erp")) {
            if (tags.includes("erp") || tags.includes("sap")) {
                score += 3;
            }
        }
        if (hints.includes("report") || hints.includes("slow") || hints.includes("query")) {
            if (entry.category === "performance") {
                score += 2;
            }
        }
        if (hints.includes("pdf") || hints.includes("document") || hints.includes("sharepoint")) {
            if (tags.includes("documents") || tags.includes("pdf")) {
                score += 3;
            }
        }
        if (hints.includes("kubernetes") || hints.includes("terraform") || hints.includes("observability")) {
            if (tags.includes("kubernetes") || tags.includes("terraform") || tags.includes("observability")) {
                score += 2;
            }
        }
        return { entry, score };
    });
    scored.sort((a, b) => b.score - a.score);
    return scored.map((s) => s.entry);
}
export function excavatePains(vertical, context) {
    const library = loadPainLibrary(vertical);
    const ranked = rankPainsByContext(library.pains, context);
    return ranked.map(libraryEntryToPain);
}
//# sourceMappingURL=pains.js.map