<script setup lang="ts">
const { data: page } = await useAsyncData("index", () => {
  return queryCollection("index").first();
});
if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Page not found",
    fatal: true,
  });
}

useSeoMeta({
  title: page.value?.seo.title || page.value?.title,
  ogTitle: page.value?.seo.title || page.value?.title,
  description: page.value?.seo.description || page.value?.description,
  ogDescription: page.value?.seo.description || page.value?.description,
  ogImage: "/images/profile.jpg",
});
</script>

<template>
  <UPage v-if="page">
    <LandingHero :page />
    <UPageSection
      :ui="{
        container:
          'pt-0! block lg:blcok lg:blcok  gap-10! lg:gap-10! gap-10! pb-10!',
      }"
    >
      <LandingAbout :page />
      <LandingWorkExperience :page />
    </UPageSection>
    <!-- <LandingBlog :page /> -->
    <!-- <LandingTestimonials :page /> -->
    <ModelSkills :show-more="true" :initial-limit="6" />
    <ModelProjectsList :show-more="true" :initial-limit="3" />
    <LandingFAQ :page />
  </UPage>
</template>
