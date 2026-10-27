import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { compare } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { OrgAlreadyExistsError } from './errors/org-already-exists-error'
import { RegisterOrgUseCase } from './register-org'

let orgsRepository: InMemoryOrgsRepository
let sut: RegisterOrgUseCase

const orgData = {
  name: 'Amigos de Patas',
  email: 'contato@amigosdepatas.com',
  password: '123456',
  whatsapp: '34999999999',
  address: 'Rua Exemplo, 100',
  city: 'Uberlândia',
}

describe('Register Org Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new RegisterOrgUseCase(orgsRepository)
  })

  it('should be able to register an org', async () => {
    const { org } = await sut.execute(orgData)

    expect(org.id).toEqual(expect.any(String))
  })

  it('should hash org password upon registration', async () => {
    const { org } = await sut.execute(orgData)

    const isPasswordCorrectlyHashed = await compare('123456', org.password_hash)

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {
    await sut.execute(orgData)

    await expect(() => sut.execute(orgData)).rejects.toBeInstanceOf(
      OrgAlreadyExistsError,
    )
  })
})
