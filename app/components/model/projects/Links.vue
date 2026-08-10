<script setup lang="ts">
const props = defineProps<{
  links?: Array<{ label: string, to?: string, icon?: string, target?: string, variant?: string, color?: string, size?: string }>
  mainUrl?: string
  title?: string
}>()

const projectLinks = computed(() => {
  const links = [...(props.links || [])]
  return links.filter(link => link.to)
})
</script>

<template>
  <!-- Only render if there are actual links -->
  <UPageSection
    v-if="projectLinks.length > 0 || mainUrl"
    title="لینک‌ها"
    :ui="{
      container: 'pt-0!',
      title: 'text-right text-xl font-medium'
    }"
  >
    <div class="flex flex-wrap gap-3">
      <!-- Main project link -->
      <UButton
        v-if="mainUrl"
        :to="mainUrl"
        target="_blank"
        rel="noopener noreferrer"
        :label="title ? `بازدید از ${title}` : 'بازدید از پروژه'"
        icon="i-lucide-external-link"
        color="primary"
        variant="solid"
      />

      <!-- Additional links -->
      <UButton
        v-for="link in projectLinks"
        :key="link.label"
        v-bind="link"
        :target="link.target || '_blank'"
        rel="noopener noreferrer"
        color="neutral"
        variant="outline"
      />
    </div>
  </UPageSection>
</template>
