
import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { PetsRepository } from '../pets-repository'

export class PrismaPetsRepository implements PetsRepository {
  async create(data: Prisma.PetUncheckedCreateInput) {
    return prisma.pet.create({ data })
  }

  async findManyNearby(params: FindManyNearbyParams){
    return prisma.pet.findMany.findManyNearby({ where: { org: {city: params.city}} })
  }
  
  async findById(id: string){
    return prisma.pet.findUnique({ where: { id } })
  }
}
