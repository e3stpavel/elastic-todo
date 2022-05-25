import { H3Error, sendError } from 'h3'
import { client } from '~/server/api/client'
import type { Todo } from '~/composables/Todo'

// ADD USING BODY
export default defineEventHandler(async (event) => {
  const res = event.res
  const body: { listId: string; todoText: string } = await useBody(event)

  // check the connection to the client
  if (!await client.ping())
    return sendError(event, new H3Error('Could not get pong from database!'), true)

  // try to add todo
  try {
    const todo: Todo = {
      text: body.todoText,
      assignedAt: new Date().toISOString(),
      status: false,
    }

    // index must be lowercase only
    // for now dont have enought time to figure the better solution
    // will just lowercase the base64
    // TODO: this should be fixed
    await client.index({
      index: `list-${body.listId.toLowerCase()}`,
      document: todo,
    })

    res.writeHead(201, { 'Content-Type': 'application/json' })
    res.write(JSON.stringify({ todo }))
    res.end()
  }
  catch (e) {
    return sendError(event, new H3Error(e), true)
  }
})
