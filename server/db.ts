import { MongoClient } from 'mongodb'

let client: MongoClient | undefined

export function getMongoClient() {
  const uri = process.env.DB_URI

  if (!uri) {
    throw new Error('DB_URI is not configured')
  }

  client ??= new MongoClient(uri)
  return client
}
