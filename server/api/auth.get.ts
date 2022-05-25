import { Buffer } from 'buffer'
// import jwt from 'jsonwebtoken'
import { faker } from '@faker-js/faker'
// const runtimeConfig = useRuntimeConfig()

// generating list id for every user
export default defineEventHandler(({ res }) => {
  // const key = runtimeConfig.jwtClientUriSecret
  const username = faker.internet.userName(faker.name.firstName())

  // const token = jwt.sign({
  //   username,
  //   agent: req.headers['user-agent'],
  //   dateTime: new Date().toISOString(),
  // }, key)

  const base64 = Buffer.from(`${new Date().toISOString()}, ${username}`).toString('base64url')
  // console.log(Buffer.from(base64, 'base64url').toString('ascii'))

  res.writeHead(200, { 'Content-Type': 'application/json' })
  res.write(JSON.stringify({ base64 }))
  res.end()
})
