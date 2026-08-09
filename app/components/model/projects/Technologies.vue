<script setup lang="ts">
type TechnologyGroup = Record<string, string[]>

const props = defineProps<{
  technologies?: TechnologyGroup | string[] | object
  tags?: string[]
}>()

const isGrouped = computed(() => {
  if (!props.technologies || Array.isArray(props.technologies)) return false
  return Object.keys(props.technologies).length > 0
})

const isFlat = computed(() => {
  return Array.isArray(props.technologies)
})

const flatList = computed(() => {
  if (isFlat.value) return props.technologies as string[]
  if (isGrouped.value) {
    const techs = props.technologies as TechnologyGroup
    return Object.values(techs).flat()
  }
  return []
})

const allTags = computed(() => {
  const tags = props.tags || []
  return [...tags, ...flatList.value]
})

const groups = computed(() => {
  if (!isGrouped.value) return []
  const techs = props.technologies as TechnologyGroup
  return Object.entries(techs).map(([key, values]) => ({
    name: key.charAt(0).toUpperCase() + key.slice(1),
    items: values
  }))
})
</script>

<template>
  <UPageSection
    title="Technologies"
    :ui="{
      container: 'pt-0!',
      title: 'text-left text-xl font-medium'
    }"
  >
    <!-- Grouped technologies -->
    <div v-if="isGrouped" class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div v-for="group in groups" :key="group.name">
        <h4 class="text-sm font-semibold text-highlighted uppercase tracking-wide mb-3">
          {{ group.name }}
        </h4>
        <div class="flex flex-wrap gap-2">
          <UBadge
            v-for="tech in group.items"
            :key="tech"
            :label="tech"
            variant="subtle"
            color="neutral"
          />
        </div>
      </div>
    </div>

    <!-- Flat/ungrouped technologies -->
    <div v-else-if="allTags.length > 0" class="flex flex-wrap gap-2">
      <UBadge
        v-for="tech in allTags"
        :key="tech"
        :label="tech"
        variant="subtle"
        color="neutral"
      />
    </div>

    <p v-else class="text-muted text-sm">
      Technologies not specified.
    </p>
  </UPageSection>
</template>
