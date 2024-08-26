import express from 'express';
import { teamMembersController } from '../controllers';
import { multerMiddleware } from '../middleware';
import validateRequest, { validators } from '../validators';

export const teamMembersRouter = express.Router();

teamMembersRouter.get(
  '/',
  validateRequest(validators),
  teamMembersController.findTeamMembers
);
teamMembersRouter.get(
  '/:id',
  validateRequest(validators),
  teamMembersController.findTeamMember
);
teamMembersRouter.post(
  '/',
  multerMiddleware('single'),
  validateRequest(validators),
  teamMembersController.createTeamMember
);
