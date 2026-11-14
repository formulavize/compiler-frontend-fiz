// Root entry point. Every module is also reachable individually through the
// package's wildcard subpath export (e.g. ".../dag", ".../ast"), which is how
// the editor imports them; this barrel is the convenience entry for anything
// that just wants the whole compiler frontend.

export * from "./ast.js";
export * from "./astFactory.js";
export * from "./astUtility.js";
export * from "./compilation.js";
export * from "./compilationErrors.js";
export * from "./constants.js";
export * from "./dag.js";
export * from "./dagFactory.js";
export * from "./driver.js";
export * from "./errorReporter.js";
export * from "./importCacher.js";
export * from "./importFetcher.js";
export * from "./importUtility.js";
export * from "./parser.js";
export * from "./syntaxChecks.js";

// ast.ts and dag.ts each declare their own `QualifiableIdentifier`
// (both `string[]`), so a plain star export of the two is ambiguous.
// The subpath exports keep them distinct; the barrel has to pick one.
export type { QualifiableIdentifier } from "./ast.js";
