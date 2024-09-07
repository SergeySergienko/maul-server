import { NextFunction, Response } from 'express';
import { ApiError } from '../exceptions/api-error';
import { CustomJwtPayload, RoleModel } from '../models';
import { RequestWithParams } from '../types';
import { tokensService } from '../services';
import { usersRepo } from '../repositories';
import { IdParamsDTO } from '../types/dto-types';

export const checkUserDeleteMiddleware = async (
  req: RequestWithParams<IdParamsDTO>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { refreshToken } = req.cookies;

    const secret = process.env.JWT_REFRESH_SECRET;
    if (!secret) {
      throw ApiError.ServerError('Internal Server Error');
    }

    const userData = tokensService.validateToken<CustomJwtPayload>(
      refreshToken,
      secret
    );
    if (!userData) {
      throw ApiError.UnauthorizedError();
    }

    const candidateToDelete = await usersRepo.findUser('id', req.params.id);
    if (!candidateToDelete) {
      throw ApiError.BadRequest(400, 'User id is incorrect');
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
