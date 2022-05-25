<script setup lang="ts">
import ShareIcon from '~icons/basil/share'
import PlusIcon from '~icons/ph/plus-bold'

const props = defineProps<{
  selfUri: string
  username: string
}>()

const isTop = ref(false)
const isCopied = ref(false)
const renderToast = ref(false)

const copySelfUri = (uri: string) => {
  // easier to do window.location.href but nevermind
  const link = `${window.location.protocol}//${window.location.host}/list-${uri}`

  navigator.clipboard.writeText(link).then(() => {
    isCopied.value = true
    renderToast.value = true

    setTimeout(() => renderToast.value = false, 1500)
  })
}

const goToTop = () => {
  document.body.scrollTop = 0
  document.documentElement.scrollTop = 0
}

onMounted(() => {
  const isYWindowPositionTop = (): boolean => {
    const top = window.screenY || document.documentElement.scrollTop
    return !(top > 20)
  }

  isTop.value = isYWindowPositionTop()

  document.addEventListener('scroll', () => {
    isTop.value = isYWindowPositionTop()
  })
})
</script>

<template>
  <div
    class="flex flex-row items-center justify-between bg-white pb-4 border-b"
    :class="isTop ? 'border-b-transparent' : 'border-b-dark'"
  >
    <h1>Todos</h1>

    <div class="flex flex-row gap-x-2">
      <ButtonPrimary :icon="PlusIcon" :class="isTop ? 'hidden' : 'block'" @click="goToTop()" />
      <ButtonPrimary text="Share" :icon="ShareIcon" @click="copySelfUri(selfUri)" />
      <HeaderProfile :username="username" />
    </div>

    <MainToast
      :class="renderToast ? 'visible' : 'invisible'"
      :state="isCopied"
      :text="isCopied ? 'Copied' : 'Error copying link!'"
    />
  </div>
</template>
