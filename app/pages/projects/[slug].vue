<script setup lang="ts">
const route = useRoute()

const slug = computed(() => {
  const path = Array.isArray(route.params.slug)
    ? route.params.slug.join('/')
    : route.params.slug
  return `/projects/${path}`
})

const projectName = computed(() => {
  return slug.value.replace('/projects/', '')
})

const { data: project } = await useAsyncData(`project-${slug.value}`, () =>
  queryCollection('projects').path(slug.value).first()
)

const { data: challenges } = await useAsyncData(`challenges-${slug.value}`, () =>
  queryCollection('projectChallenges').path(`/projects/${projectName.value}-challenges`).first()
)

if (!project.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Project not found',
    fatal: true
  })
}

const title = project.value?.seo?.title || project.value?.title
const description = project.value?.seo?.description || project.value?.description

useSeoMeta({
  title,
  ogTitle: title,
  description,
  ogDescription: description
})

if (project.value.images?.[0]?.src) {
  useSeoMeta({ ogImage: project.value.images[0].src })
} else if (project.value.image) {
  useSeoMeta({ ogImage: project.value.image })
} else {
  defineOgImage('Portfolio', {
    title,
    description,
    headline: 'Project'
  })
}
</script>

<template>
  <ModelProjectsDetail
    :project
    :challenges
  />
</template>
