export default defineEventHandler(({ res, context }) => {
  // get by id
  // useless, at least for now

  res.writeHead(200, { 'Content-Type': 'application/json' })
  res.write(JSON.stringify({ data: context.params.id }))
  res.end()
})
