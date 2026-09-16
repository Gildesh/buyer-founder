import { z } from "zod";
import type { ExampleTreeNode } from "./types.js";
export declare const PainGrainSchema: z.ZodEnum<["micro", "meso", "macro"]>;
export declare const SeveritySchema: z.ZodEnum<["blocking", "costly", "annoying"]>;
export declare const PainSchema: z.ZodObject<{
    id: z.ZodString;
    statement: z.ZodString;
    grain: z.ZodEnum<["micro", "meso", "macro"]>;
    category: z.ZodString;
    suggestedEvidence: z.ZodOptional<z.ZodString>;
    evidence: z.ZodOptional<z.ZodString>;
    severity: z.ZodOptional<z.ZodEnum<["blocking", "costly", "annoying"]>>;
    validated: z.ZodBoolean;
    parentMacroId: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    id?: string;
    statement?: string;
    grain?: "micro" | "meso" | "macro";
    category?: string;
    suggestedEvidence?: string;
    evidence?: string;
    severity?: "blocking" | "costly" | "annoying";
    validated?: boolean;
    parentMacroId?: string;
}, {
    id?: string;
    statement?: string;
    grain?: "micro" | "meso" | "macro";
    category?: string;
    suggestedEvidence?: string;
    evidence?: string;
    severity?: "blocking" | "costly" | "annoying";
    validated?: boolean;
    parentMacroId?: string;
}>;
export declare const ContextSchema: z.ZodObject<{
    vertical: z.ZodString;
    buyerRole: z.ZodString;
    systemAge: z.ZodOptional<z.ZodString>;
    stackHints: z.ZodArray<z.ZodString, "many">;
    constraints: z.ZodArray<z.ZodString, "many">;
    notes: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    vertical?: string;
    buyerRole?: string;
    systemAge?: string;
    stackHints?: string[];
    constraints?: string[];
    notes?: string;
}, {
    vertical?: string;
    buyerRole?: string;
    systemAge?: string;
    stackHints?: string[];
    constraints?: string[];
    notes?: string;
}>;
export declare const ParadigmShiftSchema: z.ZodObject<{
    id: z.ZodString;
    patternId: z.ZodString;
    title: z.ZodString;
    assumptionBroken: z.ZodString;
    approach: z.ZodString;
    deliverable: z.ZodString;
    scope: z.ZodString;
    risks: z.ZodArray<z.ZodString, "many">;
    notThis: z.ZodString;
    painIds: z.ZodArray<z.ZodString, "many">;
}, "strip", z.ZodTypeAny, {
    id?: string;
    patternId?: string;
    title?: string;
    assumptionBroken?: string;
    approach?: string;
    deliverable?: string;
    scope?: string;
    risks?: string[];
    notThis?: string;
    painIds?: string[];
}, {
    id?: string;
    patternId?: string;
    title?: string;
    assumptionBroken?: string;
    approach?: string;
    deliverable?: string;
    scope?: string;
    risks?: string[];
    notThis?: string;
    painIds?: string[];
}>;
export declare const WedgeSchema: z.ZodObject<{
    context: z.ZodObject<{
        vertical: z.ZodString;
        buyerRole: z.ZodString;
        systemAge: z.ZodOptional<z.ZodString>;
        stackHints: z.ZodArray<z.ZodString, "many">;
        constraints: z.ZodArray<z.ZodString, "many">;
        notes: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        vertical?: string;
        buyerRole?: string;
        systemAge?: string;
        stackHints?: string[];
        constraints?: string[];
        notes?: string;
    }, {
        vertical?: string;
        buyerRole?: string;
        systemAge?: string;
        stackHints?: string[];
        constraints?: string[];
        notes?: string;
    }>;
    pains: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        statement: z.ZodString;
        grain: z.ZodEnum<["micro", "meso", "macro"]>;
        category: z.ZodString;
        suggestedEvidence: z.ZodOptional<z.ZodString>;
        evidence: z.ZodOptional<z.ZodString>;
        severity: z.ZodOptional<z.ZodEnum<["blocking", "costly", "annoying"]>>;
        validated: z.ZodBoolean;
        parentMacroId: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        id?: string;
        statement?: string;
        grain?: "micro" | "meso" | "macro";
        category?: string;
        suggestedEvidence?: string;
        evidence?: string;
        severity?: "blocking" | "costly" | "annoying";
        validated?: boolean;
        parentMacroId?: string;
    }, {
        id?: string;
        statement?: string;
        grain?: "micro" | "meso" | "macro";
        category?: string;
        suggestedEvidence?: string;
        evidence?: string;
        severity?: "blocking" | "costly" | "annoying";
        validated?: boolean;
        parentMacroId?: string;
    }>, "many">;
    shifts: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        patternId: z.ZodString;
        title: z.ZodString;
        assumptionBroken: z.ZodString;
        approach: z.ZodString;
        deliverable: z.ZodString;
        scope: z.ZodString;
        risks: z.ZodArray<z.ZodString, "many">;
        notThis: z.ZodString;
        painIds: z.ZodArray<z.ZodString, "many">;
    }, "strip", z.ZodTypeAny, {
        id?: string;
        patternId?: string;
        title?: string;
        assumptionBroken?: string;
        approach?: string;
        deliverable?: string;
        scope?: string;
        risks?: string[];
        notThis?: string;
        painIds?: string[];
    }, {
        id?: string;
        patternId?: string;
        title?: string;
        assumptionBroken?: string;
        approach?: string;
        deliverable?: string;
        scope?: string;
        risks?: string[];
        notThis?: string;
        painIds?: string[];
    }>, "many">;
    pitch: z.ZodString;
    exportedAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    context?: {
        vertical?: string;
        buyerRole?: string;
        systemAge?: string;
        stackHints?: string[];
        constraints?: string[];
        notes?: string;
    };
    pains?: {
        id?: string;
        statement?: string;
        grain?: "micro" | "meso" | "macro";
        category?: string;
        suggestedEvidence?: string;
        evidence?: string;
        severity?: "blocking" | "costly" | "annoying";
        validated?: boolean;
        parentMacroId?: string;
    }[];
    shifts?: {
        id?: string;
        patternId?: string;
        title?: string;
        assumptionBroken?: string;
        approach?: string;
        deliverable?: string;
        scope?: string;
        risks?: string[];
        notThis?: string;
        painIds?: string[];
    }[];
    pitch?: string;
    exportedAt?: string;
}, {
    context?: {
        vertical?: string;
        buyerRole?: string;
        systemAge?: string;
        stackHints?: string[];
        constraints?: string[];
        notes?: string;
    };
    pains?: {
        id?: string;
        statement?: string;
        grain?: "micro" | "meso" | "macro";
        category?: string;
        suggestedEvidence?: string;
        evidence?: string;
        severity?: "blocking" | "costly" | "annoying";
        validated?: boolean;
        parentMacroId?: string;
    }[];
    shifts?: {
        id?: string;
        patternId?: string;
        title?: string;
        assumptionBroken?: string;
        approach?: string;
        deliverable?: string;
        scope?: string;
        risks?: string[];
        notThis?: string;
        painIds?: string[];
    }[];
    pitch?: string;
    exportedAt?: string;
}>;
export declare const SessionSchema: z.ZodObject<{
    id: z.ZodString;
    context: z.ZodOptional<z.ZodObject<{
        vertical: z.ZodString;
        buyerRole: z.ZodString;
        systemAge: z.ZodOptional<z.ZodString>;
        stackHints: z.ZodArray<z.ZodString, "many">;
        constraints: z.ZodArray<z.ZodString, "many">;
        notes: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        vertical?: string;
        buyerRole?: string;
        systemAge?: string;
        stackHints?: string[];
        constraints?: string[];
        notes?: string;
    }, {
        vertical?: string;
        buyerRole?: string;
        systemAge?: string;
        stackHints?: string[];
        constraints?: string[];
        notes?: string;
    }>>;
    pains: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        statement: z.ZodString;
        grain: z.ZodEnum<["micro", "meso", "macro"]>;
        category: z.ZodString;
        suggestedEvidence: z.ZodOptional<z.ZodString>;
        evidence: z.ZodOptional<z.ZodString>;
        severity: z.ZodOptional<z.ZodEnum<["blocking", "costly", "annoying"]>>;
        validated: z.ZodBoolean;
        parentMacroId: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        id?: string;
        statement?: string;
        grain?: "micro" | "meso" | "macro";
        category?: string;
        suggestedEvidence?: string;
        evidence?: string;
        severity?: "blocking" | "costly" | "annoying";
        validated?: boolean;
        parentMacroId?: string;
    }, {
        id?: string;
        statement?: string;
        grain?: "micro" | "meso" | "macro";
        category?: string;
        suggestedEvidence?: string;
        evidence?: string;
        severity?: "blocking" | "costly" | "annoying";
        validated?: boolean;
        parentMacroId?: string;
    }>, "many">;
    shifts: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        patternId: z.ZodString;
        title: z.ZodString;
        assumptionBroken: z.ZodString;
        approach: z.ZodString;
        deliverable: z.ZodString;
        scope: z.ZodString;
        risks: z.ZodArray<z.ZodString, "many">;
        notThis: z.ZodString;
        painIds: z.ZodArray<z.ZodString, "many">;
    }, "strip", z.ZodTypeAny, {
        id?: string;
        patternId?: string;
        title?: string;
        assumptionBroken?: string;
        approach?: string;
        deliverable?: string;
        scope?: string;
        risks?: string[];
        notThis?: string;
        painIds?: string[];
    }, {
        id?: string;
        patternId?: string;
        title?: string;
        assumptionBroken?: string;
        approach?: string;
        deliverable?: string;
        scope?: string;
        risks?: string[];
        notThis?: string;
        painIds?: string[];
    }>, "many">;
    pickedShiftIds: z.ZodArray<z.ZodString, "many">;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id?: string;
    context?: {
        vertical?: string;
        buyerRole?: string;
        systemAge?: string;
        stackHints?: string[];
        constraints?: string[];
        notes?: string;
    };
    pains?: {
        id?: string;
        statement?: string;
        grain?: "micro" | "meso" | "macro";
        category?: string;
        suggestedEvidence?: string;
        evidence?: string;
        severity?: "blocking" | "costly" | "annoying";
        validated?: boolean;
        parentMacroId?: string;
    }[];
    shifts?: {
        id?: string;
        patternId?: string;
        title?: string;
        assumptionBroken?: string;
        approach?: string;
        deliverable?: string;
        scope?: string;
        risks?: string[];
        notThis?: string;
        painIds?: string[];
    }[];
    pickedShiftIds?: string[];
    createdAt?: string;
    updatedAt?: string;
}, {
    id?: string;
    context?: {
        vertical?: string;
        buyerRole?: string;
        systemAge?: string;
        stackHints?: string[];
        constraints?: string[];
        notes?: string;
    };
    pains?: {
        id?: string;
        statement?: string;
        grain?: "micro" | "meso" | "macro";
        category?: string;
        suggestedEvidence?: string;
        evidence?: string;
        severity?: "blocking" | "costly" | "annoying";
        validated?: boolean;
        parentMacroId?: string;
    }[];
    shifts?: {
        id?: string;
        patternId?: string;
        title?: string;
        assumptionBroken?: string;
        approach?: string;
        deliverable?: string;
        scope?: string;
        risks?: string[];
        notThis?: string;
        painIds?: string[];
    }[];
    pickedShiftIds?: string[];
    createdAt?: string;
    updatedAt?: string;
}>;
export declare const PainLibraryEntrySchema: z.ZodObject<{
    id: z.ZodString;
    statement: z.ZodString;
    grain: z.ZodEnum<["micro", "meso", "macro"]>;
    category: z.ZodString;
    suggestedEvidence: z.ZodString;
    parentMacroId: z.ZodOptional<z.ZodString>;
    contextTags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    id?: string;
    statement?: string;
    grain?: "micro" | "meso" | "macro";
    category?: string;
    suggestedEvidence?: string;
    parentMacroId?: string;
    contextTags?: string[];
}, {
    id?: string;
    statement?: string;
    grain?: "micro" | "meso" | "macro";
    category?: string;
    suggestedEvidence?: string;
    parentMacroId?: string;
    contextTags?: string[];
}>;
export declare const PainLibrarySchema: z.ZodObject<{
    vertical: z.ZodString;
    pains: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        statement: z.ZodString;
        grain: z.ZodEnum<["micro", "meso", "macro"]>;
        category: z.ZodString;
        suggestedEvidence: z.ZodString;
        parentMacroId: z.ZodOptional<z.ZodString>;
        contextTags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        id?: string;
        statement?: string;
        grain?: "micro" | "meso" | "macro";
        category?: string;
        suggestedEvidence?: string;
        parentMacroId?: string;
        contextTags?: string[];
    }, {
        id?: string;
        statement?: string;
        grain?: "micro" | "meso" | "macro";
        category?: string;
        suggestedEvidence?: string;
        parentMacroId?: string;
        contextTags?: string[];
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    vertical?: string;
    pains?: {
        id?: string;
        statement?: string;
        grain?: "micro" | "meso" | "macro";
        category?: string;
        suggestedEvidence?: string;
        parentMacroId?: string;
        contextTags?: string[];
    }[];
}, {
    vertical?: string;
    pains?: {
        id?: string;
        statement?: string;
        grain?: "micro" | "meso" | "macro";
        category?: string;
        suggestedEvidence?: string;
        parentMacroId?: string;
        contextTags?: string[];
    }[];
}>;
export declare const ParadigmPatternSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    thesis: z.ZodString;
    painGrains: z.ZodArray<z.ZodEnum<["micro", "meso", "macro"]>, "many">;
    painCategories: z.ZodArray<z.ZodString, "many">;
    contextRequirements: z.ZodArray<z.ZodString, "many">;
    deliverableTemplates: z.ZodArray<z.ZodString, "many">;
    antiPatterns: z.ZodArray<z.ZodString, "many">;
    assumptionBroken: z.ZodString;
    approachTemplate: z.ZodString;
    scopeDefault: z.ZodString;
    risks: z.ZodArray<z.ZodString, "many">;
    notThis: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id?: string;
    assumptionBroken?: string;
    risks?: string[];
    notThis?: string;
    name?: string;
    thesis?: string;
    painGrains?: ("micro" | "meso" | "macro")[];
    painCategories?: string[];
    contextRequirements?: string[];
    deliverableTemplates?: string[];
    antiPatterns?: string[];
    approachTemplate?: string;
    scopeDefault?: string;
}, {
    id?: string;
    assumptionBroken?: string;
    risks?: string[];
    notThis?: string;
    name?: string;
    thesis?: string;
    painGrains?: ("micro" | "meso" | "macro")[];
    painCategories?: string[];
    contextRequirements?: string[];
    deliverableTemplates?: string[];
    antiPatterns?: string[];
    approachTemplate?: string;
    scopeDefault?: string;
}>;
export declare const EdgeInsightSchema: z.ZodObject<{
    id: z.ZodString;
    title: z.ZodString;
    technique: z.ZodString;
    whyUnexpected: z.ZodString;
    howItApplies: z.ZodString;
    searchTopics: z.ZodArray<z.ZodString, "many">;
    caution: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    id?: string;
    title?: string;
    technique?: string;
    whyUnexpected?: string;
    howItApplies?: string;
    searchTopics?: string[];
    caution?: string;
}, {
    id?: string;
    title?: string;
    technique?: string;
    whyUnexpected?: string;
    howItApplies?: string;
    searchTopics?: string[];
    caution?: string;
}>;
export declare const ExampleTreeNodeSchema: z.ZodType<ExampleTreeNode>;
export declare const ExampleResolutionSchema: z.ZodObject<{
    primaryPatternId: z.ZodString;
    alternatePatternIds: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    title: z.ZodString;
    assumptionBroken: z.ZodString;
    approach: z.ZodString;
    deliverable: z.ZodString;
    scope: z.ZodString;
    notThis: z.ZodString;
    edgeInsights: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        title: z.ZodString;
        technique: z.ZodString;
        whyUnexpected: z.ZodString;
        howItApplies: z.ZodString;
        searchTopics: z.ZodArray<z.ZodString, "many">;
        caution: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        id?: string;
        title?: string;
        technique?: string;
        whyUnexpected?: string;
        howItApplies?: string;
        searchTopics?: string[];
        caution?: string;
    }, {
        id?: string;
        title?: string;
        technique?: string;
        whyUnexpected?: string;
        howItApplies?: string;
        searchTopics?: string[];
        caution?: string;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    title?: string;
    assumptionBroken?: string;
    approach?: string;
    deliverable?: string;
    scope?: string;
    notThis?: string;
    primaryPatternId?: string;
    alternatePatternIds?: string[];
    edgeInsights?: {
        id?: string;
        title?: string;
        technique?: string;
        whyUnexpected?: string;
        howItApplies?: string;
        searchTopics?: string[];
        caution?: string;
    }[];
}, {
    title?: string;
    assumptionBroken?: string;
    approach?: string;
    deliverable?: string;
    scope?: string;
    notThis?: string;
    primaryPatternId?: string;
    alternatePatternIds?: string[];
    edgeInsights?: {
        id?: string;
        title?: string;
        technique?: string;
        whyUnexpected?: string;
        howItApplies?: string;
        searchTopics?: string[];
        caution?: string;
    }[];
}>;
export declare const PainExampleSchema: z.ZodObject<{
    id: z.ZodString;
    title: z.ZodString;
    vagueProblem: z.ZodString;
    vertical: z.ZodString;
    contextHints: z.ZodObject<{
        buyerRole: z.ZodString;
        systemAge: z.ZodOptional<z.ZodString>;
        stackHints: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        constraints: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        notes: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        buyerRole?: string;
        systemAge?: string;
        stackHints?: string[];
        constraints?: string[];
        notes?: string;
    }, {
        buyerRole?: string;
        systemAge?: string;
        stackHints?: string[];
        constraints?: string[];
        notes?: string;
    }>;
    root: z.ZodType<ExampleTreeNode, z.ZodTypeDef, ExampleTreeNode>;
    resolution: z.ZodObject<{
        primaryPatternId: z.ZodString;
        alternatePatternIds: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        title: z.ZodString;
        assumptionBroken: z.ZodString;
        approach: z.ZodString;
        deliverable: z.ZodString;
        scope: z.ZodString;
        notThis: z.ZodString;
        edgeInsights: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            title: z.ZodString;
            technique: z.ZodString;
            whyUnexpected: z.ZodString;
            howItApplies: z.ZodString;
            searchTopics: z.ZodArray<z.ZodString, "many">;
            caution: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            id?: string;
            title?: string;
            technique?: string;
            whyUnexpected?: string;
            howItApplies?: string;
            searchTopics?: string[];
            caution?: string;
        }, {
            id?: string;
            title?: string;
            technique?: string;
            whyUnexpected?: string;
            howItApplies?: string;
            searchTopics?: string[];
            caution?: string;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        title?: string;
        assumptionBroken?: string;
        approach?: string;
        deliverable?: string;
        scope?: string;
        notThis?: string;
        primaryPatternId?: string;
        alternatePatternIds?: string[];
        edgeInsights?: {
            id?: string;
            title?: string;
            technique?: string;
            whyUnexpected?: string;
            howItApplies?: string;
            searchTopics?: string[];
            caution?: string;
        }[];
    }, {
        title?: string;
        assumptionBroken?: string;
        approach?: string;
        deliverable?: string;
        scope?: string;
        notThis?: string;
        primaryPatternId?: string;
        alternatePatternIds?: string[];
        edgeInsights?: {
            id?: string;
            title?: string;
            technique?: string;
            whyUnexpected?: string;
            howItApplies?: string;
            searchTopics?: string[];
            caution?: string;
        }[];
    }>;
}, "strip", z.ZodTypeAny, {
    id?: string;
    vertical?: string;
    title?: string;
    vagueProblem?: string;
    contextHints?: {
        buyerRole?: string;
        systemAge?: string;
        stackHints?: string[];
        constraints?: string[];
        notes?: string;
    };
    root?: ExampleTreeNode;
    resolution?: {
        title?: string;
        assumptionBroken?: string;
        approach?: string;
        deliverable?: string;
        scope?: string;
        notThis?: string;
        primaryPatternId?: string;
        alternatePatternIds?: string[];
        edgeInsights?: {
            id?: string;
            title?: string;
            technique?: string;
            whyUnexpected?: string;
            howItApplies?: string;
            searchTopics?: string[];
            caution?: string;
        }[];
    };
}, {
    id?: string;
    vertical?: string;
    title?: string;
    vagueProblem?: string;
    contextHints?: {
        buyerRole?: string;
        systemAge?: string;
        stackHints?: string[];
        constraints?: string[];
        notes?: string;
    };
    root?: ExampleTreeNode;
    resolution?: {
        title?: string;
        assumptionBroken?: string;
        approach?: string;
        deliverable?: string;
        scope?: string;
        notThis?: string;
        primaryPatternId?: string;
        alternatePatternIds?: string[];
        edgeInsights?: {
            id?: string;
            title?: string;
            technique?: string;
            whyUnexpected?: string;
            howItApplies?: string;
            searchTopics?: string[];
            caution?: string;
        }[];
    };
}>;
//# sourceMappingURL=schemas.d.ts.map