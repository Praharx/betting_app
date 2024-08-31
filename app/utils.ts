import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'

export const runtime = "edge"

export const prisma = new PrismaClient().$extends(withAccelerate());