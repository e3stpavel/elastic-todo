import { H3Error, sendError } from 'h3'
import { client } from '~/server/api/client'
import type { Todo } from '~/composables/Todo'

// GET ALL BY LIST ID
export default defineEventHandler(async (event) => {
  const query = useQuery(event)
  const res = event.res

  // check the connection to the client
  if (!await client.ping())
    return sendError(event, new H3Error('Could not get pong from database!'), true)

  try {
    const listId = query.listId as string
    const response = await client.search({
      index: `list-${listId.toLowerCase()}`,
    })

    const hits = response.hits.hits

    const result = hits.map((hit) => {
      const source = hit._source as { text: string; assignedAt: string; status: boolean }
      const todo: Todo = {
        id: hit._id,
        text: source.text,
        assignedAt: source.assignedAt,
        status: source.status,
      }

      return todo
    })

    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.write(JSON.stringify({ hits: result }))
    res.end()
  }
  catch (e) {
    // catch 404
    if (e.meta.body.status === 404) {
      res.writeHead(404, 'Index not found')
      return res.end()
    }

    return sendError(event, new H3Error(e), true)
  }
})
