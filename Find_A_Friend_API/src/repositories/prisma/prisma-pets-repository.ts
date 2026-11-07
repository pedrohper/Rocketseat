import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { FindAllParams, PetsRepository } from '../pets-repository'

export class PrismaPetsRepository implements PetsRepository {
  async create(data: Prisma.PetUncheckedCreateInput) {
    return prisma.pet.create({ data })
  }

  async findAll({ city, age, size, energy_level, environment }: FindAllParams) {
    // Filtros com valor undefined são ignorados pelo Prisma,
    // então só a cidade é obrigatória.
    return prisma.pet.findMany({
      where: {
        age,
        size,
        energy_level,
        environment,
        org: { city },
      },
    })
  }

  async findById(id: string) {
    return prisma.pet.findUnique({ where: { id } })
  }
}
