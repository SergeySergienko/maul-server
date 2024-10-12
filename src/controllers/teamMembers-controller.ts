import { Response, NextFunction } from 'express';
import { WithId } from 'mongodb';
import { TeamMemberModel } from '../models';
import { teamMembersService } from '../services';
import {
  RequestWithBody,
  RequestWithQuery,
  RequestWithParams,
  TeamMemberInputDTO,
  IdParamsDTO,
  QueryDTO,
  TeamMemberOutputDTO,
} from '../types';

export const teamMembersController = {
  async findTeamMember(
    req: RequestWithParams<IdParamsDTO>,
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
    req: RequestWithQuery<QueryDTO>,
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
    req: RequestWithBody<TeamMemberInputDTO>,
    res: Response<TeamMemberOutputDTO>,
    next: NextFunction
  ) {
    try {
      const { userId, name, position, slogan } = req.body;
      const photo = req.file as Express.Multer.File;
      const teamMember = await teamMembersService.createTeamMember({
        userId,
        name,
        position,
        photo,
        slogan,
      });
      return res.status(201).json(teamMember);
    } catch (error) {
      next(error);
    }
  },
};
