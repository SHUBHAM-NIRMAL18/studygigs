import { PrismaClient } from '@/lib/generated-client'
import path from 'path'

// Read DATABASE_URL from environment variables
export let databaseUrl = process.env.DATABASE_URL

if (databaseUrl && databaseUrl.startsWith('file:')) {
  const relativePath = databaseUrl.replace(/^file:/, '')
  if (!path.isAbsolute(relativePath)) {
    // Resolve relative path to absolute using process.cwd() (the frontend/ directory)
    const absolutePath = path.resolve(process.cwd(), relativePath)
    // Convert backslashes to forward slashes to prevent escape character corruption in the Prisma Rust engine
    const normalizedPath = absolutePath.replace(/\\/g, '/')
    databaseUrl = `file:${normalizedPath}`
  } else {
    const normalizedPath = relativePath.replace(/\\/g, '/')
    databaseUrl = `file:${normalizedPath}`
  }
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ['query'],
    ...(databaseUrl
      ? {
          datasources: {
            db: {
              url: databaseUrl,
            },
          },
        }
      : {}),
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db