import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest'
import req from 'supertest'
import { app } from '../src/app'
import { knex } from '../src/database'

describe('Users routes', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  beforeEach(async () => {
    await knex.migrate.rollback(undefined, true)
    await knex.migrate.latest()
  })

  it('user can create a new user', async () => {
    await req(app.server)
      .post('/users')
      .send({
        name: 'New name',
      })
      .expect(201)
  })

  it('should be able to list all users', async () => {
    const createUserResponse = await req(app.server)
      .post('/users')
      .send({
        name: 'New name',
      })

    const cookies = createUserResponse.get('Set-Cookie') ?? []

    const listUserResponse = await req(app.server)
      .get('/users')
      .set('Cookie', cookies)
      .expect(200)

    expect(listUserResponse.body.users).toEqual([
      expect.objectContaining({
        name: 'New name',
      }),
    ])
  })

  it('should be able to get a specific user', async () => {
    const createUserResponse = await req(app.server)
      .post('/users')
      .send({
        name: 'New name',
      })

    const cookies = createUserResponse.get('Set-Cookie') ?? []

    const listUserResponse = await req(app.server)
      .get('/users')
      .set('Cookie', cookies)
      .expect(200)

    const userId = listUserResponse.body.users[0].id

    const getUserResponse = await req(app.server)
      .get(`/users/${userId}`)
      .set('Cookie', cookies)
      .expect(200)

    expect(getUserResponse.body.user).toEqual(
      expect.objectContaining({
        name: 'New name',
      }),
    )
  })

  it('should be able to get the summary', async () => {
    const createUserResponse = await req(app.server)
      .post('/users')
      .send({
        name: 'New name',
      })

    const cookies = createUserResponse.get('Set-Cookie') ?? []

    const summaryResponse = await req(app.server)
      .get('/users/summary')
      .set('Cookie', cookies)
      .expect(200)

    expect(summaryResponse.body.summary).toEqual({
      total: 1,
    })
  })
})