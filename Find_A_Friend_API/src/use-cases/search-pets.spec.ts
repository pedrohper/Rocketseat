import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { SearchPetsUseCase } from './search-pets'

let orgsRepository: InMemoryOrgsRepository
let petsRepository: InMemoryPetsRepository
let sut: SearchPetsUseCase

const orgData = {
  name: 'Amigos de Patas',
  email: 'contato@amigosdepatas.com',
  password_hash: 'hash',
  whatsapp: '34999999999',
  address: 'Rua Exemplo, 100',
}

const petData = {
  about: null,
  age: 'filhote',
  size: 'pequeno',
  energy_level: 'alta',
  environment: 'casa com quintal',
}

describe('Search Pets Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    petsRepository = new InMemoryPetsRepository(orgsRepository)
    sut = new SearchPetsUseCase(petsRepository)
  })

  it('should be able to search pets by city', async () => {
    const orgUdi = await orgsRepository.create({ ...orgData, city: 'Uberlândia' })
    const orgBh = await orgsRepository.create({
      ...orgData,
      email: 'bh@amigosdepatas.com',
      city: 'Belo Horizonte',
    })

    await petsRepository.create({ ...petData, name: 'Rex', org_id: orgUdi.id })
    await petsRepository.create({ ...petData, name: 'Mel', org_id: orgUdi.id })
    await petsRepository.create({ ...petData, name: 'Bob', org_id: orgBh.id })

    const { pets } = await sut.execute({ city: 'Uberlândia' })

    expect(pets).toHaveLength(2)
    expect(pets).toEqual([
      expect.objectContaining({ name: 'Rex' }),
      expect.objectContaining({ name: 'Mel' }),
    ])
  })

  it('should be able to filter pets by characteristics', async () => {
    const org = await orgsRepository.create({ ...orgData, city: 'Uberlândia' })

    await petsRepository.create({ ...petData, name: 'Rex', org_id: org.id })
    await petsRepository.create({
      ...petData,
      name: 'Thor',
      size: 'grande',
      org_id: org.id,
    })

    const { pets } = await sut.execute({ city: 'Uberlândia', size: 'grande' })

    expect(pets).toHaveLength(1)
    expect(pets).toEqual([expect.objectContaining({ name: 'Thor' })])
  })
})
