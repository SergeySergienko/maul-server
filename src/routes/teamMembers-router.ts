import express from 'express';
import { teamMembersController } from '../controllers';
import { multerMiddleware } from '../middleware';
import validateRequest, { validators } from '../validators';

export const getTeamMembersRouter = () => {
  const router = express.Router();

  router.get(
    '/',
    validateRequest(validators),
    teamMembersController.findTeamMembers
  );

  router.get(
    '/:id',
    validateRequest(validators),
    teamMembersController.findTeamMember
  );

  router.post(
    '/',
    multerMiddleware('single'),
    validateRequest(validators),
    teamMembersController.createTeamMember
  );

  return router;
};
