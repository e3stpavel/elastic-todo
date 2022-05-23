<script setup lang="ts">
const props = defineProps<{
  text?: string
  icon?: object | string
}>()
</script>

<template>
  <div class="flex flex-row gap-x-1 text-xl text-blue hover:(underline cursor-pointer)">
    <span v-if="props.text">{{ text }}</span>
    <component :is="props.icon" v-if="props.icon" />
  </div>
</template>
