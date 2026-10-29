import { readFile } from 'node:fs/promises'
import path from 'node:path'

export async function readJsonFile(fileName: string): Promise<unknown> {
  const filePath = path.join(process.cwd(), 'data', fileName)
  const contents = await readFile(filePath, 'utf8')
  return JSON.parse(contents) as unknown
}
