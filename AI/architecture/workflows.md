# Workflows

## Development Workflow

```bash
pnpm install        # Install deps + run `nuxt prepare` (postinstall)
pnpm dev            # Start dev server on http://localhost:3000
pnpm lint           # Run ESLint
pnpm lint:fix       # Auto-fix ESLint issues
pnpm typecheck      # Run `nuxt typecheck` (Vue + TS type checking)
pnpm build          # Production build (Nitro SSG)
pnpm preview        # Preview production build locally
```

## Build & Deployment Flow

1. `pnpm build` → Nuxt builds the app, Nitro prerenderer crawls from `/` and generates static HTML for all discoverable routes
2. Output lands in `.output/public/` — a fully static directory
3. Deploy `.output/public/` to any static host (Vercel, Netlify, Cloudflare Pages)
4. No Node.js server required at runtime — pure static files

### Nitro Prerender Config (in `nuxt.config.ts`)
```ts
nitro: {
  prerender: {
    routes: ['/'],    // Entry point for crawl
    crawlLinks: true   // Auto-discover and prerender all linked routes
  }
}
```

## CI Pipeline (`.github/workflows/ci.yml`)

On every push:
1. Checkout code
2. Install pnpm
3. Setup Node 22 with pnpm cache
4. `pnpm install`
5. `pnpm run lint` — must pass
6. `pnpm run typecheck` — must pass

No tests in the project. CI validates code quality only.

## Adding Content

### New Blog Post
1. Create `content/blog/my-post.md`
2. Front matter must include: `title`, `description`, `date`, `minRead`, `image`, `author` (with `name`, `avatar`)
3. Body is Markdown, rendered via `<ContentRenderer>`
4. Automatically appears on `/blog` listing and home page "Latest Articles" section

### New Project
1. Create `content/projects/my-project.yml`
2. Required fields: `title`, `description`, `image`, `url`, `tags`, `date`
3. Optional `order` field controls display position (lower = higher). Projects without `order` sort after ordered ones, by date DESC.
4. Optional long-form challenges: create `content/projects/my-project-challenges.md` — automatically connected to the project detail page via the `projectChallenges` collection
5. Appears on `/projects` listing and home page automatically, sorted by `order`

### Creating a Project from Nuxt Studio
- Nuxt Studio natively supports creating a **single** document (YAML or Markdown) via the file tree's "New Document" action
- Create the project YAML first (one document). It immediately appears in the list/detail pages
- Optionally create the related `-challenges.md` as a second document
- Studio does **not** create the paired YAML + Markdown in one action — this is a known Studio limitation, not a bug to work around with API routes (the project forbids server API routes)

### Updating Home Page
1. Edit `content/index.yml`
2. All sections (hero, about, experience, testimonials, FAQ) are controlled from this single file

### Updating Global Config
1. Edit `app/app.config.ts`
2. Changes affect: profile picture, email, meeting link, availability status, footer links, UI colors

## Dependency Updates

- **Renovate** is configured via `renovate.json` — auto-creates PRs for dependency updates
- Package manager locked to `pnpm@11.18.0` via `packageManager` field in `package.json`
