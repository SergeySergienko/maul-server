import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../exceptions/api-error';
import { CustomJwtPayload, RoleModel } from '../models';
import { tokensService } from '../services';

export const authMiddleware =
  (role: keyof typeof RoleModel) =>
  (req: Request, res: Response, next: NextFunction) => {
    if (req.method === 'OPTIONS') {
      next();
    }
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

      const hasRole = RoleModel[userData.role] >= RoleModel[role];

      if (!hasRole) {
        throw ApiError.ForbiddenError('No access to resource');
      }

      next();
    } catch (error) {
      return next(error);
    }
  };
