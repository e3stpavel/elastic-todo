import { H3Error, sendError } from 'h3'
import { client } from '~/server/api/client'
// DELETE ALL
export default defineEventHandler(async (event) => {
  const res = event.res
  const body: { listId: string } = await useBody(event)

  // check the connection to the client
  if (!await client.ping())
    return sendError(event, new H3Error('Could not get pong from database!'), true)

  try {
    const response = await client.deleteByQuery({
      index: `list-${body.listId.toLowerCase()}`,
      query: {
        match: {
          status: true,
        },
      },
    })

    res.writeHead(201, { 'Content-Type': 'application/json' })
    res.write(JSON.stringify({ deleted: response }))
    res.end()
  }
  catch (e) {
    return sendError(event, new H3Error(e), true)
  }
})
