import type { ExampleTreeNode, PainExample, Session } from "./types.js";
export declare function listExamples(): PainExample[];
export declare function getExampleById(id: string): PainExample | undefined;
export declare function collectExampleLeaves(node: ExampleTreeNode): ExampleTreeNode[];
export declare function collectValidatedLeaves(node: ExampleTreeNode): ExampleTreeNode[];
export declare function selectLeavesForValidation(node: ExampleTreeNode, max?: number): ExampleTreeNode[];
export declare function applyExampleToSession(session: Session, exampleId: string): Session;
//# sourceMappingURL=examples.d.ts.map