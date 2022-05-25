<script setup lang="ts">
// TODO: randoly assign avatar for each new entry

const props = defineProps<{
  username: string
}>()
</script>

<template>
  <div
    class="w-16 h-16 bg-gray-100 rounded-full border border-dark relative"
  >
    <img class="w-full h-full overflow-hidden" src="~/assets/avatars/3DDD-4.png" alt="">
    <div
      class="absolute top-0 left-0 w-full h-full rounded-full bg-transparent
    opacity-0 flex justify-center items-center hover:(bg-dark bg-opacity-40 opacity-100 cursor-pointer)"
    >
      <span class="text-white text-2xl">{{ username.trim().slice(0, 2).toUpperCase() }}</span>
    </div>
  </div>
</template>
