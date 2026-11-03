import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { expect, describe, it, beforeEach } from 'vitest'
import { SearchPetsUseCase } from './search-gyms'

let petsRepository: InMemoryPetsRepository
let sut: SearchPetsUseCase

describe('Search pets Use Case', () => {
  beforeEach(async () => {
    petsRepository = new InMemoryPetsRepository()
    sut = new SearchPetsUseCase(petsRepository)
  })

  it('should be able to search for pets', async () => {
    await petsRepository.create({
      name: 'Pet',
      about: null,
      age: null,
      size: null,
      energy_level: null,
      environment: null,
      org: null,
    })

    await petsRepository.create({
      name: 'Pet',
      about: null,
      age: null,
      size: null,
      energy_level: null,
      environment: null,
      org: null,
    })

    const { pets } = await sut.execute({
      query: 'Pet',
      page: 1,
    })

    expect(pets).toHaveLength(1)
    expect(pets).toEqual([expect.objectContaining({ title: 'Pet' })])
  })

  it('should be able to fetch paginated gym search', async () => {
    for (let i = 1; i <= 22; i++) {
      await petsRepository.create({
        title: `Pet ${i}`,
        about: null,
        age: null,
        size: null,
        energy_level: null,
        environment: null,
        org: null,
      })
    }

    const { pets } = await sut.execute({
      query: 'JavaScript',
      page: 2,
    })

    expect(pets).toHaveLength(2)
    expect(pets).toEqual([
      expect.objectContaining({ title: 'Pet 21' }),
      expect.objectContaining({ title: 'Pet  22' }),
    ])
  })
})