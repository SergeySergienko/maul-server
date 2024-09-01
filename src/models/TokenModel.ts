import { JwtPayload } from 'jsonwebtoken';
import { UserOutputModel } from '.';

export interface TokenModel {
  userId: string;
  refreshToken: string;
}

export interface CustomJwtPayload extends JwtPayload, UserOutputModel {}
