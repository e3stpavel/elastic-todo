<script setup lang="ts">
import CheckmarkIcon from '~icons/ph/check-circle-bold'
import XIcon from '~icons/ph/x-circle-bold'

const props = defineProps<{
  // true - success, false - fail
  state: boolean
  text: string
}>()
</script>

<template>
  <div
    class="fixed top-14 left-1/2 transform -translate-x-1/2 px-6 py-4
  bg-blue text-white border border-dark rounded-full flex flex-row
  items-center gap-x-1"
    :class="props.state ? 'bg-blue' : 'bg-red'"
  >
    <component :is="props.state ? CheckmarkIcon : XIcon" class="text-xl" />
    <span class="text-xl">{{ text }}</span>
  </div>
</template>
