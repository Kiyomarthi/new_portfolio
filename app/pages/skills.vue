<script setup lang="ts">
const { data: page } = await useAsyncData("skills", () => {
  return queryCollection("skills").first();
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
  <UPage v-if="page">
    <UPageHero
      :title="page.title"
      :description="page.description"
      :ui="{
        title: 'mx-0! text-left',
        description: 'mx-0! text-left',
        links: 'justify-start',
        container: '!pb-8 lg:pb-8 md:pb-8 !pt-14 lg:pt-14 md:pt-14',
      }"
    />
    <UPageSection
      :ui="{
        container: 'pt-0!',
      }"
    >
      <UPageGrid
        :ui="{
          base: 'md:lg:grid-cols-2 lg:grid-cols-2',
        }"
      >
        <Motion
          v-for="(category, index) in page.categories"
          :key="category.title"
          :initial="{ opacity: 0, transform: 'translateY(10px)' }"
          :while-in-view="{ opacity: 1, transform: 'translateY(0)' }"
          :transition="{ delay: 0.05 * index }"
          :in-view-options="{ once: true }"
        >
          <UCard
            :ui="{
              body: 'flex-1',
            }"
            class="transition-all duration-200 hover:-translate-y-1 hover:shadow-lg flex flex-col h-full"
          >
            <template #header>
              <div class="flex items-start gap-4">
                <div
                  class="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10"
                >
                  <UIcon :name="category.icon" class="size-5 text-primary" />
                </div>

                <div class="min-w-0">
                  <h3 class="font-semibold text-highlighted">
                    {{ category.title }}
                  </h3>

                  <!-- <p
                    v-if="category.description"
                    class="mt-1 text-sm text-muted"
                  >
                    {{ category.description }}
                  </p> -->
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
                  label: 'text-lg',
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
    </UPageSection>
  </UPage>
</template>
