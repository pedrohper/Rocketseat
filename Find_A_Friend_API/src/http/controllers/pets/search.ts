import { makeSearchPetsUseCase } from '@/use-cases/factories/make-search-pets-use-case'
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const searchPetsQuerySchema = z.object({
    city: z.string(),
    age: z.string().optional(),
    size: z.string().optional(),
    energyLevel: z.string().optional(),
    environment: z.string().optional(),
  })

  const data = searchPetsQuerySchema.parse(request.query)

  const searchPetsUseCase = makeSearchPetsUseCase()
  const { pets } = await searchPetsUseCase.execute(data)

  return reply.status(200).send({ pets })
}
