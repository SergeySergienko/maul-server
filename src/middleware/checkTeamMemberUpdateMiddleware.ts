import { NextFunction, Response } from 'express';
import { ApiError } from '../exceptions/api-error';
import { teamMembersService } from '../services';
import { RequestWithBody, TeamMemberUpdateDTO } from '../types';
import { authorizeUser } from '../utils';

export const checkTeamMemberUpdateMiddleware = async (
  req: RequestWithBody<TeamMemberUpdateDTO>,
  res: Response,
  next: NextFunction
) => {
  try {
    const userData = authorizeUser(req);

    const teamMember = await teamMembersService.findTeamMember(req.body.id);

    if (userData.id !== teamMember.userId) {
      throw ApiError.ForbiddenError(
        'No permission to update another team member'
      );
    }

    const containerName = process.env.AZURE_STORAGE_MEMBERS_CONTAINER_NAME;

    if (!containerName) {
      throw ApiError.BadRequest(400, 'Storage container name is required');
    }

    next();
  } catch (error) {
    return next(error);
  }
};
