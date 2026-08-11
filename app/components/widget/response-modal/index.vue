<script setup lang="ts">
import { useModalWithHistory } from '~/composables/utils/useModalHistory'
import { useBreakpoints } from '~/composables/utils/useBreakpoints'

/// // props/emits /////
const open = defineModel<boolean>({
  default: false
})

const props = withDefaults(
  defineProps<{
    title?: string
    subtitle?: string
    headerClass?: string
    noClose?: boolean
    contentClass?: string
    mobileContentClass?: string
    fullscreen?: boolean

    /**
     * Mobile presentation mode
     * false => USlideover
     * true => UDrawer
     */
    drawer?: boolean

    /**
     * Drawer props
     */
    drawerDirection?: 'top' | 'right' | 'bottom' | 'left'
    drawerInset?: boolean
    drawerHandle?: boolean
    drawerHandleOnly?: boolean
    drawerOverlay?: boolean
    drawerModal?: boolean
  }>(),
  {
    drawer: false,

    drawerDirection: 'bottom',
    drawerInset: false,
    drawerHandle: true,
    drawerHandleOnly: false,
    drawerOverlay: true,
    drawerModal: true
  }
)

/// // composables/stores /////
const { lgAndUp } = useBreakpoints()
useModalWithHistory(open)

/// // computed /////
const contentMergedClass = computed(() => {
  const base = `${!props.fullscreen ? 'w-112.5' : ''} max-w-none p-4`

  return props.contentClass ? `${base} ${props.contentClass}` : base
})

const mobileContentMergedClass = computed(() => {
  const base = 'rounded-t-[10px]'

  return props.mobileContentClass
    ? `${base} ${props.mobileContentClass}`
    : base
})

/// // functions /////
const close = () => {
  open.value = false
}
</script>

<template>
  <!-- Desktop -->
  <u-modal
    v-if="lgAndUp"
    v-model:open="open"
    :title="title"
    :close="!noClose"
    :dismissible="!noClose"
    :description="subtitle"
    :ui="{
      content: contentMergedClass,
      overlay: 'bg-black/35 backdrop-blur-xs',
      header: ['p-4 min-h-max', headerClass]
    }"
    :fullscreen
  >
    <template #title>
      <slot name="title">
        {{ title }}
      </slot>
    </template>

    <template #body>
      <slot />
    </template>

    <template
      v-if="$slots.footer"
      #footer
    >
      <slot name="footer" />
    </template>
  </u-modal>

  <!-- Mobile Slideover -->
  <u-slideover
    v-else-if="!drawer"
    v-model:open="open"
    :dismissible="!noClose"
    :close="!noClose"
    side="bottom"
    :title="title"
    :description="subtitle"
    :ui="{
      overlay: 'bg-black/35 backdrop-blur-xs',
      content: mobileContentMergedClass
    }"
  >
    <template #title>
      <slot name="title">
        {{ title }}
      </slot>
    </template>

    <template #body>
      <slot />
    </template>

    <template
      v-if="$slots.footer"
      #footer
    >
      <slot name="footer" />
    </template>
  </u-slideover>

  <!-- Mobile Drawer -->
  <u-drawer
    v-else
    v-model:open="open"
    :title="title"
    :description="subtitle"
    :dismissible="!noClose"
    :direction="drawerDirection"
    :inset="drawerInset"
    :handle="drawerHandle"
    :handle-only="drawerHandleOnly"
    :overlay="drawerOverlay"
    should-scale-background
    set-background-color-on-scale
    :modal="drawerModal"
    :ui="{
      overlay: 'bg-black/35 backdrop-blur-xs',
      content: mobileContentMergedClass
    }"
  >
    <template #content>
      <div
        :class="mobileContentMergedClass"
        class="p-5 divide-y divide-accented touch-pan-y"
      >
        <div class="flex items-center justify-between gap-3 w-full pb-2">
          <div class="min-w-0 flex-1">
            <slot name="title">
              <div
                v-if="title"
                class="font-semibold"
              >
                {{ title }}
              </div>

              <div
                v-if="subtitle"
                class="text-muted text-sm mt-1"
              >
                {{ subtitle }}
              </div>
            </slot>
          </div>

          <u-button
            v-if="!noClose"
            icon="i-lucide-x"
            color="neutral"
            variant="ghost"
            square
            @click="close"
          />
        </div>
        <div class="py-2">
          <slot />
        </div>
        <slot name="footer" />
      </div>
    </template>
  </u-drawer>
</template>
