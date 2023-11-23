import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import { inject, injectable } from 'tsyringe'

import { AppError } from '@errors/AppError'
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository'

interface IRequestPayload {
  email: string
  password: string
}

interface IResponsePayload {
  user: {
    name: string
    email: string
  }
  token: string
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({
    email,
    password,
  }: IRequestPayload): Promise<IResponsePayload> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new AppError('Email or password incorrect!')
    }

    const isPasswordMatched = await compare(password, user.password)

    if (!isPasswordMatched) {
      throw new AppError('Email or password incorrect!')
    }

    const token = sign({}, 'privatekey', {
      subject: user.id,
      expiresIn: '1d',
    })

    const tokenResponse: IResponsePayload = {
      user: {
        name: user.name,
        email: user.email,
      },
      token,
    }

    return tokenResponse
  }
}

export { AuthenticateUserUseCase }
