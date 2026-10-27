import { OrgsRepository } from '@/repositories/orgs-repository'
import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'
import { OrgNotFoundError } from './errors/org-not-found-error'

interface CreatePetUseCaseRequest {
  orgId: string
  name: string
  about?: string | null
  age: string
  size: string
  energyLevel: string
  environment: string
}

interface CreatePetUseCaseResponse {
  pet: Pet
}

export class CreatePetUseCase {
  constructor(
    private petsRepository: PetsRepository,
    private orgsRepository: OrgsRepository,
  ) {}

  async execute({
    orgId,
    name,
    about,
    age,
    size,
    energyLevel,
    environment,
  }: CreatePetUseCaseRequest): Promise<CreatePetUseCaseResponse> {
    const org = await this.orgsRepository.findById(orgId)

    if (!org) {
      throw new OrgNotFoundError()
    }

    const pet = await this.petsRepository.create({
      org_id: orgId,
      name,
      about,
      age,
      size,
      energy_level: energyLevel,
      environment,
    })

    return { pet }
  }
}
