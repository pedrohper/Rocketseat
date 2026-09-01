import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { randomUUID } from 'node:crypto'
import { knex } from '../database'
import { checkSessionIdExists } from '../middleware/check-session-id-exists';

export async function userRoutes(app: FastifyInstance) {
  app.get(
    '/',
    {
      preHandler: [checkSessionIdExists],
    },
    async (req) => {
      const { sessionId } = req.cookies

      const users = await knex('users')
        .where('session_id', sessionId)
        .select()

      return { users }
    },
  )

  app.get(
    '/summary',
    {
      preHandler: [checkSessionIdExists],
    },
    async (req) => {
      const { sessionId } = req.cookies

      const summary = await knex('users')
        .where('session_id', sessionId)
        .count('id', { as: 'total' })
        .first()

      return { summary }
    },
  )

  app.get(
    '/:id',
    {
      preHandler: [checkSessionIdExists],
    },
    async (req) => {
      const getUserParamsSchema = z.object({
        id: z.string().uuid(),
      })

      const { id } = getUserParamsSchema.parse(req.params)
      const { sessionId } = req.cookies

      const user = await knex('users')
        .where({
          session_id: sessionId,
          id,
        })
        .first()

      return { user }
    },
  )

  app.post('/', async (req, res) => {
    const createUserBodySchema = z.object({
      name: z.string(),
    })

    const { name } = createUserBodySchema.parse(req.body)

    let sessionId = req.cookies.sessionId

    if (!sessionId) {
      sessionId = randomUUID()

      res.cookie('sessionId', sessionId, {
        path: '/',
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 dias
      })
    }

    await knex('users').insert({
      id: randomUUID(),
      name,
      session_id: sessionId,
    })

    return res.status(201).send()
  })
}