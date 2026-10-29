import { Router } from 'express'

import { readJsonFile } from '../lib/read-json-file.js'

export const staticDataRouter = Router()

staticDataRouter.get('/json-server', async (_request, response, next) => {
  try {
    response.json(await readJsonFile('data.json'))
  } catch (error) {
    next(error)
  }
})
