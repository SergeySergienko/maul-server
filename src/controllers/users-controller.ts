import { NextFunction, Response } from 'express';
import { UserInputModel, UserOutputModel, UserUpdateModel } from '../models';
import { usersService } from '../services';
import {
  GetQueryDto,
  RequestWithBody,
  RequestWithParams,
  RequestWithQuery,
} from '../types';

export const usersController = {
  async findUsers(
    req: RequestWithQuery<GetQueryDto>,
    res: Response<UserOutputModel[]>,
    next: NextFunction
  ) {
    try {
      const users = await usersService.findUsers(req.query);
      return res.json(users);
    } catch (error) {
      next(error);
    }
  },

  async createUser(
    req: RequestWithBody<UserInputModel>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const user = await usersService.createUser(req.body);
      return res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  },

  async updateUser(
    req: RequestWithBody<UserUpdateModel>,
    res: Response<UserOutputModel>,
    next: NextFunction
  ) {
    try {
      const user = await usersService.updateUser(req.body);
      return res.json(user);
    } catch (error) {
      next(error);
    }
  },

  async deleteUser(
    req: RequestWithParams<{ id: string }>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const id = await usersService.deleteUser(req.params.id);
      return res.json({ id, message: 'User was deleted successfully' });
    } catch (error) {
      next(error);
    }
  },
};
