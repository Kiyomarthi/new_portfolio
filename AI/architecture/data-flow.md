# Data Flow

## Content → Page Rendering Pipeline

```
content/*.yml, content/blog/*.md, content/projects/*.yml
                    │
                    ▼  (build time: Nuxt Content parses & stores in SQLite)
           Nuxt Content Collections
                    │
                    ▼  (runtime: queryCollection() reads from pre-built JSON/SQLite)
           useAsyncData('key', () => queryCollection(...).first()/all())
                    │
                    ▼
           page.value / posts.value (reactive ref)
                    │
                    ▼
           Template rendering + Motion animations
```

## Collection Definitions (from `content.config.ts`)

| Collection | Type | Source | Purpose |
|---|---|---|---|
| `index` | page | `index.yml` | Home page content (hero, about, experience, testimonials, FAQ) |
| `about` | page | `about.yml` | About page content (rich text + images) |
| `projects` | data | `projects/*.yml` | Project cards (title, description, image, url, tags, date) |
| `blog` | page | `blog/*.md` | Blog posts (Markdown body + front matter) |
| `pages` | page | `projects.yml`, `blog.yml` | Listing page metadata |
| `speaking` | page | `speaking.yml` | Speaking events grouped by category |

## Per-Page Data Fetching

### Home (`/`) — `pages/index.vue`
1. Fetches `index` collection: `queryCollection('index').first()`
2. Passes entire `page` object to each landing component
3. Landing components extract their section from `page.hero`, `page.about`, `page.experience`, etc.
4. `landing/Blog.vue` makes its own separate query for top 3 blog posts

### About (`/about`) — `pages/about.vue`
1. Fetches `about` collection: `queryCollection('about').first()`
2. Renders `page.content` via `<MDC>` (Markdown-to-Component)
3. Renders `page.images` as `PolaroidItem` components

### Projects (`/projects`) — `pages/projects.vue`
1. Fetches `pages` collection at path `/projects`: `queryCollection('pages').path('/projects').first()`
2. Fetches all projects: `queryCollection('projects').all()`
3. Renders project cards with Motion staggered entrance

### Blog Listing (`/blog`) — `pages/blog/index.vue`
1. Fetches `pages` collection at path `/blog`: `queryCollection('pages').path('/blog').first()`
2. Fetches all blog posts: `queryCollection('blog').order('date', 'DESC').all()`
3. Renders `UBlogPost` cards with alternating rotation

### Blog Post (`/blog/[slug]`) — `pages/blog/[...slug].vue`
1. Fetches blog post by route path: `queryCollection('blog').path(route.path).first()`
2. Fetches surrounding posts for navigation: `queryCollectionItemSurroundings('blog', route.path)`
3. Renders body via `<ContentRenderer>` (Nuxt Content's Markdown renderer)
4. "Copy link" button uses `copyToClipboard()` utility

### Speaking (`/speaking`) — `pages/speaking.vue`
1. Fetches `speaking` collection: `queryCollection('speaking').first()`
2. Groups events by category (Conference, Live talk, Podcast) via computed property
3. Renders 3-column grid on desktop, stacked on mobile

## Global Data (available everywhere)

### `useAppConfig()`
- `global.picture` — light/dark avatar URLs, alt text
- `global.meetingLink` — cal.com URL
- `global.email` — contact email
- `global.available` — availability status boolean
- `ui.colors` — primary/neutral color scheme
- `footer.credits` — footer text
- `footer.links` — social link array

### `navLinks` (from `utils/links.ts`)
- 5 navigation items with icon, label, and route
- Passed as prop to `AppHeader` from both `app.vue` and `error.vue`

## Search Data

Both `app.vue` and `error.vue` fetch:
- `queryCollectionNavigation('blog')` — builds navigation tree for search
- `queryCollectionSearchSections('blog')` — builds searchable text sections
- Rendered via `<LazyUContentSearch>` (client-only, `meta_k` shortcut)
