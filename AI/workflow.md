# AI Agent Workflow

## Start Here

When given a task on this project, read this file first. It tells you which documentation to read based on your task type.

## Documentation Index

| Document | What It Covers |
|---|---|
| [Architecture Overview](architecture/overview.md) | Tech stack, high-level architecture, key decisions |
| [Project Structure](architecture/structure.md) | Directory layout, file purposes, conventions |
| [Components](architecture/components.md) | All Vue components, their props, and behavior |
| [Data Flow](architecture/data-flow.md) | Content→page pipeline, collection definitions, per-page fetching |
| [Workflows](architecture/workflows.md) | Dev/build/deploy commands, CI, adding content |
| [Coding Rules](rules/coding-rules.md) | TypeScript, Vue/Nuxt patterns, styling, ESLint, naming |
| [Architecture Rules](rules/architecture-rules.md) | Structural constraints, page/content creation, UI consistency |

## Task → Required Documents

Identify your task type below and read the **MUST** documents before writing code.

### Content Update (blog post, project, home page text)

| Priority | Document |
|---|---|
| MUST | [Workflows](architecture/workflows.md) — "Adding Content" section |
| SHOULD | [Data Flow](architecture/data-flow.md) — Collection definitions |
| REF | [Project Structure](architecture/structure.md) — Directory layout |

### New Page or Route

| Priority | Document |
|---|---|
| MUST | [Architecture Rules](rules/architecture-rules.md) — "Page Creation Rules" |
| MUST | [Coding Rules](rules/coding-rules.md) — "Vue / Nuxt Patterns" |
| SHOULD | [Data Flow](architecture/data-flow.md) — "Per-Page Data Fetching" |
| SHOULD | [Components](architecture/components.md) — Layout components |
| REF | [Project Structure](architecture/structure.md) — `app/pages/` layout |

### New Content Collection or Schema Change

| Priority | Document |
|---|---|
| MUST | [Architecture Rules](rules/architecture-rules.md) — "Content Schema Rules" |
| MUST | [Architecture Rules](rules/architecture-rules.md) — "What NOT to Change" |
| SHOULD | [Data Flow](architecture/data-flow.md) — "Collection Definitions" |
| SHOULD | [Project Structure](architecture/structure.md) — `content.config.ts` description |

### UI / Component Change

| Priority | Document |
|---|---|
| MUST | [Coding Rules](rules/coding-rules.md) — "Styling", "Component Props" |
| MUST | [Architecture Rules](rules/architecture-rules.md) — "UI Consistency Rules" |
| SHOULD | [Components](architecture/components.md) — Relevant component docs |
| REF | [Architecture Overview](architecture/overview.md) — Tech stack |

### Bug Fix

| Priority | Document |
|---|---|
| MUST | [Data Flow](architecture/data-flow.md) — Affected page's data fetching |
| SHOULD | [Components](architecture/components.md) — Affected component |
| SHOULD | [Coding Rules](rules/coding-rules.md) — Relevant pattern |

### Refactoring

| Priority | Document |
|---|---|
| MUST | [Architecture Rules](rules/architecture-rules.md) — All sections |
| MUST | [Coding Rules](rules/coding-rules.md) — All sections |
| SHOULD | [Architecture Overview](architecture/overview.md) — Key decisions |
| SHOULD | [Components](architecture/components.md) — Affected components |

### Build / Deploy / CI Issue

| Priority | Document |
|---|---|
| MUST | [Workflows](architecture/workflows.md) — "Build & Deployment", "CI Pipeline" |
| SHOULD | [Architecture Overview](architecture/overview.md) — Key decisions |

## Rules to Always Follow

1. **Read before writing** — Understand the existing implementation from the relevant docs before modifying code.
2. **Follow architectural constraints** — This is a fully static site. No API routes, no external CMS, no client-side state management, no dynamic SSR.
3. **Match existing patterns** — Use `useAsyncData` + `queryCollection`, throw 404 on missing data, call `useSeoMeta()` + `defineOgImage()` on every page.
4. **Run lint + typecheck** — `pnpm lint:fix && pnpm typecheck` before committing.
5. **Verify the build** — `pnpm build` to confirm SSG works.

## Multi-Area Tasks

If your task spans multiple categories (e.g., a new page with a new content collection), read the required documents for **all** affected areas.

## Unclear Task Type?

Scan the [Documentation Index](#documentation-index) and read the two most relevant documents. Then proceed.
