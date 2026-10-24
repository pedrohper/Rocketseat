import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'

export class PrismaOrgRepository {
  async create(data: Prisma.OrgCreateInput) {
    const org = await prisma.org.create({
      data,
    })

    return org
  }
}