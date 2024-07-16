import { Response, NextFunction } from 'express';
import { WithId } from 'mongodb';
import { TeamMemberModel } from '../models';
import { teamMembersService } from '../services';
import {
  RequestWithBody,
  PostTeamMemberDto,
  RequestWithQuery,
  GetQueryDto,
  GetParamsDto,
  RequestWithParams,
} from '../types';

export const teamMembersController = {
  async findTeamMember(
    req: RequestWithParams<GetParamsDto>,
    res: Response<WithId<TeamMemberModel>>,
    next: NextFunction
  ) {
    try {
      const teamMember = await teamMembersService.findTeamMember(req.params.id);
      return res.json(teamMember);
    } catch (error) {
      next(error);
    }
  },

  async findTeamMembers(
    req: RequestWithQuery<GetQueryDto>,
    res: Response<WithId<TeamMemberModel>[]>,
    next: NextFunction
  ) {
    const { limit, sort } = req.query;
    try {
      const teamMembers = await teamMembersService.findTeamMembers({
        limit,
        sort,
      });
      return res.json(teamMembers);
    } catch (error) {
      next(error);
    }
  },

  async createTeamMember(
    req: RequestWithBody<PostTeamMemberDto>,
    res: Response<WithId<TeamMemberModel>>,
    next: NextFunction
  ) {
    try {
      const {
        body: { name, position },
        file,
      } = req;

      const teamMember = await teamMembersService.createTeamMember({
        name,
        position,
        file,
      });
      return res.status(201).json(teamMember);
    } catch (error) {
      next(error);
    }
  },
};
