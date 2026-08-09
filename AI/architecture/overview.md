# Architecture Overview

## Project Summary

Nuxt Portfolio Template — a static/personal portfolio site built with **Nuxt 4**, **Nuxt UI**, and **Nuxt Content**. Fully static-generation capable via Nitro prerendering.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Nuxt 4 |
| UI Components | Nuxt UI (built on Headless UI + Tailwind CSS 4) |
| Styling | Tailwind CSS 4 |
| Content/CMS | Nuxt Content 3 (YAML + Markdown, SQLite storage) |
| Animations | Motion-V (Vue Motion) |
| Images | @nuxt/image |
| Icons | Iconify (Lucide + Simple Icons) |
| SEO | nuxt-og-image (zero-runtime OG image generation) |
| Package Manager | pnpm |
| Linting | @nuxt/eslint (ESLint 10) |
| Deployment target | Vercel (static export via Nitro prerender) |

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      Browser (SPA/SSG)                       │
│  ┌─────────────┐  ┌──────────────┐  ┌─────────────────────┐ │
│  │  App.vue    │  │  NuxtPage    │  │  NuxtLayout         │ │
│  │  (root)     │→ │  (routing)   │→ │  (default layout)   │ │
│  └─────────────┘  └──────────────┘  └─────────────────────┘ │
│         │                                          │         │
│         ▼                                          ▼         │
│  ┌─────────────┐                          ┌──────────────┐  │
│  │ Nuxt Content│ ← YAML/Markdown files    │  Nuxt UI     │  │
│  │  collections │  (content/)              │  components  │  │
│  └─────────────┘                          └──────────────┘  │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    Build Time (Nitro)                        │
│  ┌─────────────┐  ┌──────────────┐  ┌─────────────────────┐ │
│  │ Prerender   │  │  OG Image    │  │  Static Assets      │ │
│  │  routes     │→ │  generation  │→ │  (.output/public)   │ │
│  └─────────────┘  └──────────────┘  └─────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

## Key Architectural Decisions

1. **Static site generation** — Nitro prerendering with `crawlLinks: true` generates all pages at build time. No server-side rendering at runtime.
2. **File-based content** — Content lives in `/content/` as YAML/Markdown files, queried via Nuxt Content's collection API. No external CMS or database.
3. **Zero-runtime OG images** — OG images are generated at build time via `nuxt-og-image` with `zeroRuntime: true`.
4. **Monolithic page components** — Each route is a single `.vue` file in `app/pages/` that fetches its own data via `useAsyncData` + `queryCollection`.
5. **Shared landing components** — Home page sections (Hero, About, FAQ, etc.) are split into `app/components/landing/*.vue` for readability, all receiving the same `page` prop from the index collection.
