import express from 'express';
import { usersController } from '../controllers';

export const usersRouter = express.Router();

usersRouter.get('/', usersController.findUsers);
usersRouter.post('/', usersController.createUser);
usersRouter.put('/', usersController.updateUser);
usersRouter.delete('/:id', usersController.deleteUser);
