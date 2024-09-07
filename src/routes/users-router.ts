import express from 'express';
import { usersController } from '../controllers';
import validateRequest, { usersValidators } from '../validators';
import {
  authMiddleware,
  checkUserDeleteMiddleware,
  checkUserUpdateMiddleware,
} from '../middleware';

export const usersRouter = express.Router();

usersRouter.get(
  '/',
  authMiddleware('ADMIN'),
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
  authMiddleware('ADMIN'),
  validateRequest(usersValidators),
  checkUserUpdateMiddleware,
  usersController.updateUser
);
usersRouter.delete(
  '/:id',
  authMiddleware('ADMIN'),
  validateRequest(usersValidators),
  checkUserDeleteMiddleware,
  usersController.deleteUser
);
