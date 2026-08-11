<script setup lang="ts">
const props = defineProps<{
  company?: string
  startDate?: string | Date
  endDate?: string | Date
}>()

function formatDate(value: string | Date): string {
  const date = new Date(value)
  return date.toLocaleDateString('fa-IR', { year: 'numeric', month: 'long' })
}

const hasMetadata = computed(() => {
  return props.company || props.startDate
})
</script>

<template>
  <UPageSection
    v-if="hasMetadata"
    :ui="{
      container: 'gap-5! py-3! pr-0!',
      title: 'text-right text-h3 font-medium'
    }"
  >
    <div class="flex flex-wrap gap-6 text-h3">
      <div
        v-if="company"
        class="flex items-center gap-2 text-muted"
      >
        <UIcon
          name="i-lucide-building"
          class="size-4"
        />
        <span class="font-medium text-highlighted">شرکت:</span>
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
        <span class="font-medium text-highlighted">شروع:</span>
        <span>{{ formatDate(startDate) }}</span>
      </div>

      <div
        v-if="endDate"
        class="flex items-center gap-2 text-muted"
      >
        <span class="font-medium text-highlighted">پایان:</span>
        <span>{{ formatDate(endDate) }}</span>
      </div>

      <div
        v-if="startDate && !endDate"
        class="flex items-center gap-2 text-muted"
      >
        <span class="font-medium text-highlighted">وضعیت:</span>
        <UBadge
          label="در حال انجام"
          color="success"
          variant="subtle"
          size="xs"
        />
      </div>
    </div>
  </UPageSection>
</template>
