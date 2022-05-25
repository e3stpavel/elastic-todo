// DELETE BY ID
export default defineEventHandler(({ res, context }) => {
  res.writeHead(200, { 'Content-Type': 'application/json' })
  res.write(JSON.stringify({ data: context.params.id }))
  res.end()
})
