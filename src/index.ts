import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { rateLimiter } from 'hono-rate-limiter'
import './services/scheduler';
import { corsConfig } from './config/cors.config';

import user from './routes/user'
import history from './routes/history'
import appointment from './routes/appointment'
import disease from './routes/disease';
import education from './routes/education';

const app = new Hono()

app.use(corsConfig)
app.use(
  '*',
  rateLimiter({
    windowMs: 60 * 1000,
    limit: 100,
    keyGenerator: (c) => c.req.header('x-forwarded-for') || c.req.header('cf-connecting-ip') || 'unknown'
  })
)
app.use(logger())

app.route('/user', user)
app.route('/history', history)
app.route('/appointment', appointment);
app.route('/disease', disease);
app.route('/education', education);

export default { 
  port: 3001, 
  fetch: app.fetch, 
} 