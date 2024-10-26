import { NextFunction, Response } from 'express';
import { ApiError } from '../exceptions/api-error';
import { CustomJwtPayload, RoleModel } from '../models';
import { RequestWithParams, IdParamsDTO } from '../types';
import { tokensService } from '../services';
import { usersRepo } from '../repositories';

export const checkUserDeleteMiddleware = async (
  req: RequestWithParams<IdParamsDTO>,
  res: Response,
  next: NextFunction
) => {
  try {
    const accessToken = req.headers.authorization?.split(' ')[1];
    if (!accessToken) {
      throw ApiError.UnauthorizedError();
    }

    const secret = process.env.JWT_ACCESS_SECRET;
    if (!secret) {
      throw ApiError.ServerError('Internal Server Error');
    }

    const userData = tokensService.validateToken<CustomJwtPayload>(
      accessToken,
      secret
    );
    if (!userData) {
      throw ApiError.UnauthorizedError();
    }

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
