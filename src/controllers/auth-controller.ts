import { Request, Response, NextFunction } from 'express';
import { RequestWithBody, RequestWithParams } from '../types';
import { authService } from '../services';
import { UserInputDTO } from '../types';

export const authController = {
  async login(
    req: RequestWithBody<UserInputDTO>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { email, password } = req.body;
      const userData = await authService.login({ email, password });

      return res.json(userData);
    } catch (error) {
      next(error);
    }
  },

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const refreshToken = req.headers['x-refresh-token'] as string;
      await authService.logout(refreshToken);

      return res.json({ message: 'User successfully logged out' });
    } catch (error) {
      next(error);
    }
  },

  async activate(
    req: RequestWithParams<{ activationToken: string }>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const userData = await authService.activateUser(
        req.params.activationToken
      );

      return res.json(userData);
    } catch (error) {
      next(error);
    }
  },

  async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const refreshToken = req.headers['x-refresh-token'] as string;
      const userData = await authService.refresh(refreshToken);

      return res.json(userData);
    } catch (error) {
      next(error);
    }
  },
};
