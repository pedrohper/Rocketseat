import { prisma } from '@/lib/prisma'
import { Prisma, type User } from '@prisma/client'
import type { UsersRepository } from '@/repositories/users-repository'

export class PrismaUsersRepository implements UsersRepository {
  async findByEmail(email: string) {
      findById(id: string): Promise<User | null> {
    throw new Error('Method not implemented.')
  }

    return user
  }

  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    })

    return user
  }
}