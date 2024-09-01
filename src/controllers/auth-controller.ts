import { Request, Response, NextFunction } from 'express';
import { RequestWithBody, RequestWithParams } from '../types';
import { UserInputModel } from '../models';
import { setCookie } from '../utils';
import { authService } from '../services';

export const authController = {
  async login(
    req: RequestWithBody<UserInputModel>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { email, password } = req.body;
      const userData = await authService.login({ email, password });
      setCookie(res, 'refreshToken', userData.refreshToken);

      return res.json(userData);
    } catch (error) {
      next(error);
    }
  },

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.cookies;
      await authService.logout(refreshToken);
      res.clearCookie('refreshToken');

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
      setCookie(res, 'refreshToken', userData.refreshToken);

      return res.json(userData);
    } catch (error) {
      next(error);
    }
  },

  async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.cookies;
      const userData = await authService.refresh(refreshToken);
      setCookie(res, 'refreshToken', userData.refreshToken);

      return res.json(userData);
    } catch (error) {
      next(error);
    }
  },
};
