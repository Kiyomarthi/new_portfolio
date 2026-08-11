<script setup lang="ts">
type TechnologyCategory = {
  category: string
  items: string[]
}

const props = defineProps<{
  technologies?: TechnologyCategory[]
  tags?: string[]
}>()

const isGrouped = computed(() => {
  return Array.isArray(props.technologies) && props.technologies.length > 0
})

const flatList = computed(() => {
  if (!isGrouped.value) return []
  return (props.technologies as TechnologyCategory[]).flatMap(g => g.items)
})

const allTags = computed(() => {
  return [...(props.tags || []), ...flatList.value]
})

const groups = computed(() => {
  if (!isGrouped.value) return []
  return (props.technologies as TechnologyCategory[]).map(g => ({
    name: g.category.charAt(0).toUpperCase() + g.category.slice(1),
    items: g.items
  }))
})
</script>

<template>
  <UPageSection
    title="فناوری‌ها"
    :ui="{
      title: 'text-right text-h2 font-medium',
      container: 'gap-5! py-12! pr-0!'
    }"
    dir="ltr"
  >
    <!-- Grouped technologies -->
    <div
      v-if="isGrouped"
      class="grid grid-cols-1 md:grid-cols-2 gap-6"
    >
      <div
        v-for="group in groups"
        :key="group.name"
      >
        <h4 class="text-h3 font-semibold text-highlighted mb-3">
          {{ group.name }}
        </h4>
        <div class="flex text-h4 flex-wrap gap-2">
          <UBadge
            v-for="tech in group.items"
            :key="tech"
            :label="tech"
            variant="subtle"
            color="neutral"
            class="text-h4"
          />
        </div>
      </div>
    </div>

    <!-- Flat/ungrouped technologies -->
    <div
      v-else-if="allTags.length > 0"
      class="flex flex-wrap gap-2"
    >
      <UBadge
        v-for="tech in allTags"
        :key="tech"
        :label="tech"
        variant="subtle"
        color="neutral"
      />
    </div>

    <p
      v-else
      class="text-muted text-sm"
    >
      فناوری‌ها مشخص نشده‌اند.
    </p>
  </UPageSection>
</template>
