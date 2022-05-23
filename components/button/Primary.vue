<script setup lang="ts">
const props = defineProps<{
  text?: string
  icon?: object | string
}>()
</script>

<template>
  <div
    class="flex flex-row items-center justify-center rounded-full
    border border-dark py-4
    hover:(bg-blue text-white cursor-pointer)"
    :class="props.text ? 'px-6 gap-x-1' : 'px-5'"
  >
    <span v-if="props.text" class="text-xl">
      {{ text }}
    </span>
    <component :is="props.icon" v-if="props.icon" class="w-6 h-6" />
  </div>
</template>
