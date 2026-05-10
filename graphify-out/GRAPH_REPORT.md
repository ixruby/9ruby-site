# Graph Report - 9ruby-home  (2026-05-10)

## Corpus Check
- 101 files · ~1,097,111 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 259 nodes · 221 edges · 11 communities detected
- Extraction: 96% EXTRACTED · 4% INFERRED · 0% AMBIGUOUS · INFERRED: 9 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `c2f238de`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 3|Community 3]]
- [[_COMMUNITY_Community 4|Community 4]]
- [[_COMMUNITY_Community 5|Community 5]]
- [[_COMMUNITY_Community 6|Community 6]]
- [[_COMMUNITY_Community 7|Community 7]]
- [[_COMMUNITY_Community 11|Community 11]]
- [[_COMMUNITY_Community 12|Community 12]]
- [[_COMMUNITY_Community 14|Community 14]]

## God Nodes (most connected - your core abstractions)
1. `supabaseAdmin()` - 9 edges
2. `generateMetadata()` - 5 edges
3. `generateQR()` - 5 edges
4. `renderIconPng()` - 5 edges
5. `downloadIco()` - 5 edges
6. `findIntentNode()` - 4 edges
7. `downloadBlob()` - 4 edges
8. `requireImage()` - 4 edges
9. `downloadPng()` - 4 edges
10. `parseIntentList()` - 4 edges

## Surprising Connections (you probably didn't know these)
- `GET()` --calls--> `supabaseAdmin()`  [INFERRED]
  src/app/api/quotes/route.ts → src/lib/supabase.ts
- `GET()` --calls--> `supabaseAdmin()`  [INFERRED]
  src/app/api/quotes/[slug]/route.ts → src/lib/supabase.ts
- `PATCH()` --calls--> `supabaseAdmin()`  [INFERRED]
  src/app/api/quotes/[slug]/route.ts → src/lib/supabase.ts
- `loadQuote()` --calls--> `supabaseAdmin()`  [INFERRED]
  src/app/quote/[slug]/page.tsx → src/lib/supabase.ts
- `POST()` --calls--> `computeTotals()`  [INFERRED]
  src/app/api/quotes/route.ts → src/lib/quote.ts

## Communities (91 total, 5 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.15
Nodes (13): blobFromCanvas(), downloadBlob(), downloadIco(), downloadPng(), downloadSvg(), downloadText(), generate(), loadImage() (+5 more)

### Community 1 - "Community 1"
Cohesion: 0.14
Nodes (10): computeTotals(), formatINR(), supabaseAdmin(), applyPreset(), updateItem(), GET(), POST(), loadQuote() (+2 more)

### Community 2 - "Community 2"
Cohesion: 0.17
Nodes (11): findIntentNode(), handleClick(), handlePointerOver(), readSectionIntents(), boostIntentScore(), createEmptyIntentScores(), getIntentScoreTotal(), parseIntentList() (+3 more)

### Community 3 - "Community 3"
Cohesion: 0.18
Nodes (3): copyAllAsCSS(), downloadCSS(), paletteToCss()

### Community 4 - "Community 4"
Cohesion: 0.29
Nodes (8): downloadSVG(), encodeData(), escapeSvg(), generateQR(), getVersion(), gfMul(), qrToSvg(), rsEncode()

### Community 5 - "Community 5"
Cohesion: 0.27
Nodes (4): getTool(), toolContactHref(), findArticle(), generateMetadata()

## Knowledge Gaps
- **5 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `generateMetadata()` connect `Community 5` to `Community 1`?**
  _High betweenness centrality (0.006) - this node is a cross-community bridge._
- **Are the 5 inferred relationships involving `supabaseAdmin()` (e.g. with `POST()` and `GET()`) actually correct?**
  _`supabaseAdmin()` has 5 INFERRED edges - model-reasoned connections that need verification._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.14 - nodes in this community are weakly interconnected._