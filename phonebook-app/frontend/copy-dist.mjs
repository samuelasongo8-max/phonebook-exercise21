import { cp, mkdir, rm } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const currentFilePath = fileURLToPath(import.meta.url)
const currentDirPath = path.dirname(currentFilePath)

const frontendDistPath = path.join(currentDirPath, 'dist')
const backendDistPath = path.join(currentDirPath, '..', 'backend', 'dist')

await rm(backendDistPath, { recursive: true, force: true })
await mkdir(path.dirname(backendDistPath), { recursive: true })
await cp(frontendDistPath, backendDistPath, { recursive: true })

console.log(`Copied ${frontendDistPath} to ${backendDistPath}`)