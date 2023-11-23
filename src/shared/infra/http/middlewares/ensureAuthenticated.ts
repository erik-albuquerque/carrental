import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'

import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UsersRepository'
import { AppError } from '@shared/errors/AppError'

interface IPayload {
  sub: string
}

const ensureAuthenticated = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const token = request.headers.authorization?.split(' ')[1]

  if (!token) {
    throw new AppError('A token is required!', 401)
  }

  try {
    const { sub: user_id } = verify(token, 'privatekey') as IPayload

    const usersRepository = new UsersRepository()
    const user = await usersRepository.findById(user_id)

    if (!user) {
      throw new AppError('Something is wrong with the token!', 401)
    }

    request.user = {
      id: user.id,
    }

    next()
  } catch {
    throw new AppError('Token is broken!', 401)
  }
}

export { ensureAuthenticated }
