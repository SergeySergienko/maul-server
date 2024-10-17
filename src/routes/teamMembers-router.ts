import express from 'express';
import { teamMembersController } from '../controllers';
import {
  authMiddleware,
  checkTeamMemberActivateMiddleware,
  checkTeamMemberCreateMiddleware,
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
  '/:id',
  authMiddleware('ADMIN'),
  validateRequest(teamMembersValidators),
  checkTeamMemberActivateMiddleware,
  teamMembersController.activateTeamMember
);
teamMembersRouter.put(
  '/',
  authMiddleware('MEMBER'),
  multerMiddleware('single'),
  validateRequest(teamMembersValidators),
  teamMembersController.updateTeamMember
);
teamMembersRouter.delete(
  '/:id',
  authMiddleware('ADMIN'),
  validateRequest(teamMembersValidators),
  teamMembersController.deleteTeamMember
);
