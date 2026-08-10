<script setup lang="ts">
const props = defineProps<{
  images: Array<{ src: string; alt: string }>;
  url: string;
}>();

const showModal = ref(false);
const currentSlide = ref(0);

const displayImages = computed(() => {
  return props.images?.slice(0, 4) || [];
});

const additionalCount = computed(() => {
  return Math.max(0, (props.images?.length || 0) - 4);
});

function openModal(index: number = 0) {
  currentSlide.value = index;
  showModal.value = true;
}

const open = ref<boolean>(false);
</script>

<template>
  <div target="_blank" class="grid grid-cols-3 gap-2" @click="open = true">
    <!-- First image (main, larger) -->
    <div
      v-if="displayImages[0]"
      class="col-span-3 row-span-2 relative overflow-hidden rounded-lg cursor-pointer group"
    >
      <NuxtImg
        :src="displayImages[0].src"
        :alt="displayImages[0].alt"
        class="w-full max-h-[400px] object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div
        class="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center"
      >
        <span
          class="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/50 text-white px-4 py-2 rounded-full text-sm"
        >
          مشاهده تصاویر
        </span>
      </div>
    </div>

    <!-- Second image -->
    <div
      v-if="displayImages[1]"
      class="relative overflow-hidden rounded-lg cursor-pointer group h-40"
    >
      <NuxtImg
        :src="displayImages[1].src"
        :alt="displayImages[1].alt"
        class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div
        class="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"
      />
    </div>

    <!-- Third image -->
    <div
      v-if="displayImages[2]"
      class="relative overflow-hidden rounded-lg cursor-pointer group h-40"
    >
      <NuxtImg
        :src="displayImages[2].src"
        :alt="displayImages[2].alt"
        class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div
        class="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"
      />
    </div>

    <!-- Fourth slot: image or +N overlay -->
    <div
      v-if="displayImages[3]"
      class="relative overflow-hidden rounded-lg cursor-pointer group h-40"
      @click="openModal(3)"
    >
      <NuxtImg
        :src="displayImages[3].src"
        :alt="displayImages[3].alt"
        class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div
        v-if="additionalCount > 0"
        class="absolute inset-0 bg-black/50 flex items-center justify-center group-hover:bg-black/60 transition-colors duration-300"
      >
        <span class="text-white text-2xl font-semibold">+{{ additionalCount }}</span>
      </div>
      <div
        v-else
        class="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"
      />
    </div>
    <!-- No fourth image but additional images exist -->
    <!-- <div
      v-else-if="additionalCount > 0"
      class="relative overflow-hidden rounded-lg cursor-pointer group h-40 bg-elevated"
      @click="openModal(3)"
    >
      <div
        class="absolute inset-0 flex items-center justify-center bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300"
      >
        <span class="text-primary text-2xl font-semibold">+{{ additionalCount }}</span>
      </div>
    </div> -->

    <WidgetResponseModal v-model="open" fullscreen>
      <div dir="ltr" class="w-full max-w-xl mx-auto">
        <u-carousel
          v-slot="{ item, index }"
          loop
          arrows
          dots
          wheel-gestures
          :prev="{ color: 'neutral', variant: 'solid' }"
          :next="{ color: 'neutral', variant: 'solid' }"
          :items="displayImages"
          class="w-full"
        >
          <nuxt-img
            :src="item?.src"
            :alt="`تصویر ${index + 1}`"
            width="640"
            height="640"
            loading="lazy"
            class="w-full h-full object-cover rounded-lg"
          />
        </u-carousel>
      </div>
    </WidgetResponseModal>
  </div>

  <!-- Modal with carousel -->
  <!-- <UModal v-model="showModal">
    <div class="relative">
      <UButton
        icon="i-lucide-x"
        color="neutral"
        variant="ghost"
        class="absolute top-4 right-4 z-10"
        @click="showModal = false"
      />

      <UCarousel
        v-model="currentSlide"
        :items="images"
        :arrows="images.length > 1"
        dots
        class="w-full"
      >
        <template #default="{ item }">
          <div class="flex items-center justify-center p-4">
            <NuxtImg
              :src="item.src"
              :alt="item.alt"
              class="max-h-[70vh] w-full object-contain rounded-lg"
            />
          </div>
        </template>
      </UCarousel>
    </div>
  </UModal> -->
</template>
