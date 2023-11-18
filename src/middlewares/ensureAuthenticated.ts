import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'

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
    throw new Error('A token is required!')
  }

  try {
    const { sub: user_id } = verify(token, 'privatekey') as IPayload

    const usersRepository = new UsersRepository()
    const user = await usersRepository.findById(user_id)

    if (!user) {
      throw new Error('Something is wrong with the token!')
    }

    next()
  } catch {
    throw new Error('Token is broken!')
  }
}

export { ensureAuthenticated }
