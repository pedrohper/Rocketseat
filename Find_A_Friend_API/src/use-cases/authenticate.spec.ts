import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { AuthenticateUseCase } from '@/use-cases/authenticate'
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'
import { hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'

let orgsRepository: InMemoryOrgsRepository
let sut: AuthenticateUseCase

const orgData = {
  name: 'Amigos de Patas',
  email: 'contato@amigosdepatas.com',
  whatsapp: '34999999999',
  address: 'Rua Exemplo, 100',
  city: 'Uberlândia',
}

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new AuthenticateUseCase(orgsRepository)
  })

  it('should be able to authenticate', async () => {
    await orgsRepository.create({
      ...orgData,
      password_hash: await hash('123456', 6),
    })

    const { org } = await sut.execute({
      email: 'contato@amigosdepatas.com',
      password: '123456',
    })

    expect(org.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', async () => {
    await expect(() =>
      sut.execute({
        email: 'contato@amigosdepatas.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    await orgsRepository.create({
      ...orgData,
      password_hash: await hash('123456', 6),
    })

    await expect(() =>
      sut.execute({
        email: 'contato@amigosdepatas.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
