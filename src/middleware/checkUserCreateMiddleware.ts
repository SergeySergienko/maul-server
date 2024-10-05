import { NextFunction, Response } from 'express';
import { ApiError } from '../exceptions/api-error';
import { RequestWithBody, UserInputDTO } from '../types';
import { usersRepo } from '../repositories';

export const checkUserCreateMiddleware = async (
  req: RequestWithBody<UserInputDTO>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body;
    const candidate = await usersRepo.findUser('email', email);
    if (candidate) {
      throw ApiError.BadRequest(
        409,
        `User with email ${email} already exists`,
        [
          {
            type: 'field',
            value: email,
            msg: 'email address must be unique',
            path: 'email',
            location: 'body',
          },
        ]
      );
    }

    next();
  } catch (error) {
    return next(error);
  }
};
