<script setup lang="ts">
import PlusIcon from '~icons/ph/plus-bold'
</script>

<template>
  <div class="w-full flex flex-row py-4 px-6 items-center text-gray-700 bg-gray-100 gap-x-4 rounded-3xl">
    <PlusIcon class="w-8 h-8" />
    <div class="flex flex-col">
      <span class="text-gray-600 uppercase text-sm">Add new task</span>
      <input id="todo" type="text" name="todo" placeholder="Start typing...">
    </div>
  </div>
</template>

<style>
input {
  font-family: 'Tosh A';
  border: 0;
  background: transparent;

  @apply text-2xl text-dark placeholder-gray-700 outline-none;
}
</style>
