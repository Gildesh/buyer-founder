import type { ParadigmPattern } from "../types.js";

export const PARADIGM_PATTERNS: ParadigmPattern[] = [
  {
    id: "strangler-facade",
    name: "Strangler Facade",
    thesis: "Put a new surface in front of the old core and migrate one slice at a time.",
    painGrains: ["meso", "macro"],
    painCategories: ["interface", "cutover", "visibility"],
    contextRequirements: ["legacy-core"],
    deliverableTemplates: [
      "Facade API spec + routing map for {painStatement}",
      "One-slice cutover runbook for {painStatement}",
      "Shadow traffic report comparing old vs facade path",
    ],
    antiPatterns: ["no-legacy-core", "greenfield-only"],
    assumptionBroken:
      "Modernization must replace the entire system before anything ships.",
    approachTemplate:
      "Stand up a thin facade that owns one workflow touching {painStatement}. Route new consumers to the facade while the legacy core stays in place behind it. Migrate read or write paths incrementally with explicit rollback switches.",
    scopeDefault: "3 weeks",
    risks: [
      "Facade becomes a permanent integration hairball if boundaries are not enforced.",
      "Dual-write periods need clear ownership and monitoring.",
    ],
    notThis: "Not a full replatform or big-bang cutover.",
  },
  {
    id: "screen-map-api",
    name: "Screen Map to API",
    thesis: "Map terminal or green-screen workflows to HTTP APIs without touching the database schema.",
    painGrains: ["micro", "meso"],
    painCategories: ["interface", "performance"],
    contextRequirements: ["terminal"],
    deliverableTemplates: [
      "Screen-to-API map for {painStatement}",
      "HTTP contract + example payloads for one operator workflow",
      "Pilot integration guide for {painStatement}",
    ],
    antiPatterns: ["no-terminal", "api-already-exists"],
    assumptionBroken:
      "You must refactor the database before any digital channel can access legacy data.",
    approachTemplate:
      "Document each screen field and transaction sequence tied to {painStatement}. Expose a read or command API that mirrors the terminal flow without schema surgery. Pilot with one downstream consumer before widening access.",
    scopeDefault: "2 weeks",
    risks: [
      "Screen flows may encode hidden validation that is easy to miss in mapping.",
      "Terminal emulation dependencies can add latency.",
    ],
    notThis: "Not a database migration or UI rewrite.",
  },
  {
    id: "shadow-compare",
    name: "Shadow Compare",
    thesis: "Run the new path parallel to production and diff outputs before any cutover.",
    painGrains: ["meso", "macro"],
    painCategories: ["cutover", "performance", "interface"],
    contextRequirements: ["legacy-core"],
    deliverableTemplates: [
      "Shadow comparison report for {painStatement}",
      "Diff dashboard spec + acceptance thresholds",
      "Cutover readiness checklist for {painStatement}",
    ],
    antiPatterns: ["no-production-traffic"],
    assumptionBroken:
      "You can only validate a migration in a one-shot production cutover.",
    approachTemplate:
      "Replay or mirror traffic for {painStatement} through a parallel path. Compare outputs, latency, and side effects daily. Cut over only when diffs stay within agreed thresholds for a full business cycle.",
    scopeDefault: "3 weeks",
    risks: [
      "Shadow infra cost if traffic volume is high.",
      "False positives from timing or rounding differences need tuning.",
    ],
    notThis: "Not a production cutover on day one.",
  },
  {
    id: "documentation-archaeology",
    name: "Documentation Archaeology",
    thesis: "Map tables, jobs, fields, and dependencies into a cutover-options document.",
    painGrains: ["micro", "meso", "macro"],
    painCategories: ["knowledge", "schema", "compliance"],
    contextRequirements: [],
    deliverableTemplates: [
      "Data dictionary + dependency map for {painStatement}",
      "Cutover options memo with three bounded paths",
      "Field lineage appendix for audit on {painStatement}",
    ],
    antiPatterns: ["documentation-complete"],
    assumptionBroken:
      "Teams must start coding before anyone documents what the legacy system actually does.",
    approachTemplate:
      "Interview operators and trace {painStatement} through tables, jobs, and integrations. Produce a cited map of entities, owners, and blast radius. End with three scoped cutover options leadership can fund.",
    scopeDefault: "2 weeks",
    risks: [
      "Discovery may surface political ownership disputes.",
      "Incomplete logs extend interview time.",
    ],
    notThis: "Not implementation or a migration project plan spanning years.",
  },
  {
    id: "analytics-escape",
    name: "Analytics Escape",
    thesis: "Land data in a warehouse or lake first; defer transactional migration.",
    painGrains: ["meso", "macro"],
    painCategories: ["performance", "visibility"],
    contextRequirements: ["reporting"],
    deliverableTemplates: [
      "Lake/warehouse ingest design for {painStatement}",
      "Curated dataset + refresh SLA for leadership views",
      "Transactional cutover deferral memo",
    ],
    antiPatterns: ["no-reporting-pain"],
    assumptionBroken:
      "Reporting modernization must wait until the transactional core is replaced.",
    approachTemplate:
      "Extract the datasets behind {painStatement} into a governed analytics layer. Ship the reports leadership actually asks for while the transactional system keeps running. Defer core replacement until read pain is solved.",
    scopeDefault: "3 weeks",
    risks: [
      "Source drift if extracts are not monitored.",
      "Dual definitions if warehouse models diverge from ops truth.",
    ],
    notThis: "Not replacing the transactional write path.",
  },
  {
    id: "read-path-modern",
    name: "Read Path Modern",
    thesis: "Stand up a replica or indexed view for one report or screen without moving writes.",
    painGrains: ["micro", "meso"],
    painCategories: ["performance"],
    contextRequirements: ["db"],
    deliverableTemplates: [
      "Indexed view or replica design for {painStatement}",
      "Before/after latency benchmark for target report",
      "Ops runbook for refresh and failover",
    ],
    antiPatterns: ["write-path-only", "no-db"],
    assumptionBroken:
      "Slow reads require rewriting application code or replacing the database.",
    approachTemplate:
      "Target the specific access pattern behind {painStatement}. Add indexes, materialized views, or a read replica dedicated to that workload. Keep writes on the legacy path until a separate initiative owns them.",
    scopeDefault: "2 weeks",
    risks: [
      "Replica lag can surface stale reads if SLAs are tight.",
      "Index changes may affect write performance on small cores.",
    ],
    notThis: "Not a general caching layer or full data platform build.",
  },
  {
    id: "bounded-module-cutover",
    name: "Bounded Module Cutover",
    thesis: "Migrate one bounded context end-to-end with explicit in and out of scope.",
    painGrains: ["meso", "macro"],
    painCategories: ["cutover", "interface"],
    contextRequirements: ["module-boundary"],
    deliverableTemplates: [
      "Module boundary charter for {painStatement}",
      "End-to-end migration plan for one bounded workflow",
      "Rollback and verification script pack",
    ],
    antiPatterns: ["fuzzy-boundary"],
    assumptionBroken:
      "Partial migrations always leak into adjacent modules and never finish.",
    approachTemplate:
      "Draw a hard boundary around the workflow tied to {painStatement}. Migrate that module's reads, writes, and integrations as one package. Adjacent modules stay on legacy interfaces with documented stubs.",
    scopeDefault: "4 weeks",
    risks: [
      "Hidden cross-module calls blow the boundary.",
      "Rollback complexity if shared reference data changes.",
    ],
    notThis: "Not enterprise-wide modernization or multi-module scope.",
  },
  {
    id: "residue-to-queryable",
    name: "Residue to Queryable",
    thesis: "Turn unstructured or messy corpora into searchable, cited extracts.",
    painGrains: ["meso", "macro"],
    painCategories: ["knowledge", "compliance"],
    contextRequirements: ["documents"],
    deliverableTemplates: [
      "Searchable corpus index for {painStatement}",
      "Cited extract pack for audit or ops questions",
      "Governance rules for updates and retention",
    ],
    antiPatterns: ["structured-source-of-truth"],
    assumptionBroken:
      "Legacy knowledge must be manually re-read every time someone asks a question.",
    approachTemplate:
      "Ingest the document residue behind {painStatement}. Chunk, index, and cite sources so operators can answer audit or ops questions in minutes. Keep human review on high-risk citations before external use.",
    scopeDefault: "2 weeks",
    risks: [
      "OCR or scan quality can reduce citation accuracy.",
      "Sensitive content needs access controls before indexing.",
    ],
    notThis: "Not a full knowledge management program or LLM chatbot rollout.",
  },
];

export function getPatternById(id: string): ParadigmPattern | undefined {
  return PARADIGM_PATTERNS.find((p) => p.id === id);
}
