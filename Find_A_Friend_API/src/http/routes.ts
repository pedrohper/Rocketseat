import { FastifyInstance } from 'fastify'
import { register } from './controllers/orgs/register'
import { create } from './controllers/pets/create'

export async function appRoutes(app: FastifyInstance) {
  app.post('/orgs', register)
  app.post('/orgs/:orgId/pets', create)
}
