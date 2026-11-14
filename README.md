# compiler-frontend-fiz

Compiler frontend for the **fiz** language that turns fiz recipe source code
into a normalized AST and then into a DAG, collecting diagnostics along the way.
It is not responsible for drawing the DAG.

```
fiz source  →  [parser]      →  Lezer syntax tree
            →  [astFactory]  →  RecipeTreeNode  (normalized AST)
            →  [dagFactory]  →  Dag             (directed acyclic graph)
```

Published as `@formulavize/compiler-frontend-fiz` and consumed by
[editor-formulavize](https://github.com/anthologen/editor-formulavize).

## Usage

```ts
import { Compiler } from "@formulavize/compiler-frontend-fiz/driver";

const compilation = await new Compiler().compileFromSource(source);
compilation.DAG; // Dag
compilation.AST; // RecipeTreeNode
compilation.Errors; // CompilationError[]
```

Every module is reachable on its own subpath (`/dag`, `/ast`, `/constants`,
`/compilationErrors`, …), or all at once from the package root.

`compileFromEditor(editorState)` is the incremental counterpart for a
CodeMirror editor, which already holds a parsed tree.

Imports are read through an injectable `FetchSourceFn`
(`CompilerOptions.fetchSource`), defaulting to HTTP. Pass your own to resolve
imports off a filesystem — `node:fs` is deliberately omitted from this package.

## Peer dependencies

`@codemirror/state`, `@codemirror/language`, `@codemirror/lint`,
`@lezer/common` and `@formulavize/lang-fiz` are **peers**, not dependencies, so
a host application supplies exactly one copy of each. Two resolved copies of
`@lezer/common` or `@codemirror/state` would break the `instanceof` checks on
`Tree` and `TreeCursor`.

`@codemirror/state` is a runtime peer even outside an editor: `Text` is used as
the source rope for position → line/column mapping.

## Development

```sh
pnpm install
pnpm build    # tsc -> dist/ (ESM + .d.ts)
pnpm test     # vitest
pnpm all      # build then test
```
