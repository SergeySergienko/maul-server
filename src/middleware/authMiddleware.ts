import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../exceptions/api-error';
import { RoleModel } from '../models';
import { authorizeUser } from '../utils';
export const authMiddleware =
  (role: keyof typeof RoleModel) =>
  (req: Request, res: Response, next: NextFunction) => {
    if (req.method === 'OPTIONS') {
      next();
    }
    try {
      const userData = authorizeUser(req);
      const hasRole = RoleModel[userData.role] >= RoleModel[role];

      if (!hasRole) {
        throw ApiError.ForbiddenError('No access to resource');
      }

      next();
    } catch (error) {
      return next(error);
    }
  };
