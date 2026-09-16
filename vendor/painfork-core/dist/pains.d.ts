import type { Pain, PainLibrary, PainLibraryEntry, Context } from "./types.js";
export declare function loadPainLibrary(vertical: string): PainLibrary;
export declare function listVerticals(): string[];
export declare function libraryEntryToPain(entry: PainLibraryEntry): Pain;
export declare function rankPainsByContext(entries: PainLibraryEntry[], context?: Context): PainLibraryEntry[];
export declare function excavatePains(vertical: string, context?: Context): Pain[];
//# sourceMappingURL=pains.d.ts.map