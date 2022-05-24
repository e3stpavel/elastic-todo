<script setup lang="ts">
import CheckmarkIcon from '~icons/ph/check-circle-bold'
</script>

<template>
  <div
    class="fixed top-14 left-1/2 transform -translate-x-1/2 px-6 py-4
  bg-blue text-white border border-dark rounded-full flex flex-row
  items-center gap-x-1"
  >
    <CheckmarkIcon class="text-xl" />
    <span class="text-xl">Copied</span>
  </div>
</template>
