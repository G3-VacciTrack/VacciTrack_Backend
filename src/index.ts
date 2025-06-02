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

app.route('/user', user)
app.route('/history', history)
app.route('/appointment', appointment);
app.route('/disease', disease);
app.route('/education', education);

Bun.serve({
  fetch(req) {
    return app.fetch(req)
  },
  port: 3001,
})

export default app