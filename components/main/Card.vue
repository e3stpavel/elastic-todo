<script setup lang="ts">
import DotsIcon from '~icons/ph/dots-six-vertical-bold'

// TODO: make it work as component
</script>

<template>
  <Suspense>
    <div class="w-full flex flex-row py-4 pl-6 pr-5 items-center text-gray-700 bg-gray-100 gap-x-6 rounded-3xl">
      <div class="flex items-center justify-center border-2 border-blue rounded-full w-6 h-6">
        <div class="w-4 h-4 bg-blue rounded-full" />
      </div>
      <div class="flex flex-col">
        <span class="text-gray-600 uppercase text-sm">Added on 2022</span>
        <input id="todo" type="text" name="todo" value="Hello from todo">
      </div>
      <DotsIcon class="ml-auto mr-0 w-6 h-6" />
    </div>

    <template #fallback>
      <div class="w-full flex flex-row py-4 pl-6 pr-5 items-center bg-gray-100 gap-x-6 rounded-3xl">
        <div class="flex items-center justify-center border-2 border-gray-300 rounded-full w-6 h-6" />
        <div class="flex flex-col">
          <div class="w-1/3 h-4.5 bg-gray-300 rounded-lg" />
          <div class="w-3/4 h-9 bg-gray-300 rounded-xl" />
        </div>
        <div class="ml-auto mr-0 w-6 h-6 rounded-lg bg-gray-300" />
      </div>
    </template>
  </Suspense>
</template>
