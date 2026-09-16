import type { Context, Pain, ParadigmPattern, PatternMatchReason } from "./types.js";
export declare function getValidatedPains(pains: Pain[]): Pain[];
export declare function canFork(pains: Pain[]): boolean;
export declare function canValidateMore(pains: Pain[]): boolean;
export declare function validatePain(pains: Pain[], painId: string, evidence: string, severity: Pain["severity"]): Pain[];
export declare function scorePatternForPain(pattern: ParadigmPattern, pain: Pain, context?: Context): PatternMatchReason | null;
export declare function matchPatternsForPain(pain: Pain, context?: Context): PatternMatchReason[];
export declare function generateShiftsForPain(pain: Pain, context?: Context, maxShifts?: number): import("./types.js").ParadigmShift[];
export declare function forkAll(pains: Pain[], context?: Context): import("./types.js").ParadigmShift[];
//# sourceMappingURL=fork-engine.d.ts.map