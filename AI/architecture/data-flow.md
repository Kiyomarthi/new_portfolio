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
| `contact` | page | `contact.yml` | Contact page: array of contact methods (title, icon, color, url) |
| `skills` | page | `skills.yml` | Skills & technologies grouped by category |

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
1. Fetches `pages` collection at path `/projects`: `queryCollection('pages').path('/projects').first()` (for hero metadata)
2. Renders via `<ModelProjectsList>` component which fetches `queryCollection('projects').all()`
3. Component sorts projects explicitly by the `order` field (see ordering rule below)
4. Component handles all project rendering with Motion animations

### Projects on Home (`/`) — `pages/index.vue`
1. Uses `<ModelProjectsList :show-more="true" :initial-limit="3" />`
2. Component fetches its own data from `projects` collection
3. Same `order`-based sorting as `/projects`
4. Initially shows 3 projects, "Show More Projects" button reveals all

### Project Ordering
- Projects with an `order` field sort first, ascending (`order: 1` before `order: 2`)
- Projects without `order` sort after all ordered projects, by `date` DESC
- Sorting is done explicitly in `model/projects/list.vue` — never relies on Nuxt Content's default order

### Blog Listing (`/blog`) — `pages/blog/index.vue`
1. Fetches `pages` collection at path `/blog`: `queryCollection('pages').path('/blog').first()`
2. Fetches all blog posts: `queryCollection('blog').order('date', 'DESC').all()`
3. Renders `UBlogPost` cards with alternating rotation

### Blog Post (`/blog/[slug]`) — `pages/blog/[...slug].vue`
1. Fetches blog post by route path: `queryCollection('blog').path(route.path).first()`
2. Fetches surrounding posts for navigation: `queryCollectionItemSurroundings('blog', route.path)`
3. Renders body via `<ContentRenderer>` (Nuxt Content's Markdown renderer)
4. "Copy link" button uses `copyToClipboard()` utility

### Contact (`/contact`) — `pages/contact.vue`
1. Fetches `contact` collection: `queryCollection('contact').first()`
2. Renders via `<ModelContactContact>` component which iterates over `contact.items`
3. Each item renders as a clickable card with icon, color, and URL (tel: or external link)

### Skills (`/skills`) — `pages/skills.vue`
1. Fetches `skills` collection: `queryCollection('skills').first()`
2. Renders via `<ModelSkills>` component (full list, no limit)

### Skills on Home (`/`) — `pages/index.vue`
1. Uses `<ModelSkills :show-more="true" :initial-limit="6" />`
2. Component fetches its own data from `skills` collection
3. Initially shows 6 categories, "Show More Skills" button reveals all

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
