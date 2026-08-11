<script setup lang="ts">
import type { ProjectsCollectionItem } from '@nuxt/content'

defineProps<{
  project: ProjectsCollectionItem | null | undefined
  challenges?: ProjectsCollectionItem | null
}>()

const route = useRoute()
const backPath = computed(() => {
  return route.query.from ? String(route.query.from) : '/projects'
})
</script>

<template>
  <UPage v-if="project">
    <!-- Back link -->
    <div class="py-8">
      <ULink
        :to="backPath"
        class="text-sm text-muted hover:text-highlighted transition-colors flex items-center gap-2"
      >
        <UIcon
          name="i-lucide-arrow-right"
          class="size-4"
        />
        بازگشت به پروژه‌ها
      </ULink>
    </div>

    <!-- Image Gallery -->
    <ModelProjectsGallery
      v-if="project.images && project.images.length > 0"
      :images="project.images"
      :url="project.url"
    />

    <!-- Title and main link -->
    <div class="mt-12 mb-8">
      <NuxtLink
        v-if="project.url"
        :to="project.url"
        target="_blank"
        rel="noopener noreferrer"
        class="group"
      >
        <h1
          class="text-4xl font-semibold text-highlighted inline-flex items-center gap-3 hover:text-primary transition-colors"
        >
          {{ project.title }}
          <UIcon
            name="i-lucide-external-link"
            class="size-6 text-muted group-hover:text-primary transition-colors"
          />
        </h1>
      </NuxtLink>
      <h1
        v-else
        class="text-4xl font-semibold text-highlighted"
      >
        {{ project.title }}
      </h1>

      <!-- Project URL as separate link -->
      <div
        v-if="project.url"
        class="mt-4"
      >
        <UButton
          :to="project.url"
          rel="noopener noreferrer"
          label="بازدید از پروژه"
          icon="i-lucide-external-link"
          color="primary"
          variant="solid"
        />
      </div>
    </div>

    <!-- Description -->
    <p class="text-lg text-muted leading-relaxed max-w-3xl text-right">
      {{ project.description }}
    </p>

    <!-- Additional Links -->
    <!-- <ModelProjectsLinks
      :links="project.links"
      :main-url="project.url"
      :title="project.title"
    /> -->

    <!-- Technologies -->
    <ModelProjectsTechnologies
      :technologies="project.technologies"
      :tags="project.tags"
    />

    <!-- Metadata (company, dates) -->
    <ModelProjectsMetadata
      :company="project.company"
      :start-date="project.startDate"
      :end-date="project.endDate"
    />

    <!-- Challenges & Experience -->
    <ModelProjectsChallenges :content="challenges?.body" />
  </UPage>
</template>
