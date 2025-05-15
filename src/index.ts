import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'

const app = new Hono()

app.use('*', cors())
app.use(logger())

//test

Bun.serve({
  fetch(req) {
    return app.fetch(req)
  },
  port: 3001,
})

export default app
