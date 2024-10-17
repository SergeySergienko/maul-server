import { Response, NextFunction } from 'express';
import { teamMembersService } from '../services';
import {
  RequestWithBody,
  RequestWithQuery,
  RequestWithParams,
  TeamMemberInputDTO,
  IdParamsDTO,
  QueryDTO,
  TeamMemberOutputDTO,
  TeamMemberUpdateDTO,
  TeamMemberFindDTO,
} from '../types';

export const teamMembersController = {
  async findTeamMember(
    req: RequestWithParams<IdParamsDTO>,
    res: Response<TeamMemberOutputDTO>,
    next: NextFunction
  ) {
    try {
      const teamMember = await teamMembersService.findTeamMember(req.params.id);
      return res.json(teamMember);
    } catch (error) {
      next(error);
    }
  },

  async findTeamMemberByUserId(
    req: RequestWithQuery<TeamMemberFindDTO>,
    res: Response<TeamMemberOutputDTO>,
    next: NextFunction
  ) {
    try {
      const teamMember = await teamMembersService.findTeamMemberByUserId(
        req.query.userId
      );
      return res.json(teamMember);
    } catch (error) {
      next(error);
    }
  },

  async findTeamMembers(
    req: RequestWithQuery<QueryDTO>,
    res: Response<TeamMemberOutputDTO[]>,
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

  async activateTeamMember(
    req: RequestWithParams<IdParamsDTO>,
    res: Response<TeamMemberOutputDTO>,
    next: NextFunction
  ) {
    try {
      const teamMember = await teamMembersService.activateTeamMember(
        req.params.id
      );
      return res.json(teamMember);
    } catch (error) {
      next(error);
    }
  },

  async updateTeamMember(
    req: RequestWithBody<TeamMemberUpdateDTO>,
    res: Response<TeamMemberOutputDTO>,
    next: NextFunction
  ) {
    try {
      const { id, name, position, slogan } = req.body;
      const photo = req.file as Express.Multer.File;

      const teamMember = await teamMembersService.updateTeamMember({
        id,
        name,
        position,
        photo,
        slogan,
      });

      return res.json(teamMember);
    } catch (error) {
      next(error);
    }
  },

  async deleteTeamMember(
    req: RequestWithParams<IdParamsDTO>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const id = await teamMembersService.deleteTeamMember(req.params.id);
      return res.json({ id, message: 'Team member was deleted successfully' });
    } catch (error) {
      next(error);
    }
  },
};
