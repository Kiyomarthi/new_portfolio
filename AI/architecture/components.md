# Components

## Layout Components

### `app.vue` (Root)
- Sets up global `<head>` meta (charset, viewport, favicon, theme-color)
- Configures `useSeoMeta` title template: `'%s - Nuxt Portfolio Template'`
- Fetches `navigation` (from `queryCollectionNavigation('blog')`) and `search` data (from `queryCollectionSearchSections('blog')`) for the global search
- Wraps everything in `<UApp>` → `<NuxtLayout>` → `<NuxtPage>`
- Renders `<LazyUContentSearch>` client-only with `meta_k` shortcut
- Renders `<UToaster>` for toast notifications

### `layouts/default.vue`
- Minimal wrapper: `<UContainer>` with `AppHeader` above and `AppFooter` below the slot
- Container has `sm:border-x border-default pt-10` styling

### `error.vue`
- Mirrors `app.vue` structure (fetches navigation + search same way)
- Renders `<UError>` inside `<UPage>` layout
- Receives `error` prop typed as `NuxtError`

## Shared Components

### `AppHeader.vue`
- Props: `links: NavigationMenuItem[]`
- Fixed-position floating nav bar (`top-2 sm:top-4`, centered, `z-10`)
- Uses `UNavigationMenu` with `variant="link"`, backdrop blur, rounded pill shape
- `ColorModeButton` injected in `#list-trailing` slot

### `AppFooter.vue`
- Reads `footer` from `useAppConfig()`
- Left slot: credits text
- Right slot: social link buttons (Discord, X, GitHub)

### `ColorModeButton.vue`
- Toggles between light/dark mode
- Uses **View Transition API** for a circular clip-path transition effect on theme switch
- Wraps button in `<ClientOnly>` with empty placeholder fallback

### `PolaroidItem.vue`
- Props: `image: { src, alt }`, `index: number`
- Renders image in a white-bordered polaroid frame with rotation (`-rotate-5` or `rotate-5` alternating)
- Hover: scale up, derotate, translate, z-index boost

## Model Components

Reusable feature components that handle their own data fetching and can be used across multiple pages.

### `model/Skills.vue`
- Props: `showMore?: boolean` (default `false`), `initialLimit?: number`
- Fetches skills data via `queryCollection('skills').first()`
- Renders skill categories as a `UPageGrid` of `UCard` components with `Motion` animations
- When `showMore` is enabled and `initialLimit` is set: shows limited items + "Show More Skills" button
- Clicking "Show More" reveals all remaining categories
- Used by both `pages/skills.vue` (full list) and `pages/index.vue` (limited to 6 with show-more)

### `model/projects/list.vue`
- Props: `showMore?: boolean` (default `false`), `initialLimit?: number`
- Fetches projects data via `queryCollection('projects').all()`
- Sorts projects explicitly by the `order` field (ordered first ascending; unordered after, by date DESC) — see `data-flow.md` "Project Ordering"
- Renders each project as a `UCard` with image, description, tags, and detail link
- Uses `NuxtImg` for optimized image rendering
- When `showMore` is enabled and `initialLimit` is set: shows limited items + "Show More Projects" button
- Clicking "Show More" reveals all remaining projects
- Used by both `pages/projects.vue` (full list) and `pages/index.vue` (limited to 3 with show-more)

## Landing Section Components

All landing components accept `page: IndexCollectionItem` as prop and render sections of the home page.

### `landing/Hero.vue`
- Uses `Motion` for staggered entrance animations (scale + blur → sharp)
- Shows avatar (from `appConfig.global.picture`), title, description, action buttons
- Availability badge: green pulsing dot if `global.available`, red if not
- `UMarquee` scrolls hero images with alternating slight rotations

### `landing/About.vue`
- Renders `page.about.title` + `page.about.description` via `UPageSection`

### `landing/WorkExperience.vue`
- Renders `page.experience.items` as a list with `Motion` staggered animations
- Each item: date, company name (colored), position, company logo icon

### `landing/Blog.vue`
- Fetches top 3 blog posts via `queryCollection('blog').order('date', 'DESC').limit(3)`
- Renders as horizontal `UBlogPost` cards with "Read Article" links

### `landing/Testimonials.vue`
- `UCarousel` with autoplay (4s), loop, dots
- Each testimonial: quote in large styled text with decorative quotes, author as `UUser`

### `landing/FAQ.vue`
- `UTabs` for categories → `UAccordion` for questions within each category
- Question content rendered via `<MDC>` component (Markdown support)

## OG Image Component

### `OgImage/Portfolio.takumi.vue`
- Props: `headline?`, `title?`, `description?`
- Dark theme OG card with Nuxt green accent bar, Nuxt logo SVG, `ui.nuxt.com` branding
- Used via `defineOgImage('Portfolio', { title, description })`

## Utility Functions

### `utils/clipboard.ts`
- `copyToClipboard(toCopy: string, message?: string)` — writes to clipboard and shows a success toast

### `utils/links.ts`
- Exports `navLinks: NavigationMenuItem[]` — 5 items: Home, Projects, Blog, Speaking, About
- Imported by `app.vue`, `error.vue`, and passed to `AppHeader`
