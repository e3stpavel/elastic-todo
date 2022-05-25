import { H3Error, sendError } from 'h3'
import { client } from '~/server/api/client'

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

    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.write(JSON.stringify({ hits }))
    res.end()
  }
  catch (e) {
    return sendError(event, new H3Error(e), true)
  }
})
