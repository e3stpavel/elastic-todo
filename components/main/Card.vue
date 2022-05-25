<script setup lang="ts">
import DotsIcon from '~icons/ph/dots-six-vertical-bold'
import XIcon from '~icons/ph/x-bold'

const props = defineProps<{
  todoId: string
  addedAt: Date
  text: string
  status: boolean // false - not done, true - done
}>()

const status = ref(props.status)
const todo = ref(props.text)

const markAsDone = () => {
  console.log('done')
  status.value = true
}

const markAsUnDone = () => {
  console.log('undone')
  status.value = false
}

const deleteSelf = () => {
  console.log('deleting...')
}

onMounted(() => {
  const input = document.querySelector<HTMLInputElement>(`#todo-input-${props.todoId}`)!

  input.addEventListener('input', () => {
    console.log('changinh')
    todo.value = input.value
  })
})

// TODO: make it work as component
// TODO: assign different colors randomly
</script>

<template>
  <div class="w-full flex flex-row py-4 pl-6 pr-5 items-center text-gray-700 bg-gray-100 gap-x-6 rounded-3xl">
    <div
      class="flex items-center justify-center border-2 border-blue rounded-full w-6 h-6 cursor-pointer"
      v-on="status ? { click: () => markAsUnDone() } : { click: () => markAsDone() }"
    >
      <div v-if="status" class="w-4 h-4 bg-blue rounded-full" />
    </div>
    <div class="flex flex-col">
      <span
        v-if="status"
        class="text-gray-600 uppercase text-sm"
      >
        Done
      </span>
      <span v-else class="text-gray-600 uppercase text-sm">
        Added on {{ addedAt.toLocaleString('en-US', { day: '2-digit', month: 'long', year: 'numeric' }) }}
      </span>

      <input
        :id="`todo-input-${props.todoId}`"
        type="text"
        name="todo"
        :value="todo"
        :class="status ? 'line-through text-gray-700' : ''"
        :disabled="status"
      >
    </div>
    <XIcon v-if="status" class="ml-auto mr-0 w-6 h-6 text-red opacity-80 cursor-pointer" @click="deleteSelf()" />
    <DotsIcon v-else class="ml-auto mr-0 w-6 h-6" />
  </div>
</template>
