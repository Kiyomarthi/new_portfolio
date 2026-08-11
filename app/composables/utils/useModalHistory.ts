import { ref, watch, onBeforeUnmount } from 'vue'

type ModalItem = {
  id: string
  close: () => void
}

function generateUniqueId(): string {
  const timestamp = Date.now()
  const random = Math.floor(Math.random() * 1_000_000)
  return `id-${timestamp}-${random}`
}

const modalStack = ref<ModalItem[]>([])
let initialized = false

export function useModalWithHistory(open: Ref<boolean>) {
  const modalId = generateUniqueId()

  const closeTopModal = () => {
    const topModal = modalStack.value.at(-1)
    if (!topModal) return
    modalStack.value.pop()
    topModal.close()
  }

  const popstateHandler = (event: PopStateEvent) => {
    const topModal = modalStack.value.at(-1)
    if (!topModal) return
    modalStack.value.pop()
    topModal.close()
  }

  if (import.meta.client && !initialized) {
    initialized = true
    window.addEventListener('popstate', popstateHandler)
  }

  watch(
    open,
    (value) => {
      if (value) {
        modalStack.value.push({
          id: modalId,
          close: () => {
            open.value = false
          }
        })
        window.history.pushState({ __modal__: true, modalId }, '')
      } else {
        modalStack.value = modalStack.value.filter(
          item => item.id !== modalId
        )
      }
    },
    { immediate: true }
  )

  onBeforeUnmount(() => {
    modalStack.value = modalStack.value.filter(item => item.id !== modalId)
  })

  return {
    modalStack,
    closeTopModal
  }
}
