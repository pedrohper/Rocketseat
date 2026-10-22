import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { registerUseCase } from '@/use-cases/register'

export async function register (req, rep){
    const registerBodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6),
        adress: z.string(),
        whatsapp: z.string(),
        city: z.string,
    })

    try {
        await registerUseCase({
          name,
          email,
          password,
          adress,
          whatsapp,
          city,
        })
      } catch (err) {
        return reply.status(409).send()
      }
    
      return reply.status(201).send()
}