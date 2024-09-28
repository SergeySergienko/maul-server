import bcrypt from 'bcrypt';
import { ApiError } from '../exceptions/api-error';
import { CustomJwtPayload } from '../models';
import { tokensRepo, usersRepo } from '../repositories';
import { getUserWithTokens } from '../utils';
import { tokensService } from '.';
import { UserInputDTO } from '../types';

export const authService = {
  async login({ email, password }: UserInputDTO) {
    const currentUser = await usersRepo.findUser('email', email);
    if (!currentUser) {
      throw ApiError.NotFound('Incorrect login or password');
    }
    const isPasswordValid = await bcrypt.compare(
      password,
      currentUser.password
    );
    if (!isPasswordValid) {
      throw ApiError.NotFound('Incorrect login or password');
    }
    if (currentUser.activationToken) {
      throw ApiError.ForbiddenError('Account has not yet been activated');
    }
    return getUserWithTokens(currentUser);
  },

  async logout(refreshToken: string) {
    await tokensService.deleteToken(refreshToken);
  },

  async activateUser(activationToken: string) {
    const currentUser = await usersRepo.findUser(
      'activationToken',
      activationToken
    );
    if (!currentUser) {
      throw ApiError.BadRequest(400, 'Activation token is incorrect');
    }

    const user = await usersRepo.updateUser({
      id: currentUser._id.toString(),
      activationToken: '',
    });

    if (!user) {
      throw ApiError.ServerError('User was not activated');
    }

    return getUserWithTokens(user);
  },

  async refresh(refreshToken: string) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }

    const secret = process.env.JWT_REFRESH_SECRET;
    if (!secret) {
      throw ApiError.ServerError('Internal Server Error');
    }

    const userData = tokensService.validateToken<CustomJwtPayload>(
      refreshToken,
      secret
    );
    const tokenFromDb = await tokensRepo.findToken(
      'refreshToken',
      refreshToken
    );

    if (!userData || !tokenFromDb) {
      throw ApiError.UnauthorizedError();
    }
    const currentUser = await usersRepo.findUser('email', userData.email);
    if (!currentUser) {
      throw ApiError.UnauthorizedError();
    }

    return getUserWithTokens(currentUser);
  },
};
