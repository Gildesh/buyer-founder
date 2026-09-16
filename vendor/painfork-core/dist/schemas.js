import { z } from "zod";
export const PainGrainSchema = z.enum(["micro", "meso", "macro"]);
export const SeveritySchema = z.enum(["blocking", "costly", "annoying"]);
export const PainSchema = z.object({
    id: z.string().min(1),
    statement: z.string().min(1),
    grain: PainGrainSchema,
    category: z.string().min(1),
    suggestedEvidence: z.string().optional(),
    evidence: z.string().optional(),
    severity: SeveritySchema.optional(),
    validated: z.boolean(),
    parentMacroId: z.string().optional(),
});
export const ContextSchema = z.object({
    vertical: z.string().min(1),
    buyerRole: z.string().min(1),
    systemAge: z.string().optional(),
    stackHints: z.array(z.string()),
    constraints: z.array(z.string()),
    notes: z.string().optional(),
});
export const ParadigmShiftSchema = z.object({
    id: z.string().min(1),
    patternId: z.string().min(1),
    title: z.string().min(1),
    assumptionBroken: z.string().min(1),
    approach: z.string().min(1),
    deliverable: z.string().min(1),
    scope: z.string().min(1),
    risks: z.array(z.string()),
    notThis: z.string().min(1),
    painIds: z.array(z.string()),
});
export const WedgeSchema = z.object({
    context: ContextSchema,
    pains: z.array(PainSchema),
    shifts: z.array(ParadigmShiftSchema),
    pitch: z.string().min(1),
    exportedAt: z.string(),
});
export const SessionSchema = z.object({
    id: z.string().min(1),
    context: ContextSchema.optional(),
    pains: z.array(PainSchema),
    shifts: z.array(ParadigmShiftSchema),
    pickedShiftIds: z.array(z.string()),
    createdAt: z.string(),
    updatedAt: z.string(),
});
export const PainLibraryEntrySchema = z.object({
    id: z.string().min(1),
    statement: z.string().min(1),
    grain: PainGrainSchema,
    category: z.string().min(1),
    suggestedEvidence: z.string().min(1),
    parentMacroId: z.string().optional(),
    contextTags: z.array(z.string()).optional(),
});
export const PainLibrarySchema = z.object({
    vertical: z.string().min(1),
    pains: z.array(PainLibraryEntrySchema),
});
export const ParadigmPatternSchema = z.object({
    id: z.string().min(1),
    name: z.string().min(1),
    thesis: z.string().min(1),
    painGrains: z.array(PainGrainSchema),
    painCategories: z.array(z.string()),
    contextRequirements: z.array(z.string()),
    deliverableTemplates: z.array(z.string()),
    antiPatterns: z.array(z.string()),
    assumptionBroken: z.string().min(1),
    approachTemplate: z.string().min(1),
    scopeDefault: z.string().min(1),
    risks: z.array(z.string()),
    notThis: z.string().min(1),
});
export const EdgeInsightSchema = z.object({
    id: z.string().min(1),
    title: z.string().min(1),
    technique: z.string().min(1),
    whyUnexpected: z.string().min(1),
    howItApplies: z.string().min(1),
    searchTopics: z.array(z.string()),
    caution: z.string().optional(),
});
export const ExampleTreeNodeSchema = z.lazy(() => z.object({
    id: z.string().min(1),
    grain: PainGrainSchema,
    category: z.string().optional(),
    label: z.string().min(1),
    statement: z.string().min(1),
    dissect: z.string().optional(),
    painId: z.string().optional(),
    evidence: z.string().optional(),
    severity: SeveritySchema.optional(),
    children: z.array(ExampleTreeNodeSchema).optional(),
}));
export const ExampleResolutionSchema = z.object({
    primaryPatternId: z.string().min(1),
    alternatePatternIds: z.array(z.string()).optional(),
    title: z.string().min(1),
    assumptionBroken: z.string().min(1),
    approach: z.string().min(1),
    deliverable: z.string().min(1),
    scope: z.string().min(1),
    notThis: z.string().min(1),
    edgeInsights: z.array(EdgeInsightSchema),
});
export const PainExampleSchema = z.object({
    id: z.string().min(1),
    title: z.string().min(1),
    vagueProblem: z.string().min(1),
    vertical: z.string().min(1),
    contextHints: z.object({
        buyerRole: z.string().min(1),
        systemAge: z.string().optional(),
        stackHints: z.array(z.string()).optional(),
        constraints: z.array(z.string()).optional(),
        notes: z.string().optional(),
    }),
    root: ExampleTreeNodeSchema,
    resolution: ExampleResolutionSchema,
});
//# sourceMappingURL=schemas.js.map