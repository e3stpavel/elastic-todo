import { client } from '~/server/api/client'

export default async (req) => {
  // await client.index({
  //   index: 'logs',
  //   document: {
  //     endpoint: req.url,
  //     method: req.method,
  //     dateTime: new Date().toISOString(),
  //   },
  // }).catch(error => console.error(error))
}
