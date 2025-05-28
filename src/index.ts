import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'
import './services/scheduler';

import user from './routes/user'
import history from './routes/history'
import appointment from './routes/appointment'
import disease from './routes/disease';
import education from './routes/education';

const app = new Hono()

app.use('*', cors())
app.use(logger())

app.route('/api/user', user)
app.route('/api/history', history)
app.route('/api/appointment', appointment);
app.route('/api/disease', disease);
app.route('/api/education', education);

Bun.serve({
  fetch(req) {
    return app.fetch(req)
  },
  port: 3001,
})

export default app
