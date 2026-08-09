<script setup lang="ts">
const { data: skillsPage } = await useAsyncData('skills-page', () => {
  return queryCollection('skills').first()
})
if (!skillsPage.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page not found',
    fatal: true
  })
}

const title = skillsPage.value?.seo?.title || skillsPage.value?.title
const description
  = skillsPage.value?.seo?.description || skillsPage.value?.description

useSeoMeta({
  title,
  ogTitle: title,
  description,
  ogDescription: description
})

defineOgImage('Portfolio', { title, description })
</script>

<template>
  <!-- <UPage v-if="skillsPage">
    <UPageHero
      :title="skillsPage.title"
      :description="skillsPage.description"
      :ui="{
        title: 'mx-0! text-left',
        description: 'mx-0! text-left',
        links: 'justify-start',
        container: '!pb-8 lg:pb-8 md:pb-8 !pt-14 lg:pt-14 md:pt-14'
      }"
    />
</UPage> -->
  <ModelSkills class="pt-14" />
</template>
