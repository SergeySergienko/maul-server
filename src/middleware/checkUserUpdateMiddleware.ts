import { NextFunction, Response } from 'express';
import { ApiError } from '../exceptions/api-error';
import { CustomJwtPayload, RoleModel } from '../models';
import { RequestWithBody } from '../types';
import { tokensService } from '../services';
import { usersRepo } from '../repositories';
import { UserUpdateDTO } from '../types/dto-types';

export const checkUserUpdateMiddleware = async (
  req: RequestWithBody<UserUpdateDTO>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { refreshToken } = req.cookies;
    const role = req.body.role as keyof typeof RoleModel;

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

    if (userData.id === req.body.id) {
      throw ApiError.ForbiddenError('User is not allowed to update their role');
    }

    const candidateToUpdate = await usersRepo.findUser('id', req.body.id);
    if (!candidateToUpdate) {
      throw ApiError.BadRequest(400, 'User id is incorrect');
    }

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
