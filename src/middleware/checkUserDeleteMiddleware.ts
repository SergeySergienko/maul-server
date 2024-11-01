import { NextFunction, Response } from 'express';
import { ApiError } from '../exceptions/api-error';
import { RoleModel } from '../models';
import { RequestWithParams, IdParamsDTO } from '../types';
import { usersRepo } from '../repositories';
import { authorizeUser } from '../utils';

export const checkUserDeleteMiddleware = async (
  req: RequestWithParams<IdParamsDTO>,
  res: Response,
  next: NextFunction
) => {
  try {
    const userData = authorizeUser(req);

    const candidateToDelete = await usersRepo.findUser('id', req.params.id);
    if (!candidateToDelete) {
      throw ApiError.BadRequest(400, 'User ID is incorrect');
    }

    if (userData.id === candidateToDelete._id.toString()) {
      throw ApiError.ForbiddenError('User is not allowed to delete themselves');
    }

    const hasRole =
      RoleModel[userData.role] > RoleModel[candidateToDelete.role];

    if (!hasRole) {
      throw ApiError.ForbiddenError(
        `No permission to delete user with ${candidateToDelete.role} role`
      );
    }

    next();
  } catch (error) {
    return next(error);
  }
};
