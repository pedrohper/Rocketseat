import { OrgNotFoundError } from '@/use-cases/errors/org-not-found-error'
import { makeCreatePetUseCase } from '@/use-cases/factories/make-create-pet-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createPetParamsSchema = z.object({
    orgId: z.string().uuid(),
  })

  const createPetBodySchema = z.object({
    name: z.string(),
    about: z.string().nullable().optional(),
    age: z.string(),
    size: z.string(),
    energyLevel: z.string(),
    environment: z.string(),
  })

  // TODO: quando o login (JWT) estiver pronto, trocar por request.user.sub
  const { orgId } = createPetParamsSchema.parse(request.params)
  const data = createPetBodySchema.parse(request.body)

  try {
    const createPetUseCase = makeCreatePetUseCase()

    const { pet } = await createPetUseCase.execute({ ...data, orgId })

    return reply.status(201).send({ pet })
  } catch (err) {
    if (err instanceof OrgNotFoundError) {
      return reply.status(404).send({ message: err.message })
    }

    throw err
  }
}
