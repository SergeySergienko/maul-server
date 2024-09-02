import express from 'express';
import { usersController } from '../controllers';
import validateRequest, { usersValidators } from '../validators';
import { checkUserUpdateMiddleware } from '../middleware';

export const usersRouter = express.Router();

usersRouter.get(
  '/',
  validateRequest(usersValidators),
  usersController.findUsers
);
usersRouter.post(
  '/',
  validateRequest(usersValidators),
  usersController.createUser
);
usersRouter.put(
  '/',
  validateRequest(usersValidators),
  checkUserUpdateMiddleware,
  usersController.updateUser
);
usersRouter.delete(
  '/:id',
  validateRequest(usersValidators),
  usersController.deleteUser
);
