import { NextFunction, Response } from 'express';
import { ApiError } from '../exceptions/api-error';
import { RequestWithBody, TeamMemberStatusDTO } from '../types';
import { teamMembersRepo } from '../repositories';

export const checkTeamMemberStatusMiddleware = async (
  req: RequestWithBody<TeamMemberStatusDTO>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id, status } = req.body;
    const teamMember = await teamMembersRepo.findTeamMember('id', id);
    if (!teamMember) {
      throw ApiError.NotFound(`Team member with id: ${id} wasn't found`, [
        {
          type: 'field',
          value: id,
          msg: 'not found',
          path: 'id',
          location: 'body',
        },
      ]);
    }

    if (teamMember.status === status) {
      throw ApiError.BadRequest(
        409,
        `Team member with user id ${id} status is already set to ${status}`,
        [
          {
            type: 'field',
            value: status,
            msg: 'already set',
            path: 'status',
            location: 'body',
          },
        ]
      );
    }

    next();
  } catch (error) {
    return next(error);
  }
};
