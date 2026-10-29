import { Router } from 'express'

import { getMongoClient } from '../db.js'

export const fruitsRouter = Router()

fruitsRouter.get(['/index', '/fruits'], async (_request, response, next) => {
  try {
    const client = getMongoClient()
    const database = client.db('boilerplate-react-serverless')
    const fruits = await database.collection('fruits').find({}).limit(100).toArray()
    response.json(fruits)
  } catch (error) {
    next(error)
  }
})
