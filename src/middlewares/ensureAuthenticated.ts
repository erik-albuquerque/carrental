import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'

import { AppError } from '../errors/AppError'
import { UsersRepository } from '../modules/accounts/implementations/UsersRepository'

interface IPayload {
  sub: string
}

async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
) {
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

    next()
  } catch {
    throw new AppError('Token is broken!', 401)
  }
}

export { ensureAuthenticated }
