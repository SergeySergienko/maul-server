import { JwtPayload } from 'jsonwebtoken';
import { UserOutputDTO } from '../types/dto-types';

export interface TokenModel {
  userId: string;
  refreshToken: string;
}

export interface CustomJwtPayload extends JwtPayload, UserOutputDTO {}
