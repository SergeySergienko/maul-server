import express from 'express';
import { teamMembersController } from '../controllers';
import {
  authMiddleware,
  checkTeamMemberStatusMiddleware,
  checkTeamMemberCreateMiddleware,
  checkTeamMemberDeleteMiddleware,
  checkTeamMemberUpdateMiddleware,
  multerMiddleware,
} from '../middleware';
import validateRequest, { teamMembersValidators } from '../validators';

export const teamMembersRouter = express.Router();

teamMembersRouter.get(
  '/',
  validateRequest(teamMembersValidators),
  teamMembersController.findTeamMembers
);
teamMembersRouter.get(
  '/search',
  validateRequest(teamMembersValidators),
  teamMembersController.findTeamMemberByUserId
);
teamMembersRouter.get(
  '/:id',
  validateRequest(teamMembersValidators),
  teamMembersController.findTeamMember
);
teamMembersRouter.post(
  '/',
  authMiddleware('USER'),
  multerMiddleware('single'),
  validateRequest(teamMembersValidators),
  checkTeamMemberCreateMiddleware,
  teamMembersController.createTeamMember
);
teamMembersRouter.patch(
  '/',
  authMiddleware('ADMIN'),
  validateRequest(teamMembersValidators),
  checkTeamMemberStatusMiddleware,
  teamMembersController.changeStatus
);
teamMembersRouter.put(
  '/',
  authMiddleware('USER'),
  multerMiddleware('single'),
  validateRequest(teamMembersValidators),
  checkTeamMemberUpdateMiddleware,
  teamMembersController.updateTeamMember
);
teamMembersRouter.delete(
  '/:id',
  authMiddleware('USER'),
  validateRequest(teamMembersValidators),
  checkTeamMemberDeleteMiddleware,
  teamMembersController.deleteTeamMember
);
