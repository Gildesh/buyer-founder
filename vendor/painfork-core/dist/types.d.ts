export type PainGrain = "micro" | "meso" | "macro";
export type Severity = "blocking" | "costly" | "annoying";
export type Pain = {
    id: string;
    statement: string;
    grain: PainGrain;
    category: string;
    suggestedEvidence?: string;
    evidence?: string;
    severity?: Severity;
    validated: boolean;
    parentMacroId?: string;
};
export type Context = {
    vertical: string;
    buyerRole: string;
    systemAge?: string;
    stackHints: string[];
    constraints: string[];
    notes?: string;
};
export type ParadigmShift = {
    id: string;
    patternId: string;
    title: string;
    assumptionBroken: string;
    approach: string;
    deliverable: string;
    scope: string;
    risks: string[];
    notThis: string;
    painIds: string[];
};
export type Wedge = {
    context: Context;
    pains: Pain[];
    shifts: ParadigmShift[];
    pitch: string;
    exportedAt: string;
};
export type Session = {
    id: string;
    context?: Context;
    pains: Pain[];
    shifts: ParadigmShift[];
    pickedShiftIds: string[];
    createdAt: string;
    updatedAt: string;
};
export type PainLibraryEntry = {
    id: string;
    statement: string;
    grain: PainGrain;
    category: string;
    suggestedEvidence: string;
    parentMacroId?: string;
    contextTags?: string[];
};
export type PainLibrary = {
    vertical: string;
    pains: PainLibraryEntry[];
};
export type ParadigmPattern = {
    id: string;
    name: string;
    thesis: string;
    painGrains: PainGrain[];
    painCategories: string[];
    contextRequirements: string[];
    deliverableTemplates: string[];
    antiPatterns: string[];
    assumptionBroken: string;
    approachTemplate: string;
    scopeDefault: string;
    risks: string[];
    notThis: string;
};
export type PatternMatchReason = {
    patternId: string;
    score: number;
    reasons: string[];
};
export type ExampleTreeNode = {
    id: string;
    grain: PainGrain;
    category?: string;
    label: string;
    statement: string;
    dissect?: string;
    painId?: string;
    evidence?: string;
    severity?: Severity;
    children?: ExampleTreeNode[];
};
export type EdgeInsight = {
    id: string;
    title: string;
    technique: string;
    whyUnexpected: string;
    howItApplies: string;
    searchTopics: string[];
    caution?: string;
};
export type ExampleResolution = {
    primaryPatternId: string;
    alternatePatternIds?: string[];
    title: string;
    assumptionBroken: string;
    approach: string;
    deliverable: string;
    scope: string;
    notThis: string;
    edgeInsights: EdgeInsight[];
};
export type PainExample = {
    id: string;
    title: string;
    vagueProblem: string;
    vertical: string;
    contextHints: {
        buyerRole: string;
        systemAge?: string;
        stackHints?: string[];
        constraints?: string[];
        notes?: string;
    };
    root: ExampleTreeNode;
    resolution: ExampleResolution;
};
//# sourceMappingURL=types.d.ts.map