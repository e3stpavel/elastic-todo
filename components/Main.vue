<script setup lang="ts">
import type { Ref } from 'vue'
import type { Todo } from '../composables/Todo'
// working not as expected
// const hello = ref('')
// const { data, pending, error } = await useLazyAsyncData('hello', () => $fetch('/api/hello'), { server: false })
// hello.value = data.value

const props = defineProps<{
  listId: string
}>()

// using default fetch
const data: Ref<{ _index: string; _id: string; _source: Todo }[]> = ref()
const pending = ref(true)

const clearDoneTodos = () => {
  console.log('here')
  // TODO: delete done todos from database
}

onMounted(async () => {
  // const response = await $fetch('/api/todos/add', {
  //   method: 'post',
  //   body: {
  //     listId: props.listId,
  //     todoText: 'hello todo 2',
  //   },
  // })
  try {
    const { hits }
      = await $fetch<{ hits: { _index: string; _id: string; _source: Todo }[] }>(`/api/todos/all?listId=${props.listId}`)
    // const response = await fetch(`/api/todos/all?listId=${props.listId}`)
    // const { hits } = await response.json()
    console.log(hits)

    data.value = hits
    pending.value = !data.value
  }
  catch (e) {
    console.error(e)
  }
})

// TODO: use state to rerender the data
</script>

<template>
  <div class="pt-24">
    <!-- current todos wrapper -->
    <div class="px-6 flex flex-col gap-y-4">
      <MainPrompt
        :list-id="props.listId"
      />
      <MainCard
        v-for="hit in data"
        :key="hit._id"
        :todo-id="hit._id"
        :text="hit._source.text"
        :added-at="new Date(hit._source.assignedAt)"
        :status="hit._source.status"
      />

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
    <!-- end current todos wrapper -->

    <!-- done todos wrapper -->
    <div class="flex flex-row justify-between items-baseline pt-14 pb-4">
      <h2>Done</h2>
      <ButtonSecondary
        text="Clear"
        :class="pending ? '!text-gray-300' : ''"
        v-on="!pending ? { click: () => clearDoneTodos() } : {}"
      />
    </div>
    <div class="px-6 flex flex-col gap-y-4">
      <!-- <MainCard /> -->

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
    <!-- end done todos wrapper -->
  </div>
</template>
