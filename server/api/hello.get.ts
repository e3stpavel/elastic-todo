import type { IncomingMessage, ServerResponse } from 'http'

export default async (req: IncomingMessage, res: ServerResponse) => {
  // console.log(req.url)

  res.writeHead(200, { 'Content-Type': 'application/json' })
  res.write(JSON.stringify({ hello: 'me' }))
  res.end()
}

// export default async (
//   req: { url: any; method: any },
//   res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message: string }): void; new(): any } } },
//   next: () => void,
// ) => {
//   await client.index({
//     index: 'logs',
//     document: {
//       endpoint: req.url,
//       method: req.method,
//       dateTime: new Date().toISOString(),
//     },
//   })
//     // .then((response) => {
//     //   res.status(200).json({
//     //     message: `logs indexed: ${response.result}`,
//     //   })
//     // })
//     .catch((error) => {
//       console.error(error)
//     })

//   next()
// }
