<script setup lang="ts">
interface SkillCategory {
  title: string;
  description: string;
  icon: string;
  skills: string[];
}

const skillCategories: SkillCategory[] = [
  {
    title: "UI & Design",
    description: "Design systems, interfaces and visual development.",
    icon: "i-lucide-palette",
    skills: ["Figma", "Tailwind CSS", "Vuetify", "SCSS"],
  },
  {
    title: "Frontend",
    description: "Modern web applications and user interfaces.",
    icon: "i-lucide-layout-template",
    skills: ["Vue.js", "Nuxt", "JavaScript", "TypeScript", "Pinia", "Axios"],
  },
  {
    title: "Backend",
    description: "APIs, server-side applications and infrastructure.",
    icon: "i-lucide-server",
    skills: ["REST API", "Node.js", "Redis", "Git"],
  },
  {
    title: "Mobile",
    description: "Cross-platform and native mobile development.",
    icon: "i-lucide-smartphone",
    skills: ["Flutter", "Dart", "Android"],
  },
  {
    title: "Database",
    description: "Data modeling, storage and management.",
    icon: "i-lucide-database",
    skills: ["MySQL", "Redis", "MySQL Workbench"],
  },
  {
    title: "Tools",
    description: "Development tools and workflow.",
    icon: "i-lucide-wrench",
    skills: ["Git", "GitHub", "VS Code", "Android Studio"],
  },
];
</script>

<template>
  <UPageSection
    title="Skills"
    description="Technologies and tools I work with."
    class="py-24"
  >
    <UPageGrid class="mt-10">
      <UCard
        v-for="category in skillCategories"
        :key="category.title"
        class="transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
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

              <p class="mt-1 text-sm text-muted">
                {{ category.description }}
              </p>
            </div>
          </div>
        </template>

        <div class="flex flex-wrap gap-2">
          <UBadge
            v-for="skill in category.skills"
            :key="skill"
            :label="skill"
            variant="subtle"
            color="neutral"
          />
        </div>

        <template #footer>
          <div class="flex items-center justify-between">
            <span class="text-xs text-dimmed">
              {{ category.skills.length }}
              {{ category.skills.length === 1 ? "skill" : "skills" }}
            </span>

            <UIcon name="i-lucide-arrow-up-right" class="size-4 text-dimmed" />
          </div>
        </template>
      </UCard>
    </UPageGrid>
  </UPageSection>
</template>
