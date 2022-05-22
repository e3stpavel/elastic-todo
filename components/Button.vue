<script setup lang="ts">
import ShareIcon from '~icons/basil/share'

const props = defineProps<{
  name?: string
}>()

// TODO: pass an icon as component
</script>

<template>
  <div
    class="flex flex-row items-center justify-center rounded-full
    border border-black px-6 py-4 gap-x-1
    hover:(bg-blue text-white)"
  >
    <span class="text-xl">
      {{ props.name }}
    </span>
    <ShareIcon />
  </div>
</template>
