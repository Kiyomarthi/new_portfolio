<script setup lang="ts">
import type { IndexCollectionItem } from '@nuxt/content'

defineProps<{
  page: IndexCollectionItem
}>()
</script>

<template>
  <UPageSection
    :title="page.about.title"
    :description="page.about.description"
    :ui="{
      container: 'p-0!',
      title: 'text-xl text-right sm:text-xl lg:text-2xl font-medium',
      description:
        'mt-3 text-sm sm:text-md lg:text-sm text-muted whitespace-pre-line text-right'
    }"
  />
</template>
