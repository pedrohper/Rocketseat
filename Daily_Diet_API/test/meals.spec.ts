import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest'
import req from 'supertest'
import { app } from '../src/app'
import { knex } from '../src/database'

/**
 * 💡 AULÃO GUANABARA - Testes E2E (End-to-End) com Vitest e Supertest:
 * 
 * 1. 'beforeAll': Aguarda o servidor Fastify ficar pronto (app.ready()) antes de rodar os testes.
 * 2. 'afterAll': Fecha o servidor ao terminar tudo para liberar a porta.
 * 3. 'beforeEach': Limpa o banco de dados e roda as migrations do zero antes de CADA teste.
 *    Isso garante que um teste nunca afete o resultado de outro teste (Isolamento!).
 * 4. 'supertest(app.server)': Simula um cliente de verdade fazendo chamadas HTTP para a API!
 */
describe('Meals routes', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  beforeEach(async () => {
    await knex.migrate.rollback(undefined, true) // Limpa a sujeira do teste anterior!
    await knex.migrate.latest()                   // Recria as tabelas limpinhas!
  })

  it('should be able to create a new meal', async () => {
    // 1. Cria um usuário de teste e captura o Cookie de sessão retornado
    const createUserResponse = await req(app.server)
      .post('/users')
      .send({
        name: 'John Doe',
      })
      .expect(201)

    const cookies = createUserResponse.get('Set-Cookie') ?? []

    await req(app.server)

      .post('/meals')
      .set('Cookie', cookies)
      .send({
        name: 'Breakfast',
        description: 'Oatmeal and eggs',
        isOnDiet: true,
        date: new Date(),
      })
      .expect(201)
  })

  it('should be able to list all meals of a user', async () => {
    const createUserResponse = await req(app.server)
      .post('/users')
      .send({
        name: 'John Doe',
      })
      .expect(201)

    const cookies = createUserResponse.get('Set-Cookie') ?? []

    await req(app.server)
      .post('/meals')
      .set('Cookie', cookies)
      .send({
        name: 'Breakfast',
        description: 'Oatmeal and eggs',
        isOnDiet: true,
        date: new Date(),
      })

    const listMealsResponse = await req(app.server)
      .get('/meals')
      .set('Cookie', cookies)
      .expect(200)

    expect(listMealsResponse.body.meals).toEqual([
      expect.objectContaining({
        name: 'Breakfast',
        description: 'Oatmeal and eggs',
        is_on_diet: 1,
      }),
    ])
  })

  it('should be able to get a specific meal', async () => {
    const createUserResponse = await req(app.server)
      .post('/users')
      .send({
        name: 'John Doe',
      })
      .expect(201)

    const cookies = createUserResponse.get('Set-Cookie') ?? []

    await req(app.server)
      .post('/meals')
      .set('Cookie', cookies)
      .send({
        name: 'Lunch',
        description: 'Chicken salad',
        isOnDiet: true,
        date: new Date(),
      })

    const listMealsResponse = await req(app.server)
      .get('/meals')
      .set('Cookie', cookies)

    const mealId = listMealsResponse.body.meals[0].id

    const getMealResponse = await req(app.server)
      .get(`/meals/${mealId}`)
      .set('Cookie', cookies)
      .expect(200)

    expect(getMealResponse.body.meal).toEqual(
      expect.objectContaining({
        name: 'Lunch',
        description: 'Chicken salad',
      }),
    )
  })

  it('should be able to update a meal', async () => {
    const createUserResponse = await req(app.server)
      .post('/users')
      .send({
        name: 'John Doe',
      })
      .expect(201)

    const cookies = createUserResponse.get('Set-Cookie') ?? []

    await req(app.server)
      .post('/meals')
      .set('Cookie', cookies)
      .send({
        name: 'Dinner',
        description: 'Rice and beans',
        isOnDiet: true,
        date: new Date(),
      })

    const listMealsResponse = await req(app.server)
      .get('/meals')
      .set('Cookie', cookies)

    const mealId = listMealsResponse.body.meals[0].id

    await req(app.server)
      .put(`/meals/${mealId}`)
      .set('Cookie', cookies)
      .send({
        name: 'Dinner Updated',
        description: 'Steak and salad',
        isOnDiet: false,
        date: new Date(),
      })
      .expect(204)
  })

  it('should be able to delete a meal', async () => {
    const createUserResponse = await req(app.server)
      .post('/users')
      .send({
        name: 'John Doe',
      })
      .expect(201)

    const cookies = createUserResponse.get('Set-Cookie') ?? []

    await req(app.server)
      .post('/meals')
      .set('Cookie', cookies)
      .send({
        name: 'Snack',
        description: 'Apple',
        isOnDiet: true,
        date: new Date(),
      })

    const listMealsResponse = await req(app.server)
      .get('/meals')
      .set('Cookie', cookies)

    const mealId = listMealsResponse.body.meals[0].id

    await req(app.server)
      .delete(`/meals/${mealId}`)
      .set('Cookie', cookies)
      .expect(204)

    const listMealsAfterDelete = await req(app.server)
      .get('/meals')
      .set('Cookie', cookies)

    expect(listMealsAfterDelete.body.meals).toHaveLength(0)
  })

  it('should be able to get metrics of user meals', async () => {
    const createUserResponse = await req(app.server)
      .post('/users')
      .send({
        name: 'John Doe',
      })
      .expect(201)

    const cookies = createUserResponse.get('Set-Cookie') ?? []

    const date = new Date()

    await req(app.server).post('/meals').set('Cookie', cookies).send({
      name: 'Meal 1',
      description: 'On diet 1',
      isOnDiet: true,
      date: new Date(date.getTime() - 10000),
    })

    await req(app.server).post('/meals').set('Cookie', cookies).send({
      name: 'Meal 2',
      description: 'On diet 2',
      isOnDiet: true,
      date: new Date(date.getTime() - 8000),
    })

    await req(app.server).post('/meals').set('Cookie', cookies).send({
      name: 'Meal 3',
      description: 'Off diet 1',
      isOnDiet: false,
      date: new Date(date.getTime() - 6000),
    })

    await req(app.server).post('/meals').set('Cookie', cookies).send({
      name: 'Meal 4',
      description: 'On diet 3',
      isOnDiet: true,
      date: new Date(date.getTime() - 4000),
    })

    const metricsResponse = await req(app.server)
      .get('/meals/metrics')
      .set('Cookie', cookies)
      .expect(200)

    expect(metricsResponse.body.metrics).toEqual({
      totalMeals: 4,
      totalMealsOnDiet: 3,
      totalMealsOffDiet: 1,
      bestOnDietSequence: 2,
    })
  })
})
