# Architecture Rules

## Structural Constraints

1. **No API routes** — This is a fully static site. Do not add server routes, server middleware, or API endpoints.
2. **No external CMS** — All content lives in `/content/` as YAML/Markdown files. Do not add Sanity, Contentful, Strapi, or similar.
3. **No client-side state management** — No Pinia, Vuex, or global reactive state. All data comes from Nuxt Content collections or `useAppConfig()`.
4. **No dynamic server rendering** — The site is prerendered. Do not add `ssr: true` routes or server-only data fetching that would break static generation.

## Page Creation Rules

When adding a new page:

1. Create `app/pages/your-page.vue`
2. Fetch data via `useAsyncData('key', () => queryCollection('collectionName').first())`
3. Throw 404 if data is missing
4. Call `useSeoMeta()` with title, ogTitle, description, ogDescription
5. Call `defineOgImage('Portfolio', { title, description })`
6. Wrap content in `<UPage>` inside the default layout
7. Use Nuxt UI components (`UPageHero`, `UPageSection`, `UPageBody`, etc.) for consistency

## Content Schema Rules

When adding a new content collection:

1. Define schema in `content.config.ts` using Zod
2. Use `defineCollection({ type: 'page' | 'data', source: '...', schema: z.object({...}) })`
3. Use `createBaseSchema()`, `createButtonSchema()`, `createImageSchema()`, etc. from the top of the file for consistency
4. Collection `type: 'page'` supports `path()` queries; `type: 'data'` does not

## UI Consistency Rules

1. **Navigation**: New nav items must be added to `app/utils/links.ts` `navLinks` array
2. **Footer links**: Add to `footer.links` in `app/app.config.ts`
3. **Icons**: Use Iconify names (`i-lucide-*` or `i-simple-icons-*`) — do not add custom SVG components
4. **Colors**: Use Nuxt UI color names (`primary`, `neutral`, `success`, `warning`, `error`, `info`) — do not add custom color values to Tailwind
5. **Typography**: Use Nuxt UI component props — do not add custom font sizes to Tailwind

## Performance Rules

1. **Images**: Always use `<NuxtImg>` or `<UColorModeAvatar>` for images from content — never raw `<img>` tags (except in OG components)
2. **Icons**: Always use `<UIcon name="i-lucide-*" />` — never inline SVGs (except in OG components)
3. **Animations**: Use `Motion` from `motion-v` — never add custom CSS `@keyframes`
4. **Search**: Only the blog collection is indexed for search. Do not add other collections to `queryCollectionSearchSections()`

## What NOT to Change

- `nuxt.config.ts` `compatibilityDate` — pinned to `2026-06-30`
- `content.config.ts` collection schemas — content files depend on them
- `app/app.config.ts` structure — components destructure specific keys from it
- `app/utils/links.ts` exports — imported directly by `app.vue` and `error.vue`
