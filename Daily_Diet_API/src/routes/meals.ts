import { FastifyInstance } from 'fastify'
import { randomUUID } from 'node:crypto'
import { z } from 'zod'
import { knex } from '../database'
import { checkSessionIdExists } from '../middleware/check-session-id-exists'

/**
 * 💡 AULÃO GUANABARA - Rotas, Middlewares e Regras de Negócio no Fastify:
 * 
 * 1. 'preHandler': É o Leão de Chácara (Middleware). Roda ANTES da função principal da rota.
 *    Aqui, o 'checkSessionIdExists' garante que só usuários autenticados via Cookie entrem.
 * 2. 'knex(...)': É o nosso construtor de consultas SQL em TypeScript sem precisar escrever SQL na mão.
 */
export async function mealRoutes(app: FastifyInstance) {
  // Rota para listar todas as refeições do usuário autenticado
  app.get(
    '/',
    {
      preHandler: [checkSessionIdExists], // 🛡️ Leão de chácara: checa o Cookie antes!
    },
    async (req) => {
      const meals = await knex('meals')
        .where('user_id', req.user!.id)
        .orderBy('date', 'desc')
        .select()

      return { meals }
    },
  )

  // Rota para calcular as estatísticas da dieta do usuário
  app.get(
    '/metrics',
    {
      preHandler: [checkSessionIdExists],
    },
    async (req) => {
      const meals = await knex('meals')
        .where('user_id', req.user!.id)
        .orderBy('date', 'asc')
        .select()

      const totalMeals = meals.length
      const totalMealsOnDiet = meals.filter((meal) => meal.is_on_diet).length
      const totalMealsOffDiet = meals.filter((meal) => !meal.is_on_diet).length

      // 🧠 ALGORITMO GUANABARA: Descobre a maior sequência consecutiva de refeições dentro da dieta!
      const { bestOnDietSequence } = meals.reduce(
        (acc, meal) => {
          if (meal.is_on_diet) {
            acc.currentSequence += 1 // Se tá na dieta, o contador sobe!
          } else {
            acc.currentSequence = 0  // Se saiu da dieta, zera a sequência atual!
          }

          // Se a sequência atual bateu o recorde anterior, atualiza o recorde!
          if (acc.currentSequence > acc.bestOnDietSequence) {
            acc.bestOnDietSequence = acc.currentSequence
          }

          return acc
        },
        { currentSequence: 0, bestOnDietSequence: 0 },
      )

      return {
        metrics: {
          totalMeals,
          totalMealsOnDiet,
          totalMealsOffDiet,
          bestOnDietSequence,

        },
      }
    },
  )

  app.get(
    '/summary',
    {
      preHandler: [checkSessionIdExists],
    },
    async (req) => {
      const meals = await knex('meals')
        .where('user_id', req.user!.id)
        .orderBy('date', 'asc')
        .select()

      const totalMeals = meals.length
      const totalMealsOnDiet = meals.filter((meal) => meal.is_on_diet).length
      const totalMealsOffDiet = meals.filter((meal) => !meal.is_on_diet).length

      const { bestOnDietSequence } = meals.reduce(
        (acc, meal) => {
          if (meal.is_on_diet) {
            acc.currentSequence += 1
          } else {
            acc.currentSequence = 0
          }

          if (acc.currentSequence > acc.bestOnDietSequence) {
            acc.bestOnDietSequence = acc.currentSequence
          }

          return acc
        },
        { currentSequence: 0, bestOnDietSequence: 0 },
      )

      return {
        summary: {
          totalMeals,
          totalMealsOnDiet,
          totalMealsOffDiet,
          bestOnDietSequence,
        },
      }
    },
  )

  app.get(
    '/:id',
    {
      preHandler: [checkSessionIdExists],
    },
    async (req, res) => {
      const getMealParamsSchema = z.object({
        id: z.string().uuid(),
      })

      const { id } = getMealParamsSchema.parse(req.params)

      const meal = await knex('meals')
        .where({
          id,
          user_id: req.user!.id,
        })
        .first()

      if (!meal) {
        return res.status(404).send({
          error: 'Meal not found.',
        })
      }

      return { meal }
    },
  )

  app.post(
    '/',
    {
      preHandler: [checkSessionIdExists],
    },
    async (req, res) => {
      const createMealBodySchema = z.object({
        name: z.string(),
        description: z.string(),
        isOnDiet: z.boolean(),
        date: z.coerce.date(),
      })

      const { name, description, isOnDiet, date } = createMealBodySchema.parse(
        req.body,
      )

      await knex('meals').insert({
        id: randomUUID(),
        name,
        description,
        is_on_diet: isOnDiet,
        date: date.getTime(),
        user_id: req.user!.id,
      })

      return res.status(201).send()
    },
  )

  app.put(
    '/:id',
    {
      preHandler: [checkSessionIdExists],
    },
    async (req, res) => {
      const getMealParamsSchema = z.object({
        id: z.string().uuid(),
      })

      const updateMealBodySchema = z.object({
        name: z.string(),
        description: z.string(),
        isOnDiet: z.boolean(),
        date: z.coerce.date(),
      })

      const { id } = getMealParamsSchema.parse(req.params)
      const { name, description, isOnDiet, date } = updateMealBodySchema.parse(
        req.body,
      )

      const meal = await knex('meals')
        .where({
          id,
          user_id: req.user!.id,
        })
        .first()

      if (!meal) {
        return res.status(404).send({
          error: 'Meal not found.',
        })
      }

      await knex('meals')
        .where({
          id,
          user_id: req.user!.id,
        })
        .update({
          name,
          description,
          is_on_diet: isOnDiet,
          date: date.getTime(),
        })

      return res.status(204).send()
    },
  )

  app.delete(
    '/:id',
    {
      preHandler: [checkSessionIdExists],
    },
    async (req, res) => {
      const getMealParamsSchema = z.object({
        id: z.string().uuid(),
      })

      const { id } = getMealParamsSchema.parse(req.params)

      const meal = await knex('meals')
        .where({
          id,
          user_id: req.user!.id,
        })
        .first()

      if (!meal) {
        return res.status(404).send({
          error: 'Meal not found.',
        })
      }

      await knex('meals')
        .where({
          id,
          user_id: req.user!.id,
        })
        .delete()

      return res.status(204).send()
    },
  )
}