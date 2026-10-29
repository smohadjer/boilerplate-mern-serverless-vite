import 'dotenv/config'

import express, { type ErrorRequestHandler } from 'express'

import { rejectPostRequests } from './middleware/reject-post-requests.js'
import { fruitsRouter } from './routes/fruits.js'
import { healthRouter } from './routes/health.js'
import { staticDataRouter } from './routes/static-data.js'
import { usersRouter } from './routes/users.js'

export const app = express()

app.disable('x-powered-by')
app.use('/api', rejectPostRequests)
app.use(express.json())

app.use('/api', healthRouter)
app.use('/api', staticDataRouter)
app.use('/api', usersRouter)
app.use('/api', fruitsRouter)

app.use('/api', (_request, response) => {
  response.status(404).json({ error: 'API route not found' })
})

const errorHandler: ErrorRequestHandler = (error, _request, response, _next) => {
  void _next
  if (error instanceof Error && error.message === 'DB_URI is not configured') {
    response.status(503).json({ error: error.message })
    return
  }

  console.error(error)
  response.status(500).json({ error: 'Internal server error' })
}

app.use(errorHandler)
