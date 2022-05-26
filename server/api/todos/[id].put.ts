import { H3Error, sendError } from 'h3'
import { client } from '~/server/api/client'
// UPDATE BY ID
export default defineEventHandler(async (event) => {
  const res = event.res
  const body: { id: string; text?: string; status?: boolean } = await useBody(event)

  // check the connection to the client
  if (!await client.ping())
    return sendError(event, new H3Error('Could not get pong from database!'), true)

  try {
    const response = await client.update({
      index: `list-${event.context.params.id.toLowerCase()}`,
      id: body.id,
      doc: body,
    })

    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.write(JSON.stringify({ updated: response }))
    res.end()
  }
  catch (e) {
    return sendError(event, new H3Error(e), true)
  }
})
