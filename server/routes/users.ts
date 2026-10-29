import { Router } from 'express'

import { readJsonFile } from '../lib/read-json-file.js'

export const usersRouter = Router()

usersRouter.get('/users', async (_request, response, next) => {
  try {
    response.json(await readJsonFile('users.json'))
  } catch (error) {
    next(error)
  }
})
