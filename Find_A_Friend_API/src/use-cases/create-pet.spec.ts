import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreatePetUseCase } from './create-pet'
import { OrgNotFoundError } from './errors/org-not-found-error'

let petsRepository: InMemoryPetsRepository
let orgsRepository: InMemoryOrgsRepository
let sut: CreatePetUseCase

const petData = {
  name: 'Rex',
  about: 'Muito brincalhão',
  age: 'filhote',
  size: 'pequeno',
  energyLevel: 'alta',
  environment: 'casa com quintal',
}

describe('Create Pet Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    orgsRepository = new InMemoryOrgsRepository()
    sut = new CreatePetUseCase(petsRepository, orgsRepository)
  })

  it('should be able to create a pet', async () => {
    const org = await orgsRepository.create({
      name: 'Amigos de Patas',
      email: 'contato@amigosdepatas.com',
      password_hash: 'hash',
      whatsapp: '34999999999',
      address: 'Rua Exemplo, 100',
      city: 'Uberlândia',
    })

    const { pet } = await sut.execute({ ...petData, orgId: org.id })

    expect(pet.id).toEqual(expect.any(String))
    expect(pet.org_id).toEqual(org.id)
  })

  it('should not be able to create a pet for a non-existing org', async () => {
    await expect(() =>
      sut.execute({ ...petData, orgId: 'org-inexistente' }),
    ).rejects.toBeInstanceOf(OrgNotFoundError)
  })
})
