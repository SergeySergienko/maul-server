import express from 'express';
import { teamMembersController } from '../controllers';
import { multerMiddleware } from '../middleware';
import validateRequest, { teamMembersValidators } from '../validators';

export const teamMembersRouter = express.Router();

teamMembersRouter.get(
  '/',
  validateRequest(teamMembersValidators),
  teamMembersController.findTeamMembers
);
teamMembersRouter.get(
  '/:id',
  validateRequest(teamMembersValidators),
  teamMembersController.findTeamMember
);
teamMembersRouter.post(
  '/',
  multerMiddleware('single'),
  validateRequest(teamMembersValidators),
  teamMembersController.createTeamMember
);
