import { NextFunction, Response } from 'express';
import { ApiError } from '../exceptions/api-error';
import { RoleModel } from '../models';
import { RequestWithBody } from '../types';
import { usersRepo } from '../repositories';
import { UserUpdateDTO } from '../types';
import { authorizeUser } from '../utils';

export const checkUserUpdateMiddleware = async (
  req: RequestWithBody<UserUpdateDTO>,
  res: Response,
  next: NextFunction
) => {
  try {
    const userData = authorizeUser(req);

    if (userData.id === req.body.id) {
      throw ApiError.ForbiddenError('User is not allowed to update their role');
    }

    const candidateToUpdate = await usersRepo.findUser('id', req.body.id);
    if (!candidateToUpdate) {
      throw ApiError.BadRequest(400, 'User ID is incorrect');
    }

    const role = req.body.role as keyof typeof RoleModel;

    const hasRole =
      RoleModel[userData.role] > RoleModel[role] &&
      RoleModel[userData.role] > RoleModel[candidateToUpdate.role];

    if (!hasRole) {
      throw ApiError.ForbiddenError('No permission to change role');
    }

    next();
  } catch (error) {
    return next(error);
  }
};
