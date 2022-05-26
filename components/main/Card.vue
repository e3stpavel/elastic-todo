<script setup lang="ts">
import DotsIcon from '~icons/ph/dots-six-vertical-bold'
import XIcon from '~icons/ph/x-bold'

const props = defineProps<{
  listId: string
  todoId: string
}>()

const todo = useTodos().value.find((todo) => {
  return todo.id === props.todoId
})

const markAsDone = async () => {
  try {
    const { updated }: { updated: { result: string } } = await $fetch(`/api/todos/${props.listId}`, {
      method: 'PUT',
      body: {
        id: todo.id,
        status: !todo.status,
      },
    })

    if (updated.result === 'updated')
      todo.status = true

    // else TODO: show error modal
  }
  catch (e) {
    console.error(e)
  }
}

const markAsUnDone = async () => {
  console.log('undone')
  try {
    const { updated }: { updated: { result: string } } = await $fetch(`/api/todos/${props.listId}`, {
      method: 'PUT',
      body: {
        id: todo.id,
        status: !todo.status,
      },
    })

    if (updated.result === 'updated')
      todo.status = false

    // else TODO: show error modal
  }
  catch (e) {
    console.error(e)
  }
}

const deleteSelf = () => {
  console.log('deleting...')
}

onMounted(() => {
  const input = document.querySelector<HTMLInputElement>(`#todo-input-${todo.id}`)!

  input.addEventListener('input', () => {
    console.log('changinh')
    todo.text = input.value
  })
})

// TODO: make it work as component
// TODO: assign different colors randomly
</script>

<template>
  <div class="w-full flex flex-row py-4 pl-6 pr-5 items-center text-gray-700 bg-gray-100 gap-x-6 rounded-3xl">
    <div
      class="flex items-center justify-center border-2 border-blue rounded-full w-6 h-6 cursor-pointer"
      v-on="todo.status ? { click: () => markAsUnDone() } : { click: () => markAsDone() }"
    >
      <div v-if="todo.status" class="w-4 h-4 bg-blue rounded-full" />
    </div>
    <div class="flex flex-col">
      <span
        v-if="todo.status"
        class="text-gray-600 uppercase text-sm"
      >
        Done
      </span>
      <span v-else class="text-gray-600 uppercase text-sm">
        Added on {{ new Date(todo.assignedAt).toLocaleString('en-US', { day: '2-digit', month: 'long', year: 'numeric' }) }}
      </span>

      <input
        :id="`todo-input-${todo.id}`"
        type="text"
        :name="`todo-input-${todo.id}`"
        :value="todo.text"
        :class="todo.status ? 'line-through text-gray-700' : ''"
        :disabled="todo.status"
      >
    </div>
    <XIcon v-if="todo.status" class="ml-auto mr-0 w-6 h-6 text-red opacity-80 cursor-pointer" @click="deleteSelf()" />
    <DotsIcon v-else class="ml-auto mr-0 w-6 h-6" />
  </div>
</template>
