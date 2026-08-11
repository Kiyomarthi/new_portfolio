<script setup lang="ts">
const { data: page } = await useAsyncData("contact", () => {
  return queryCollection("contact").first();
});
if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Page not found",
    fatal: true,
  });
}

const title = page.value?.seo?.title || page.value?.title;
const description = page.value?.seo?.description || page.value?.description;

useSeoMeta({
  title,
  ogTitle: title,
  description,
  ogDescription: description,
});

defineOgImage("Portfolio", { title, description });
</script>

<template>
  <ModelContact :page class="pt-10" />

  <!-- <UPage v-if="page">
    <UPageHero
      :title="page.title"
      :description="page.description"
      :ui="{
        title: 'mx-0! text-right',
        description: 'mx-0! text-right',
        links: 'justify-start',
      }"
    />
    <UPageSection
      :ui="{
        container: 'pt-0!',
      }"
    >
      <ModelContact :page />
    </UPageSection>
  </UPage> -->
</template>
