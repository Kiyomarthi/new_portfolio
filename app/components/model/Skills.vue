<script setup lang="ts">
const props = defineProps<{
  showMore?: boolean
  initialLimit?: number
}>()

const { data: skillsPage } = await useAsyncData('skills-component', () =>
  queryCollection('skills').first()
)
if (!skillsPage.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Skills not found',
    fatal: true
  })
}

const visibleCategories = computed(() => {
  const categories = skillsPage.value?.categories || []
  if (!props.showMore || !props.initialLimit) return categories
  return categories.slice(0, props.initialLimit)
})

const hasMore = computed(() => {
  if (!props.showMore || !props.initialLimit) return false
  return (skillsPage.value?.categories?.length || 0) > props.initialLimit
})

const showAll = ref(false)

const displayedCategories = computed(() => {
  if (!props.showMore || showAll.value)
    return skillsPage.value?.categories || []
  return visibleCategories.value
})

function handleShowMore() {
  showAll.value = true
}
</script>

<template>
  <UPageSection
    title="مهارت‌ها"
    description="مهارت ها و تکنولوژی‌ها."
    :ui="{
      container: 'pt-0! gap-4!',
      title: 'text-right text-xl sm:text-xl lg:text-2xl font-medium',
      description: 'text-right mt-2 text-sm sm:text-md lg:text-sm text-muted'
    }"
  >
    <UPageGrid
      :ui="{
        base: 'md:lg:grid-cols-2 lg:grid-cols-2'
      }"
    >
      <Motion
        v-for="(category, index) in displayedCategories"
        :key="category.title"
        :initial="{ opacity: 0, transform: 'translateY(10px)' }"
        :while-in-view="{ opacity: 1, transform: 'translateY(0)' }"
        :transition="{ delay: 0.05 * index }"
        :in-view-options="{ once: true }"
      >
        <UCard
          :ui="{
            body: 'flex-1'
          }"
          class="transition-all duration-200 hover:-translate-y-1 hover:shadow-lg flex flex-col h-full"
        >
          <template #header>
            <div class="flex items-start gap-4">
              <div
                class="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10"
              >
                <UIcon
                  :name="category.icon"
                  class="size-5 text-primary"
                />
              </div>

              <div class="min-w-0">
                <h3 class="font-semibold text-highlighted">
                  {{ category.title }}
                </h3>
              </div>
            </div>
          </template>

          <div class="flex flex-1 flex-wrap gap-2">
            <UBadge
              v-for="skill in category.skills"
              :key="skill.name"
              :label="skill.name"
              variant="subtle"
              color="neutral"
              :ui="{
                label: 'text-lg'
              }"
            />
          </div>

          <template #footer>
            <div class="flex items-center justify-between">
              <span class="text-xs text-dimmed">
                {{ category.skills.length }}
                {{ category.skills.length === 1 ? "skill" : "skills" }}
              </span>

              <UIcon
                name="i-lucide-arrow-up-right"
                class="size-4 text-dimmed"
              />
            </div>
          </template>
        </UCard>
      </Motion>
    </UPageGrid>

    <div
      v-if="hasMore && !showAll"
      class="flex justify-center mt-3"
    >
      <UButton
        label="نمایش مهارت‌های بیشتر"
        color="neutral"
        variant="outline"
        trailing-icon="i-lucide-chevron-down"
        @click="handleShowMore"
      />
    </div>
  </UPageSection>
</template>
