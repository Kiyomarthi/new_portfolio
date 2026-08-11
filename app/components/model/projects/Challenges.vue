<script setup lang="ts">
import type { ProjectChallengesCollectionItem } from '@nuxt/content'

defineProps<{
  challenge?: ProjectChallengesCollectionItem | null
}>()
</script>

<template>
  <div
    v-if="challenge?.body"
    title="چالش‌ها و تجربیات"
    :ui="{
      container: 'gap-5! py-12! pr-0!',
      title: 'text-right text-h2 font-medium'
    }"
  >
    <ContentRenderer
      v-if="challenge.body"
      :value="challenge"
    />
  </div>
</template>
