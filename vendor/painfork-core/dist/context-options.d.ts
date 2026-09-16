export type VerticalOption = {
    id: string;
    label: string;
    description: string;
};
export type ContextOptions = {
    verticals: VerticalOption[];
    buyerRoles: string[];
    systemAges: string[];
    stackHints: string[];
    constraints: string[];
    notePrompts: string[];
};
export declare function getContextOptions(): ContextOptions;
export declare function listVerticalOptions(): VerticalOption[];
export declare function getVerticalLabel(id: string): string;
export declare function parseCommaList(value: string): string[];
export declare function toggleCommaItem(current: string, item: string): string;
export declare function appendNote(current: string, prompt: string): string;
//# sourceMappingURL=context-options.d.ts.map