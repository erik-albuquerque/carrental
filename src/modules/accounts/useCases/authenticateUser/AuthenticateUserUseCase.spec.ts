import { AppError } from '../../../../errors/AppError'
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO'
import { UsersRepositoryInMemory } from '../../repositories/in-memory/UsersRepositoryInMemory'
import { CreateUserUseCase } from '../createUser/CreateUserUseCase'
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase'

let authenticateUserUseCase: AuthenticateUserUseCase
let usersRepositoryInMemory: UsersRepositoryInMemory
let createUserUseCase: CreateUserUseCase

describe('Authenticate user', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory()
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory,
    )
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory)
  })

  it('should be able to authenticate a user', async () => {
    const user: ICreateUserDTO = {
      name: 'User test',
      email: 'user@test.com',
      password: '1234',
      driver_license: '000001',
    }

    await createUserUseCase.execute(user)

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    })

    expect(result).toHaveProperty('token')
  })

  it('should not be able to authenticate a nonexistent user', () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: 'nonexistentuser@test.com',
        password: '1234',
      })
    }).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to authenticate a user with incorrect password', async () => {
    expect(async () => {
      const user: ICreateUserDTO = {
        name: 'User test 2',
        email: 'user2@test.com',
        password: '1234',
        driver_license: '000002',
      }

      await createUserUseCase.execute(user)

      await authenticateUserUseCase.execute({
        email: user.email,
        password: 'incorrectPassword',
      })
    }).rejects.toBeInstanceOf(AppError)
  })
})
