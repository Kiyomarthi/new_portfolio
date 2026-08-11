<script setup lang="ts">
import type { ContactCollectionItem } from '@nuxt/content'

defineProps<{
  page: ContactCollectionItem
}>()

function isExternal(url: string): boolean {
  return url.startsWith('http') || url.startsWith('https')
}
</script>

<template>
  <UPageSection
    :title="page.contact.title"
    :ui="{
      container: 'pt-0! gap-4!',
      title: 'text-right text-xl sm:text-xl lg:text-2xl font-medium'
    }"
  >
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <Motion
        v-for="(item, index) in page.contact.items"
        :key="item.title"
        :initial="{ opacity: 0, transform: 'translateY(10px)' }"
        :while-in-view="{ opacity: 1, transform: 'translateY(0)' }"
        :transition="{ delay: 0.1 * index }"
        :in-view-options="{ once: true }"
      >
        <NuxtLink
          :to="item.url"
          :target="isExternal(item.url) ? '_blank' : undefined"
          :rel="isExternal(item.url) ? 'noopener noreferrer' : undefined"
          class="group flex items-center gap-4 rounded-lg border border-default bg-elevated/50 p-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
        >
          <div
            class="flex size-12 shrink-0 items-center justify-center rounded-lg bg-primary/10"
          >
            <UIcon
              :name="item.icon"
              class="size-6"
              :style="{ color: item.color }"
            />
          </div>

          <div class="min-w-0 flex-1">
            <h3 class="font-semibold text-highlighted">
              {{ item.title }}
            </h3>
            <p class="mt-1 truncate text-sm text-muted">
              {{ item.url }}
            </p>
          </div>

          <UIcon
            name="i-lucide-arrow-left"
            class="size-5 text-dimmed transition-all group-hover:translate-x-1 group-hover:text-primary"
          />
        </NuxtLink>
      </Motion>
    </div>
  </UPageSection>
</template>
