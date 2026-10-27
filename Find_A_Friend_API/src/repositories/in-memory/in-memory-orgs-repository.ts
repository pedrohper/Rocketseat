import { Org, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { OrgsRepository } from '../orgs-repository'

export class InMemoryOrgsRepository implements OrgsRepository {
  public items: Org[] = []

  async findById(id: string) {
    return this.items.find((item) => item.id === id) ?? null
  }

  async findByEmail(email: string) {
    return this.items.find((item) => item.email === email) ?? null
  }

  async create(data: Prisma.OrgCreateInput) {
    const org: Org = {
      id: data.id ?? randomUUID(),
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      whatsapp: data.whatsapp,
      address: data.address,
      city: data.city,
      created_at: new Date(),
    }

    this.items.push(org)

    return org
  }
}
