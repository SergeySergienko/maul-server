import jwt from 'jsonwebtoken';
import { ApiError } from '../exceptions/api-error';
import { TokenModel } from '../models';
import { tokensRepo } from '../repositories';
import { accessTokenExpiryTime, refreshTokenExpiryTime } from './constants';
import { UserOutputDTO } from '../types/dto-types';

export const tokensService = {
  generateTokens(payload: UserOutputDTO) {
    if (!process.env.JWT_ACCESS_SECRET || !process.env.JWT_REFRESH_SECRET)
      throw ApiError.ServerError('Internal Server Error');

    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
      expiresIn: accessTokenExpiryTime,
    });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
      expiresIn: refreshTokenExpiryTime,
    });

    return { accessToken, refreshToken };
  },

  validateToken<T>(token: string, secret: string) {
    try {
      const userData = jwt.verify(token, secret) as T;
      return userData;
    } catch (error) {
      return null;
    }
  },

  async saveToken({ userId, refreshToken }: TokenModel) {
    const tokenData = await tokensRepo.findToken('userId', userId);
    if (tokenData) {
      const result = await tokensRepo.updateToken({
        userId,
        refreshToken,
      });
      if (!result) {
        throw ApiError.ServerError('Updating token Error');
      }
      return result;
    }
    const result = await tokensRepo.createToken({
      userId,
      refreshToken,
    });
    if (!result) {
      throw ApiError.ServerError('Saving token Error');
    }
    return result;
  },

  async deleteToken(refreshToken: string) {
    const { deletedCount } = await tokensRepo.deleteToken(refreshToken);
    if (deletedCount !== 1) {
      throw ApiError.NotFound('Logout Error');
    }
  },
};
