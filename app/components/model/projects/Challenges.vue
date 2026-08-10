<script setup lang="ts">
defineProps<{
  content?: string
}>()
</script>

<template>
  <div
    v-if="content"
    title="چالش‌ها و تجربیات"
    :ui="{
      container: 'gap-5! py-12! pr-0!',
      title: 'text-right text-h2 font-medium'
    }"
  >
    <!-- <MDC
      :value="content"
      unwrap="p"
      class="prose prose-neutral dark:prose-invert max-w-none"
    /> -->

    <ContentRenderer :value="content" />
  </div>
</template>
