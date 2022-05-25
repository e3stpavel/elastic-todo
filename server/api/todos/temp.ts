import { sendError } from 'h3'
import { client } from '~/server/api/client'

// ADD USING BODY
export default defineEventHandler(async (event) => {
  const res = event.res
  const body: { listId: string; todoText: string } = await useBody(event)

  // check the connection to the client
  if (!await client.ping())
    return sendError(event, new Error('Could not get pong from database!'))

  // try to add todo
  try {
    const todo = {
      text: body.todoText,
      assignedAt: new Date().toISOString(),
      status: false,
    }

    await client.index({
      index: body.listId,
      document: todo,
    })

    res.writeHead(201, { 'Content-Type': 'application/json' })
    res.write(JSON.stringify({ todo }))
    res.end()
  }
  catch (e) {
    return sendError(event, new Error('Error occured'))
  }
})
