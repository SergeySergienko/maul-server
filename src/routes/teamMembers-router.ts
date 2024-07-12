import express from 'express';
import { teamMembersController } from '../controllers';
import { multerMiddleware } from '../middleware';

export const getTeamMembersRouter = () => {
  const router = express.Router();

  router.get('/', teamMembersController.findTeamMembers);

  router.post('/', multerMiddleware(), teamMembersController.createTeamMember);

  return router;
};
