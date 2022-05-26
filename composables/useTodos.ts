import type { Todo } from './Todo'
export const useTodos = () => useState<Todo[]>('todos', () => [])
