import { Pet, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { FindAllParams, PetsRepository } from '../pets-repository'
import { InMemoryOrgsRepository } from './in-memory-orgs-repository'

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []

  constructor(private orgsRepository: InMemoryOrgsRepository) {}

  async findAll(params: FindAllParams) {
    const orgIdsInCity = this.orgsRepository.items
      .filter((org) => org.city === params.city)
      .map((org) => org.id)

    return this.items
      .filter((pet) => orgIdsInCity.includes(pet.org_id))
      .filter((pet) => (params.age ? pet.age === params.age : true))
      .filter((pet) => (params.size ? pet.size === params.size : true))
      .filter((pet) =>
        params.energy_level ? pet.energy_level === params.energy_level : true,
      )
      .filter((pet) =>
        params.environment ? pet.environment === params.environment : true,
      )
  }

  async findById(id: string) {
    return this.items.find((item) => item.id === id) ?? null
  }

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet: Pet = {
      id: data.id ?? randomUUID(),
      name: data.name,
      about: data.about ?? null,
      age: data.age,
      size: data.size,
      energy_level: data.energy_level,
      environment: data.environment,
      org_id: data.org_id,
      created_at: new Date(),
    }

    this.items.push(pet)

    return pet
  }
}
