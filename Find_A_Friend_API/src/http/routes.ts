import { FastifyInstance } from 'fastify'

export async function appRoutes(app:FastifyInstance) {
    app.post ('/org', register)
}

