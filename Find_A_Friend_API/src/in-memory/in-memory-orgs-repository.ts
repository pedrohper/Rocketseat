import { UsersRepository } from '@/repositories/users-repository'
import { User, Prisma } from '@prisma/client'

export class InMemoryOrgsRepository implements OrgsRepository {
  public items: User[] = []

  async findByEmail(email: string) {
    const org = this.items.find((item) => item.email === email)

    if (!org) {
      return null
    }

    return org
  }

  async create(data: Prisma.OrgCreateInput) {
    const org = {
      id: 'org-1',
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      adress: data.adress,
      whatsapp: data.whatsapp,
      city: data.city,
      created_at: new Date(),
    }

    this.items.push(org)

    return org
  }
}