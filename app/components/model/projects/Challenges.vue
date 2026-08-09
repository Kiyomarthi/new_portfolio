<script setup lang="ts">
defineProps<{
  content?: string
}>()
</script>

<template>
  <UPageSection
    v-if="content"
    title="Challenges & Experience"
    :ui="{
      container: 'pt-0!',
      title: 'text-left text-xl font-medium'
    }"
  >
    <MDC
      :value="content"
      unwrap="p"
      class="prose prose-neutral dark:prose-invert max-w-none"
    />
  </UPageSection>
</template>
