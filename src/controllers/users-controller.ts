import { NextFunction, Response } from 'express';
import { usersService } from '../services';
import { RequestWithBody, RequestWithParams, RequestWithQuery } from '../types';
import {
  IdParamsDTO,
  QueryDTO,
  UserInputDTO,
  UserOutputDTO,
  UserUpdateDTO,
} from '../types/dto-types';

export const usersController = {
  async findUsers(
    req: RequestWithQuery<QueryDTO>,
    res: Response<UserOutputDTO[]>,
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
    req: RequestWithBody<UserInputDTO>,
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
    req: RequestWithBody<UserUpdateDTO>,
    res: Response<UserOutputDTO>,
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
    req: RequestWithParams<IdParamsDTO>,
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
