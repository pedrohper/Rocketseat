import { PetsRepository } from '@/repositories/pets-repository'
import { Pet} from '@prisma/client'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'

interface GetPetProfileUseCaseRequest {
  userId: string
}

interface GetPetProfileUseCaseResponse {
  pet: Pet
}

export class GetOrgProfileUseCase {
  constructor(private orgsRepository: PetsRepository) {}

  async execute({
    petId,
  }: string): Promise<GetPetProfileUseCaseResponse> {
    const pet = await this.orgsRepository.findById(petId)

    if (!pet) {
      throw new ResourceNotFoundError()
    }

    return {
      pet,
    }
  }
}