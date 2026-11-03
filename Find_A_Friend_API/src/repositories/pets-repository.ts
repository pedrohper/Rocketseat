import { Pet, Prisma } from '@prisma/client'

export interface FindManyNearbyParams {
  city: string
  org_id: string
}

export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  searchMany(query: string, page: number): Promise<Pet[]>
   findManyNearby(params: FindManyNearbyParams): Promise<Pet[]>
  findById(id: string): Promise<Pet | null>
}
