# AGENTS.md

Guidance for coding agents working in this repository. Humans should start with
[README.md](README.md); everything here is additional context an agent needs to
make a change that fits.

## Project overview

`@formulavize/compiler-frontend-fiz` is the compiler frontend for the **fiz**
DSL: source text to a normalized AST to a `Dag`. It is renderer-neutral and
knows nothing about how a dag is drawn. Its main consumer is
[editor-formulavize](https://github.com/anthologen/editor-formulavize); it was
extracted from that repo with its history intact.

Layout:

- `src/` — the compiler, one flat directory of modules
- `tests/unit/` — Vitest unit tests
- `dist/` — build output (ESM + `.d.ts`), generated, not committed

## Setup

Node.js >= 26 and pnpm >= 12. `npm` and `yarn` are refused by a `preinstall`
hook — use pnpm.

```sh
pnpm install
```

## Build and test commands

```sh
pnpm build         # tsc -p tsconfig.build.json -> dist/ (ESM + .d.ts)
pnpm test          # Run Vitest unit tests
pnpm test:watch    # Run Vitest in watch mode
pnpm test:format   # Check Prettier formatting
pnpm format        # Auto-fix formatting
pnpm all           # build then test
```

Run a single test file:

```sh
pnpm vitest run tests/unit/dagFactory.test.ts
```

Before handing work back, run `pnpm all` and `pnpm test:format` — that is what
CI runs on every PR.

## Architecture

```
fiz source code
  → [Lezer parser via @formulavize/lang-fiz]  →  Lezer syntax tree
  → [astFactory.ts]                           →  RecipeTreeNode (normalized AST)
  → [dagFactory.ts]                           →  Dag (directed acyclic graph)
```

### Compiler pipeline (`src/`)

- **driver.ts** — `Compiler` class; entry points `compileFromEditor()` and
  `compileFromSource()`; returns a `Compilation` (AST + DAG + errors). Every
  compile starts a fresh import chain, and there is no recursive entry point: a
  nested import descends inside `dagFactory`, which extends the chain there
- **parser.ts** — source text to AST, for the editor (which already holds an
  incrementally parsed tree) and for everything else (a string). Both are pure,
  which is what lets `importCacher` memoize a recipe's parse without reaching
  back into the `Compiler`
- **astFactory.ts** — Walks Lezer parse tree to produce `RecipeTreeNode` hierarchy
- **ast.ts** — AST node types: `RecipeTreeNode`, `CallTreeNode`, `AssignmentTreeNode`, `NamespaceTreeNode`; visitor pattern via `BaseTreeNode`
- **dagFactory.ts** — Transforms AST into a `Dag`; handles variable resolution,
  imports, namespaces, and style bindings. Every diagnostic leaves through
  `reportError`, which positions it at the node it came from, collects it for
  the editor and echoes it to the console — at `console.error` for an
  `ErrorSource.Internal` (the compiler is confused and nothing in the editor
  would say so) and `console.debug` otherwise (the recipe is wrong and the
  editor already shows it). Report sites pass a source, never a log level
- **dag.ts** — `Dag` data structure with `DagNode`/`DagEdge`; supports nested DAGs for namespaces; parent-child lineage tracking
- **compilationErrors.ts** — `CompilationError`, `ErrorSource`, `ErrorCode`,
  `ImportError`, and `describeError`, the one place a value thrown by a
  non-compiler layer (a fetch, a file read) is turned into a message. Modules
  that alias `CompilationError as Error` cannot name the built-in `Error`
  without `globalThis`, which is why that helper lives here rather than beside
  any one caller — call it instead of re-rolling
  `x instanceof Error ? x.message : ...`. The same aliasing is why `ImportError`
  is declared here too: it extends the built-in `Error`, which this module can
  name and its callers cannot, and it sits beside the `ErrorCode` it carries
  rather than in the transport or the cache, both of which raise it
- **importCacher.ts** — Caches fetched fiz imports as _parsed recipes_, never as
  compiled dags. What a location holds does not depend on who asked for it, and
  neither does the tree that text parses to, so one cache covers both and nothing
  in it is conditional on an import chain. A dag is a different matter — its ids
  and nesting belong to the site that imported it — so each import site builds its
  own from the cached parse (`dagFactory`'s `getImportedDag`), which is why two
  sites importing one package get distinct ids rather than two subgraphs that
  collide. A `ParseResult` rather than a bare AST is cached so an imported file's
  parse errors still reach the diagnostic reported against the import statement.
  Failed entries are evicted, so one network blip is not permanent, but only while
  the failed promise is still the cached one — a `clearCache()` or a newer
  request may have replaced it since. `getCachedAst` is the read-only
  counterpart, for the import dump and the completion index: it never fetches and
  never rejects, so a miss and a failed import both read as `undefined` and no
  caller needs a `.catch` (its signature is exactly the `ImportedASTLookup` the
  consumer's autocomplete factory asks for). `ImportResolver` is what
  `dagFactory` actually holds: one function for a whole compile, taking a
  location _and_ the import chain the request sits on, and returning the
  parser's own `ParseResult` rather than a wrapper that also has to carry a
  resolver for the next level down.
  Extending the chain belongs to whoever descends into an import, which is
  `dagFactory`'s `getImportedDag` and nowhere else. This is also where the
  circular-import check lives, not because the cache needs it — nothing cached is
  conditional on the chain — but so that a cycle rejects with `ImportError` like
  every other way an import can fail, and `dagFactory` turns all of them into one
  positioned diagnostic in one place instead of reporting a cycle by a second
  mechanism. `ImportError` carries the `ErrorCode` that `dagFactory` reports.
  Nothing here walks the import graph: a cacher answers for one location at a
  time, and the only traversals are the caller's chain and `importUtility`'s dump
  over what is already cached, so no read path can trigger a fetch for a package
  nobody imported
- **importFetcher.ts** — How an import location becomes recipe text, with no
  memory of what it has already read: the injectable `FetchSourceFn` and the
  default `fetchSourceOverHttp`, which fetches under a single deadline covering
  the body as well as the headers (the fetch signal stays attached until the
  body is fully read, so a stall after the headers arrive is the same failure as
  one before them and is reported through the same `makeFetchError`; a size cap
  names itself and passes through unwrapped), caps the body (streaming it so an
  undeclared huge response is cut off before it is buffered), and checks the
  content type
  (`assertFizContentType`), lowercasing the header once up front so the HTML
  rejection and the allow-list cannot disagree about a `TEXT/HTML`. A host that
  needs imports resolved off a filesystem passes its own `FetchSourceFn`
  (`editor-formulavize`'s CLI does, so relative imports resolve against the
  recipe's own directory); `node:fs` must stay out of this package entirely.
  `hasFizExtension` is exported from here, beside `assertFizContentType`, so the
  two "could this be a fiz file" checks cannot drift — but it is `importCacher`
  that calls it, because the check has to run before the cache is probed so no
  unvalidated key is ever looked up

## Package boundary

These are the constraints most likely to be broken by a well-meaning change:

- **No renderer vocabulary.** Cytoscape style property names, layout keys and
  selector maps belong to the renderer, in `editor-formulavize`. `constants.ts`
  holds only what the compiler itself gives meaning to, plus a couple of empty
  seed lists (`ABOUT_NOTE_NAMES`, `ABOUT_NOTE_KEYS`) the editor reads for
  suggestions.
- **No Vue, no DOM, no `node:*`.** The one platform touch is global `fetch` in
  `importFetcher.ts`, and it is behind `FetchSourceFn`.
- **`@codemirror/*` and `@lezer/common` are peerDependencies**, so the host
  supplies exactly one copy. Two copies break `instanceof` on `Tree` and
  `TreeCursor`. `@codemirror/state` is needed even off-editor: `Text` is the
  source rope used for position → line/column mapping.
- **`errorReporter.ts` is the only presentation-shaped module** — it maps a
  `CompilationError` to a `@codemirror/lint` `Diagnostic` and formats
  human-readable reports. Both its imports are type-only.

## Code style

TypeScript in strict mode; Prettier with default settings owns formatting, so
run `pnpm format` rather than hand-aligning anything.

Source modules live flat in `src/` and import each other **relatively**
(`./ast`, `./dag`). Keep it that way: `tsconfig.build.json` clears `paths`
because emitted JavaScript cannot carry a path alias.

`src/index.ts` is a barrel re-exporting every module. Consumers may use it or
the per-module subpath exports; the editor uses the subpaths. A new module in
`src/` belongs in that barrel.

## Testing instructions

Tests live in `tests/unit/` and import through the `src/*` alias
(`src/dagFactory`), declared in both `tsconfig.json` and `vite.config.ts`.

Add or update tests alongside any behavior change, and keep `pnpm test` green
before handing work back.

## Commit and PR guidelines

Commits follow [conventional commit](https://www.conventionalcommits.org)
format, which is what release-please reads to propose version bumps. CI runs
build and tests on every PR.

## Publishing

Published manually, like the sibling `lang-fiz` and `lezer-fiz` packages:

```sh
pnpm install && pnpm build && pnpm test
pnpm publish --access public
```

release-please opens the version-bump PR; the publish itself is a human step.
`editor-formulavize` consumes the published version from the registry, not a
workspace link, so a change here is only visible there after a publish (or via
the pnpm store overlay trick used for local grammar iteration).
