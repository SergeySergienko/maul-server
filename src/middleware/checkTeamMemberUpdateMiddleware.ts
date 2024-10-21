import { NextFunction, Response } from 'express';
import { ApiError } from '../exceptions/api-error';
import { CustomJwtPayload } from '../models';
import { teamMembersService, tokensService } from '../services';
import { RequestWithBody, TeamMemberUpdateDTO } from '../types';

export const checkTeamMemberUpdateMiddleware = async (
  req: RequestWithBody<TeamMemberUpdateDTO>,
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
