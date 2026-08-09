<script setup lang="ts">
const props = defineProps<{
  company?: string
  startDate?: string | Date
  endDate?: string | Date
}>()

function formatDate(value: string | Date): string {
  const date = new Date(value)
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' })
}

const hasMetadata = computed(() => {
  return props.company || props.startDate
})
</script>

<template>
  <UPageSection
    v-if="hasMetadata"
    :ui="{
      container: 'pt-0!'
    }"
  >
    <div class="flex flex-wrap gap-6 text-sm">
      <div
        v-if="company"
        class="flex items-center gap-2 text-muted"
      >
        <UIcon
          name="i-lucide-building"
          class="size-4"
        />
        <span class="font-medium text-highlighted">Company:</span>
        <span>{{ company }}</span>
      </div>

      <div
        v-if="startDate"
        class="flex items-center gap-2 text-muted"
      >
        <UIcon
          name="i-lucide-calendar"
          class="size-4"
        />
        <span class="font-medium text-highlighted">Start:</span>
        <span>{{ formatDate(startDate) }}</span>
      </div>

      <div
        v-if="endDate"
        class="flex items-center gap-2 text-muted"
      >
        <span class="font-medium text-highlighted">End:</span>
        <span>{{ formatDate(endDate) }}</span>
      </div>

      <div
        v-if="startDate && !endDate"
        class="flex items-center gap-2 text-muted"
      >
        <span class="font-medium text-highlighted">Status:</span>
        <UBadge
          label="Ongoing"
          color="success"
          variant="subtle"
          size="xs"
        />
      </div>
    </div>
  </UPageSection>
</template>
