import { NextFunction, Response } from 'express';
import { ApiError } from '../exceptions/api-error';
import { RoleModel } from '../models';
import { RequestWithParams, IdParamsDTO } from '../types';
import { usersRepo } from '../repositories';
import { authorizeUser } from '../utils';
import { teamMembersService } from '../services';

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

    const teamMemberData = await teamMembersService.findTeamMemberByUserId(
      req.params.id
    );
    if (teamMemberData) {
      throw ApiError.ForbiddenError(
        `Can not delete user with ${teamMemberData.status} status`
      );
    }

    const hasPermission =
      userData.id === candidateToDelete._id.toString() ||
      RoleModel[userData.role] > RoleModel[candidateToDelete.role];

    if (!hasPermission) {
      throw ApiError.ForbiddenError(
        `No permission to delete user with ${candidateToDelete.role} role`
      );
    }

    next();
  } catch (error) {
    return next(error);
  }
};
