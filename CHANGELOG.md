# Changelog

## 1.0.0 (2026-11-14)


### Features

* add AboutNote support ([#79](https://github.com/formulavize/compiler-frontend-fiz/issues/79)) ([f85a113](https://github.com/formulavize/compiler-frontend-fiz/commit/f85a1131ec2c787b662dbc2dacdd864125e301c1))
* add global style binding syntax ([#52](https://github.com/formulavize/compiler-frontend-fiz/issues/52)) ([6ac8edc](https://github.com/formulavize/compiler-frontend-fiz/commit/6ac8edc2761e44f1e78c3a9f68e52fffcd540a75))
* add import view to debug mode ([#45](https://github.com/formulavize/compiler-frontend-fiz/issues/45)) ([4f6c104](https://github.com/formulavize/compiler-frontend-fiz/commit/4f6c10457158231c2bd67bab79a4b8e16fb40d32))
* add RendererDirective support ([#74](https://github.com/formulavize/compiler-frontend-fiz/issues/74)) ([1e55d87](https://github.com/formulavize/compiler-frontend-fiz/commit/1e55d87ffc4604f5aacc4891b514093a2db8c13b))
* allow import assignment ([388ba6d](https://github.com/formulavize/compiler-frontend-fiz/commit/388ba6da6b1107da2510de78021b6397430de1a4))
* **ast:** add namespace to ast ([edf707c](https://github.com/formulavize/compiler-frontend-fiz/commit/edf707ce03d4fdcbd338c5ef46704d45469f455a))
* **ast:** add VariableTreeNode as a Statement ([175c1b2](https://github.com/formulavize/compiler-frontend-fiz/commit/175c1b2c9ea2888e51a0e0a23563766a425b0072))
* **astToDag:** add import statements ([8c4c3cf](https://github.com/formulavize/compiler-frontend-fiz/commit/8c4c3cf2d51f4c5a69b1409f723312762eb1a47c))
* **autocomplete:** add imports to CompletionIndex ([afa7f1a](https://github.com/formulavize/compiler-frontend-fiz/commit/afa7f1a1f40bdb75602fbfd34c9081ebba221b43))
* **compiler:** enhance error handling and syntax checks in compiler ([#68](https://github.com/formulavize/compiler-frontend-fiz/issues/68)) ([e845d7a](https://github.com/formulavize/compiler-frontend-fiz/commit/e845d7affd5ff0001201f8dcc7ce3b47cff13032))
* **cyGraph:** add basic namespace visualization ([5074519](https://github.com/formulavize/compiler-frontend-fiz/commit/5074519da7be02f2e374d6a9a62543fcce2da0f2))
* **cyGraph:** add scoped Cytoscape StyleSheets ([42e3a80](https://github.com/formulavize/compiler-frontend-fiz/commit/42e3a80c43c2841e85f8fdca3fbaf8512f3dbc1c))
* **cyGraph:** add styling to namespaces ([e718131](https://github.com/formulavize/compiler-frontend-fiz/commit/e71813186a67c8babd017dc53aa127256626ac41))
* **cyPopperExtender:** add description poppers for dag nodes ([7f2d18c](https://github.com/formulavize/compiler-frontend-fiz/commit/7f2d18c2466c0876d75cf6805f91cd0a6fbe92be))
* **CytoscapeRenderer:** Add additional layout options to Cytoscape renderer ([#75](https://github.com/formulavize/compiler-frontend-fiz/issues/75)) ([7943cc1](https://github.com/formulavize/compiler-frontend-fiz/commit/7943cc1e3633eaa7280efe68076f6469eb434838))
* **dag:** add basic subdag to dag ([d30640a](https://github.com/formulavize/compiler-frontend-fiz/commit/d30640a508c1fc3f8ead13f882c36e6f2062b7b3))
* **dag:** add namespaces to assignment expression ([f2a8d3f](https://github.com/formulavize/compiler-frontend-fiz/commit/f2a8d3f701fdcd31cbd30b865efcc4d69f19d4ac))
* **dag:** add used imports to dag dump ([86a0408](https://github.com/formulavize/compiler-frontend-fiz/commit/86a040815572fe96055b7dbc0a0dda31a0c2192e))
* **dagFactory:** make error messages for incomplete assignments ([10d0ced](https://github.com/formulavize/compiler-frontend-fiz/commit/10d0cedbc67654145115e1d7241e531d75ec9bce))
* **dagFactory:** undefined style tag usage creates error message ([e010b5b](https://github.com/formulavize/compiler-frontend-fiz/commit/e010b5b7f188b829a676aaa6f12e5d82996605b9))
* **dag:** namespace args create incoming edges ([c48ec90](https://github.com/formulavize/compiler-frontend-fiz/commit/c48ec900c5bcf9e465a5eee97c6541ec966c4ab6))
* **dag:** recursively resolve variable names ([fb4d1e7](https://github.com/formulavize/compiler-frontend-fiz/commit/fb4d1e76b6b283d42fc581354750087bd42654e2))
* **ErrorReporter:** add error report tab to debug mode ([687e046](https://github.com/formulavize/compiler-frontend-fiz/commit/687e0460815b4d61c07ea1e0962b3859b32d9aa5))
* extract compiler frontend from editor-formulavize ([c7ebb7b](https://github.com/formulavize/compiler-frontend-fiz/commit/c7ebb7bd3c97edd8df1902c1befcb7cbd8a654a7))
* **GraphView:** add basic image export ([d15804e](https://github.com/formulavize/compiler-frontend-fiz/commit/d15804ea3cd6ad27048a811419c6c52af6f739a4))
* **GraphView:** add svg image export ([8791a4a](https://github.com/formulavize/compiler-frontend-fiz/commit/8791a4aeaf287b6093c26ea715e53b5318fe806a))
* **importer:** add import traverser for debugging ([8f62639](https://github.com/formulavize/compiler-frontend-fiz/commit/8f626395e95cb5afebac035a612ca842d1e2bb5f))
* **importer:** cli can import for local file paths ([#84](https://github.com/formulavize/compiler-frontend-fiz/issues/84)) ([5fb921c](https://github.com/formulavize/compiler-frontend-fiz/commit/5fb921c190a1d4da5503292684e63b4419236c15))
* package the extracted compiler frontend ([fc49c3d](https://github.com/formulavize/compiler-frontend-fiz/commit/fc49c3d52c731ad42df1f028e0dbf244ef4cac71))
* **rendererTypes:** renderers expose supported export formats ([d2fcb1b](https://github.com/formulavize/compiler-frontend-fiz/commit/d2fcb1b3431639aa330fbcdb1e1e8fbd5eb26420))
* StyleBinding to accept inline style properties and StringLiterals ([#43](https://github.com/formulavize/compiler-frontend-fiz/issues/43)) ([1b92f12](https://github.com/formulavize/compiler-frontend-fiz/commit/1b92f120bb45fb3b924df109fe0241fa6f751373))
* **TextEditor:** editor displays code error diagnostics ([607fca5](https://github.com/formulavize/compiler-frontend-fiz/commit/607fca52b81ef9d5f1d837ecd722ddb241fbcbbe))


### Bug Fixes

* **ast:** add qualified identifers for calls ([e04a082](https://github.com/formulavize/compiler-frontend-fiz/commit/e04a0828ce78b7e6a809c23464ce99ba366cce8f))
* **ast:** add qualified identifers for RhsVariable ([35699cc](https://github.com/formulavize/compiler-frontend-fiz/commit/35699cc3883acb6fdaa9c69ab821648042829ab0))
* **ast:** add qualified identifiers for StyleTag ([c184b81](https://github.com/formulavize/compiler-frontend-fiz/commit/c184b8123f059da432fad5173f88b9c3aa175f7e))
* **ast:** remove reference side effect in debugDumpTree ([50b70ab](https://github.com/formulavize/compiler-frontend-fiz/commit/50b70ab80cda68e2b46fab8020963fcd902269b0))
* **astToDag:** imports are processed sequentially ([9525a4b](https://github.com/formulavize/compiler-frontend-fiz/commit/9525a4be26c0279f42779d88f85d71f5ddc7db64))
* dag layout to loosely preserve insertion order ([#47](https://github.com/formulavize/compiler-frontend-fiz/issues/47)) ([3d00d20](https://github.com/formulavize/compiler-frontend-fiz/commit/3d00d2043e53cef3eed2e69822b3cd88b5121f34))
* **dag:** clarify styleTag dump format ([b9b9698](https://github.com/formulavize/compiler-frontend-fiz/commit/b9b969862c38e49191860c132896df43ac4ec636))
* **dagFactory:** add quotes around variable names in error messages ([4ea2ba5](https://github.com/formulavize/compiler-frontend-fiz/commit/4ea2ba52c7bcae5905044cbc9f85a69b7d9ada76))
* **dagFactory:** make undefined style tag errors in StyleBinding ([ca2eafb](https://github.com/formulavize/compiler-frontend-fiz/commit/ca2eafbfca15aa1143a7086b7f4c7a03854425f8))
* **dagFactory:** more concise import error message ([d2dd480](https://github.com/formulavize/compiler-frontend-fiz/commit/d2dd480ee4fa3cd56c0298f51da2d4aa47551a4d))
* **dagFactory:** undefined StyleTag errors only underline the tag ([e63819f](https://github.com/formulavize/compiler-frontend-fiz/commit/e63819f1dadf15cf57b9c8e71eda863f443cbb55))
* **dag:** variable styling respects local declaration ([fe21a00](https://github.com/formulavize/compiler-frontend-fiz/commit/fe21a005f63c9875c3f4b2d4655837f76e7caa70))
* **editorToAst:** long parse trees no longer prematurely truncated ([17eefdc](https://github.com/formulavize/compiler-frontend-fiz/commit/17eefdc414dd8a604d13613da98795fab0ccf8ab))
* **importer:** protect against circular imports ([ffbb6ac](https://github.com/formulavize/compiler-frontend-fiz/commit/ffbb6ac53530ec0b2cf3acf370f17a8078ecaf97))


### Performance Improvements

* Implement stable ID system for graph diffing to detect topological changes to trigger re-layout ([#57](https://github.com/formulavize/compiler-frontend-fiz/issues/57)) ([d29da8c](https://github.com/formulavize/compiler-frontend-fiz/commit/d29da8c9475e8c7408b4b7e5cb973c466410838e))
