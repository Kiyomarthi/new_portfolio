<script setup lang="ts">
const props = defineProps<{
  showMore?: boolean
  initialLimit?: number
}>()

const { data: projects } = await useAsyncData('projects-list', () =>
  queryCollection('projects').all()
)

// Explicit ordering: projects with an `order` value first (ascending),
// then projects without an `order` value (sorted by date DESC as fallback).
const sortedProjects = computed(() => {
  const all = [...(projects.value || [])]
  return all.sort((a, b) => {
    const orderA = a.order ?? Number.MAX_SAFE_INTEGER
    const orderB = b.order ?? Number.MAX_SAFE_INTEGER
    // Projects without `order` keep MAX_SAFE_INTEGER so they sort after ordered ones,
    // then fall back to date DESC among themselves.
    if (orderA !== orderB) return orderA - orderB
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })
})

if (!projects.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Projects not found',
    fatal: true
  })
}

const visibleProjects = computed(() => {
  const all = sortedProjects.value
  if (!props.showMore || !props.initialLimit) return all
  return all.slice(0, props.initialLimit)
})

const hasMore = computed(() => {
  if (!props.showMore || !props.initialLimit) return false
  return (sortedProjects.value?.length || 0) > props.initialLimit
})

const showAll = ref(false)

const displayedProjects = computed(() => {
  if (!props.showMore || showAll.value) return sortedProjects.value
  return visibleProjects.value
})

function handleShowMore() {
  showAll.value = true
}
</script>

<template>
  <UPageSection
    title="پروژه‌ها"
    description="گزیده‌ای از پروژه‌هایی که روی آن‌ها کار کرده‌ام."
    :ui="{
      container: 'pt-0! gap-4!',
      title: 'text-right text-xl sm:text-xl lg:text-2xl font-medium',
      description: 'text-right mt-2 text-sm sm:text-md lg:text-sm text-muted'
    }"
  >
    <div class="mt-10 space-y-6">
      <Motion
        v-for="(project, index) in displayedProjects"
        :key="project.title"
        :initial="{ opacity: 0, transform: 'translateY(10px)' }"
        :while-in-view="{ opacity: 1, transform: 'translateY(0)' }"
        :transition="{ delay: 0.1 * index }"
        :in-view-options="{ once: true }"
      >
        <UCard
          :ui="{
            body: 'p-0 sm:p-0'
          }"
          class="overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-lg cursor-pointer"
          @click="
            $router.push(
              `/projects/${project.path?.replace('/projects/', '') || project.title.toLowerCase().replace(/\s+/g, '-')}`
            )
          "
        >
          <div class="flex flex-col md:flex-row">
            <!-- Project Image -->
            <div class="w-full shrink-0 md:w-[45%]">
              <NuxtImg
                :src="project.image"
                :alt="`تصویر پروژه ${project.title}`"
                class="aspect-video w-full object-cover md:h-full"
              />
            </div>

            <!-- Project Content -->
            <div class="flex min-w-0 flex-1 flex-col p-6">
              <!-- Header -->
              <div class="flex items-start justify-between gap-4">
                <div>
                  <h3 class="text-xl font-semibold text-highlighted">
                    {{ project.title }}
                  </h3>

                  <p class="mt-2 text-sm leading-6 text-muted">
                    {{ project.description }}
                  </p>
                </div>

                <UButton
                  :to="`/projects/${project.path?.replace('/projects/', '') || project.title.toLowerCase().replace(/\s+/g, '-')}`"
                  icon="i-lucide-arrow-left"
                  size="sm"
                  variant="ghost"
                  color="neutral"
                  aria-label="مشاهده جزئیات پروژه"
                />
              </div>

              <!-- Technologies -->
              <div class="mt-6 flex flex-wrap gap-2">
                <UBadge
                  v-for="tag in project.tags"
                  :key="tag"
                  :label="tag"
                  variant="subtle"
                  color="neutral"
                />
              </div>

              <!-- Visit -->
              <div class="mt-auto pt-6">
                <UButton
                  :to="`/projects/${project.path?.replace('/projects/', '') || project.title.toLowerCase().replace(/\s+/g, '-')}`"
                  rel="noopener noreferrer"
                  label="بازدید از پروژه"
                  icon="i-lucide-arrow-up-right"
                  variant="outline"
                  color="neutral"
                />
              </div>
            </div>
          </div>
        </UCard>
      </Motion>
    </div>

    <div
      v-if="hasMore && !showAll"
      class="flex justify-center mt-3"
    >
      <UButton
        label="نمایش پروژه‌های بیشتر"
        color="neutral"
        variant="outline"
        trailing-icon="i-lucide-chevron-down"
        @click="handleShowMore"
      />
    </div>
  </UPageSection>
</template>
