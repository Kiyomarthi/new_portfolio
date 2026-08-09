# Coding Rules

## TypeScript

- **No type assertions** unless absolutely necessary — prefer proper typing
- All page components use `<script setup lang="ts">`
- Collection item types come from `@nuxt/content` (e.g., `IndexCollectionItem`)
- `navLinks` is typed as `NavigationMenuItem[]` from `@nuxt/ui`

## Vue / Nuxt Patterns

- **Always use `useAsyncData`** for collection queries — enables SSR/SSG compatibility and deduplication
- **Always check for null** after `queryCollection(...).first()` and throw `createError({ statusCode: 404 })` if missing
- **SEO on every page**: call `useSeoMeta()` with `title`, `ogTitle`, `description`, `ogDescription`; call `defineOgImage('Portfolio', { title, description })`
- **Destructure `useAppConfig()`** at the top of `<script setup>`: `const { global, footer } = useAppConfig()`
- **Motion animations**: use `Motion` component from `motion-v` with `:initial`, `:while-in-view`, `:transition`, `:in-view-options="{ once: true }"`
- **Client-only features**: wrap in `<ClientOnly>` with `<template #fallback>` placeholder

## Styling

- Tailwind CSS utility classes only — no custom CSS except in `main.css`
- Use Nuxt UI component `ui` prop for slot-level customization: `:ui="{ container: '...', title: '...' }"`
- Follow existing spacing scale: `gap-2`, `gap-4`, `gap-8`; `py-10`, `py-12`; `px-4`, `px-2`
- Container width controlled by `--ui-container: var(--container-4xl)` in CSS

## ESLint Rules (non-negotiable)

- `commaDangle: 'never'`
- `braceStyle: '1tbs'`
- Run `pnpm lint:fix` before committing

## Naming

- Components: PascalCase (`AppHeader`, `PolaroidItem`, `LandingHero`)
- Content files: kebab-case (`index.yml`, `blog-post.md`)
- Utils: camelCase (`copyToClipboard`, `navLinks`)
- CSS classes: kebab-case (Tailwind default)

## Component Props

- Always use `defineProps<{ ... }>()` with TypeScript generics
- Use `v-bind="object"` to spread component config from content collections
- Landing components always accept `page: IndexCollectionItem`
