import { NextFunction, Response } from 'express';
import { ApiError } from '../exceptions/api-error';
import {
  RequestWithBody,
  TeamMemberInputDTO,
  TeamMemberOutputDTO,
} from '../types';
import { teamMembersRepo } from '../repositories';

export const checkTeamMemberCreateMiddleware = async (
  req: RequestWithBody<TeamMemberInputDTO>,
  res: Response<TeamMemberOutputDTO>,
  next: NextFunction
) => {
  try {
    const { userId } = req.body;

    const candidate = await teamMembersRepo.findTeamMember('userId', userId);
    if (candidate) {
      throw ApiError.BadRequest(
        409,
        `Team member with user ID ${userId} already exists`,
        [
          {
            type: 'field',
            value: userId,
            msg: 'must be unique',
            path: 'userId',
            location: 'body',
          },
        ]
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
