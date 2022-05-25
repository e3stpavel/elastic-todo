<script setup lang="ts">
// working not as expected
// const hello = ref('')
// const { data, pending, error } = await useLazyAsyncData('hello', () => $fetch('/api/hello'), { server: false })
// hello.value = data.value

const props = defineProps<{
  listId: string
}>()

// using default fetch
const data = ref({})
const pending = ref(true)

onMounted(async () => {
  const response = await fetch('/api/hello')
  data.value = await response.json()
  pending.value = !data.value
})
</script>

<template>
  <div class="pt-24">
    <div class="px-6 flex flex-col gap-y-4">
      <MainPrompt />

      <p>
        {{ data }}
      </p>

      <template v-if="pending">
        <div
          v-for="n in 2" :key="n"
          class="w-full flex flex-row py-4 pl-6 pr-5 items-center bg-gray-100 gap-x-6 rounded-3xl"
        >
          <div class="flex items-center justify-center border-2 border-gray-300 rounded-full w-6 h-6" />
          <div class="flex flex-col w-3/4">
            <div class="w-1/3 h-4.5 bg-gray-300 rounded-lg mb-1" />
            <div class="w-3/4 h-9 bg-gray-300 rounded-xl" />
          </div>
          <div class="ml-auto mr-0 w-6 h-6 rounded-lg bg-gray-200" />
        </div>
      </template>
    </div>
    <div class="flex flex-row justify-between items-baseline pt-14 pb-4">
      <h2>Done</h2>
      <ButtonSecondary text="Clear" />
    </div>
    <div class="px-6 flex flex-col gap-y-4">
      <MainCard />
      <MainCard />
      <MainCard />
      <MainCard />
    </div>
  </div>
</template>
