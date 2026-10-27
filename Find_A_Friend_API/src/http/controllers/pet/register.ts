import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { RegisterUseCase } from '@/use-cases/org/register'
import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { OrgAlreadyExistsError } from '@/use-cases/errors/pets-already-exists-error'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    address: z.string(),
    whatsapp: z.string(),
    city: z.string(),
  })

  const { name, email, password, address, whatsapp, city } =
    registerBodySchema.parse(request.body)

  try {
    const petsRepository = new PrismaOrgsRepository()
    const registerUseCase = new RegisterUseCase(orgsRepository)

    await registerUseCase.execute({
      name,
      email,
      password,
      address,
      whatsapp,
      city,
    })
  } catch (err) {
    if (err instanceof PetAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }

      throw err
    }

  return reply.status(201).send()
}