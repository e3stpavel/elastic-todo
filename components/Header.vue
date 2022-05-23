<script setup lang="ts">
import ShareIcon from '~icons/basil/share'
import PlusIcon from '~icons/ph/plus-bold'

onMounted(() => {
  // TODO: on scroll plus button appears
})
</script>

<template>
  <div class="flex flex-row items-center justify-between">
    <h1>Todos</h1>

    <div class="flex flex-row gap-x-2">
      <ButtonPrimary :icon="PlusIcon" class="hidden" />
      <ButtonPrimary text="Share" :icon="ShareIcon" />
      <HeaderProfile />
    </div>
  </div>
</template>
