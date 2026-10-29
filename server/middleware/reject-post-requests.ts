import type { RequestHandler } from 'express'

export const rejectPostRequests: RequestHandler = (request, response, next) => {
  if (request.method === 'POST') {
    response.set('Allow', 'GET').status(405).json({ error: 'POST requests are not allowed' })
    return
  }

  next()
}
