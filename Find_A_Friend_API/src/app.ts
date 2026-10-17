import fastify from 'fastify'
import { z } from 'zod'
import { prisma } from './lib/prisma'

export const app = fastify()

app.post ('/orgs', async,  (req, rep)  => {
    const registerBodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6),
        adress: z.string(),
        whatsapp: z.string(),
        city: z.string,
    })
    
    const{ name, email, password, adress, whatsapp, city } = registerBodySchema.parse(req.body)

    await prisma.org.create({
        data: {

        }
    })
})