import path from 'node:path'
import express from 'express'

import { app } from './app.js'

const port = Number(process.env.PORT) || 3000
const distPath = path.resolve(process.cwd(), 'dist')

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(distPath))
  app.use((request, response, next) => {
    if (request.method === 'GET' && request.accepts('html')) {
      response.sendFile(path.join(distPath, 'index.html'))
      return
    }

    next()
  })
}

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`)
})
