import { Response, NextFunction } from 'express';
import { teamMembersService } from '../services';
import {
  RequestWithBody,
  RequestWithQuery,
  RequestWithParams,
  TeamMemberInputDTO,
  IdParamsDTO,
  TeamMemberOutputDTO,
  TeamMemberUpdateDTO,
  TeamMemberFindDTO,
  TeamMembersFindDTO,
  TeamMemberStatusDTO,
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
    req: RequestWithQuery<TeamMembersFindDTO>,
    res: Response<TeamMemberOutputDTO[]>,
    next: NextFunction
  ) {
    try {
      const teamMembers = await teamMembersService.findTeamMembers(req.query);
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

  async changeStatus(
    req: RequestWithBody<TeamMemberStatusDTO>,
    res: Response<TeamMemberOutputDTO>,
    next: NextFunction
  ) {
    try {
      const teamMember = await teamMembersService.changeStatus(req.body);
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
