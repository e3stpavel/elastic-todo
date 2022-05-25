<script setup lang="ts">
import PlusIcon from '~icons/ph/plus-bold'
import type { Todo } from '~/composables/Todo'

const props = defineProps<{
  listId: string
}>()

const isAdded = ref(false)
const renderToast = ref(false)

onMounted(() => {
  const form = document.querySelector<HTMLFormElement>(`#todo-prompt-form-${props.listId}`)!
  const input = document.querySelector<HTMLInputElement>(`#todo-prompt-input-${props.listId}`)!

  input.addEventListener('blur', (e: Event) => {
    form.requestSubmit()
  })

  form.addEventListener('submit', async (e: Event) => {
    e.preventDefault()
    input.blur()

    console.log('adding..')
    const response = await $fetch<{ todo: Todo }>('/api/todos/add', {
      method: 'post',
      body: {
        listId: props.listId,
        todoText: input.value,
      },
    })

    if (!response.todo) {
      isAdded.value = false
      renderToast.value = true
      setTimeout(() => renderToast.value = false, 1500)
      return
    }

    isAdded.value = true
    renderToast.value = true
    setTimeout(() => renderToast.value = false, 1500)

    input.value = ''
  })
})
</script>

<template>
  <div id="add_todo" class="w-full flex flex-row py-4 px-6 items-center text-gray-700 bg-gray-100 gap-x-4 rounded-3xl">
    <PlusIcon class="w-8 h-8" />
    <div class="flex flex-col">
      <span class="text-gray-600 uppercase text-sm">Add new task</span>
      <form :id="`todo-prompt-form-${props.listId}`">
        <input :id="`todo-prompt-input-${props.listId}`" type="text" name="todo" placeholder="Start typing...">
      </form>
    </div>

    <MainToast
      :class="renderToast ? 'visible' : 'invisible'"
      :state="isAdded"
      :text="isAdded ? 'Assigned' : 'Error assigning this task!'"
    />
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
