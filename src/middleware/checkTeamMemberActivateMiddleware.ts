import { NextFunction, Response } from 'express';
import { ObjectId } from 'mongodb';
import { ApiError } from '../exceptions/api-error';
import { IdParamsDTO, RequestWithParams } from '../types';
import { teamMembersRepo } from '../repositories';

export const checkTeamMemberActivateMiddleware = async (
  req: RequestWithParams<IdParamsDTO>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const teamMember = await teamMembersRepo.findTeamMember(
      '_id',
      new ObjectId(id)
    );
    if (!teamMember) {
      throw ApiError.NotFound(`Team member with id: ${id} wasn't found`, [
        {
          type: 'field',
          value: id,
          msg: 'not found',
          path: 'id',
          location: 'params',
        },
      ]);
    }

    if (teamMember.isActivated) {
      throw ApiError.BadRequest(
        409,
        `Team member with user ID ${id} already activated`
      );
    }

    next();
  } catch (error) {
    return next(error);
  }
};
