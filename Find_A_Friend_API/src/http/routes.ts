import { FastifyInstance } from 'fastify'
import { authenticate } from './controllers/authenticate'
import { register } from './controllers/orgs/register'
import { create } from './controllers/pets/create'
import { search } from './controllers/pets/search'

export async function appRoutes(app: FastifyInstance) {
  app.post('/orgs', register)
  app.post('/sessions', authenticate)
  app.post('/orgs/:orgId/pets', create)
  app.get('/pets', search)
}
