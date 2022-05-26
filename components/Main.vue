<script setup lang="ts">
import type { Todo } from '~/composables/Todo'
// working not as expected
// const hello = ref('')
// const { data, pending, error } = await useLazyAsyncData('hello', () => $fetch('/api/hello'), { server: false })
// hello.value = data.value

const props = defineProps<{
  listId: string
}>()

const errors = ref(false)
const todos = useTodos()

const clearDoneTodos = async () => {
  try {
    const { deleted }: { deleted: { deleted: number; failures: [] } } = await $fetch('/api/todos/all', {
      method: 'DELETE',
      body: {
        listId: props.listId,
      },
    })

    if (deleted.failures.length === 0) {
      todos.value = todos.value.filter((todo) => {
        return !todo.status
      })
    }
  }
  catch (e) {
    console.error(e)
  }

  // TODO: delete done todos from database
}

onMounted(async () => {
  try {
    todos.value = []
    const { hits }
      = await $fetch<{ hits: Todo[] }>(`/api/todos/all?listId=${props.listId}`, {
        async onResponseError({ request, response, options }) {
          if (response.status === 404)
            errors.value = true
        },
      })
    // const response = await fetch(`/api/todos/all?listId=${props.listId}`)
    // const { hits } = await response.json()

    todos.value = hits
    if (todos.value.length < 1)
      errors.value = true
  }
  catch (e) {
    console.error(e)
  }
})
</script>

<template>
  <div class="pt-24">
    <!-- current todos wrapper -->
    <div class="px-6 flex flex-col gap-y-4">
      <MainPrompt
        :list-id="props.listId"
      />

      <p v-if="todos.length < 1" class="text-center">
        😶 Your list dont have any todos yet! Start adding!
      </p>

      <MainCard
        v-for="todo in todos.filter((todo) => {
          return !todo.status
        })"
        :key="todo.id"
        :list-id="props.listId"
        :todo-id="todo.id"
      />

      <template v-if="todos.length < 1 && !errors">
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
        :class="todos.length < 1 && !errors ? '!text-gray-300' : ''"
        v-on="!(todos.length < 1 && !errors) ? { click: () => clearDoneTodos() } : {}"
      />
    </div>
    <div class="px-6 flex flex-col gap-y-4">
      <MainCard
        v-for="todo in todos.filter((todo) => {
          return todo.status
        })"
        :key="todo.id"
        :list-id="props.listId"
        :todo-id="todo.id"
      />

      <template v-if="todos.length < 1 && !errors">
        <div
          class="w-full flex flex-row py-4 pl-6 pr-5 items-center bg-gray-100 gap-x-6 rounded-3xl"
        >
          <div class="flex items-center justify-center border-2 border-gray-300 rounded-full w-6 h-6">
            <div class="w-4 h-4 bg-gray-300 rounded-full" />
          </div>
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
