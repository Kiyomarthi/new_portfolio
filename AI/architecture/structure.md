# Project Structure

## Directory Layout

```
portfolio/
├── app/                          # Nuxt app source
│   ├── app.vue                   # Root component (global head, SEO, search, layout shell)
│   ├── error.vue                 # Global error page (404, etc.)
│   ├── app.config.ts             # Global app config (picture, email, footer links, UI colors)
│   ├── assets/css/main.css       # Tailwind + Nuxt UI imports, font/theme definitions
│   ├── components/
│   │   ├── AppHeader.vue         # Fixed top nav with UNavigationMenu + ColorModeButton
│   │   ├── AppFooter.vue         # Footer with credits + social links
│   │   ├── ColorModeButton.vue   # Theme toggle with View Transition API animation
│   │   ├── PolaroidItem.vue      # Rotating polaroid-style image for About page
│   │   ├── OgImage/
│   │   │   └── Portfolio.takumi.vue  # OG image template (nuxt-og-image)
│   │   ├── model/                # Reusable feature components with own data fetching
│   │   │   ├── Skills.vue        # Skills grid, supports showMore + initialLimit props
│   │   │   └── projects/
│   │   │       └── list.vue      # Projects list with cards, supports showMore + initialLimit props
│   │   └── landing/              # Home page section components
│   │       ├── Hero.vue          # Hero with avatar, animated title, marquee images
│   │       ├── About.vue         # About text section
│   │       ├── WorkExperience.vue # Experience timeline with Motion animations
│   │       ├── Blog.vue          # Latest 3 blog posts preview
│   │       ├── Testimonials.vue  # Carousel of testimonial quotes
│   │       └── FAQ.vue           # Tabs + Accordion for FAQ categories
│   ├── layouts/
│   │   └── default.vue           # Wraps slot with UContainer, AppHeader, AppFooter
│   ├── pages/
│   │   ├── index.vue             # Home — renders all landing sections
│   │   ├── about.vue             # About page with MDC content + polaroid images
│   │   ├── projects.vue          # Projects listing page
│   │   ├── contact.vue           # Contact page (phone, GitHub, LinkedIn, Telegram)
│   │   └── blog/
│   │       ├── index.vue         # Blog listing (all posts, descending date)
│   │       └── [...slug].vue     # Dynamic blog post page (catch-all route)
│   └── utils/
│       ├── clipboard.ts          # copyToClipboard() helper with toast
│       └── links.ts              # navLinks constant (5 nav items)
├── content/                      # Nuxt Content collections (source of truth for text)
│   ├── index.yml                 # Home page: hero, about, experience, testimonials, FAQ
│   ├── about.yml                 # About page: content (MD), images
│   ├── projects.yml              # Projects listing page metadata
│   ├── blog.yml                  # Blog listing page metadata
│   ├── contact.yml               # Contact page: contact methods array
│   ├── blog/                     # Blog posts as Markdown
│   │   └── *.md                  # Individual blog posts (front matter + body)
│   └── projects/                 # Project cards as YAML
│       └── *.yml                 # Individual project entries
├── public/                       # Static assets (favicon, hero images)
├── .github/workflows/ci.yml      # CI: lint + typecheck on push
├── nuxt.config.ts                # Nuxt config: modules, CSS, Nitro, content, OG
├── content.config.ts             # Nuxt Content collection schemas (Zod)
├── package.json                  # Scripts, dependencies
├── tsconfig.json                 # TS references to .nuxt generated configs
└── pnpm-lock.yaml
```

## Conventions

- **File naming**: PascalCase for Vue components, kebab-case for content files
- **Collection sources**: YAML for structured data, Markdown for long-form blog content
- **Page data fetching pattern**: Every page uses `useAsyncData` + `queryCollection()` at the top level of `<script setup>`
- **404 handling**: Every page checks if the queried collection item exists; if not, throws `createError({ statusCode: 404 })`
- **SEO**: Every page calls `useSeoMeta()` and `defineOgImage()` explicitly
- **Navigation links**: Centralized in `app/utils/links.ts` as `navLinks` constant, passed to `AppHeader`
