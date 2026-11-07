import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { GetOrgProfileUseCase } from './get-org-profile'

let orgsRepository: InMemoryOrgsRepository
let sut: GetOrgProfileUseCase

describe('Get Org Profile Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new GetOrgProfileUseCase(orgsRepository)
  })

  it('should be able to get org profile', async () => {
    const createdOrg = await orgsRepository.create({
      name: 'Amigos de Patas',
      email: 'contato@amigosdepatas.com',
      password_hash: await hash('123456', 6),
      whatsapp: '34999999999',
      address: 'Rua Exemplo, 100',
      city: 'Uberlândia',
    })

    const { org } = await sut.execute({ orgId: createdOrg.id })

    expect(org.name).toEqual('Amigos de Patas')
  })

  it('should not be able to get org profile with wrong id', async () => {
    await expect(() =>
      sut.execute({ orgId: 'non-existing-id' }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
