import { NextFunction, Response } from 'express';
import { ApiError } from '../exceptions/api-error';
import { CustomJwtPayload, UserUpdateModel } from '../models';
import { RequestWithBody } from '../types';
import { tokensService } from '../services';

export const checkUserUpdateMiddleware = (
  req: RequestWithBody<UserUpdateModel>,
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

    if (req.body.id === userData?.id) {
      throw ApiError.ForbiddenError(
        'User is not allowed to update their roles'
      );
    }

    next();
  } catch (error) {
    return next(error);
  }
};
