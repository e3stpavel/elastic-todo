<script setup lang="ts">
import ShareIcon from '~icons/basil/share'
import PlusIcon from '~icons/ph/plus-bold'

const isTop = ref(false)

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
      <ButtonPrimary :icon="PlusIcon" :class="isTop ? 'hidden' : 'block'" />
      <ButtonPrimary text="Share" :icon="ShareIcon" />
      <HeaderProfile />
    </div>
  </div>
</template>
