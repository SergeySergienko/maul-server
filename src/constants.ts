import { RoleModel } from './models';

export const ALLOWED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp'];
export const IMAGE_WIDTH = 192;
export const IMAGE_HEIGHT = 288;

export const ALLOWED_ROLES: Array<Exclude<keyof typeof RoleModel, 'OWNER'>> = [
  'USER',
  'MEMBER',
  'ADMIN',
];

export const CLIENT_ORIGIN =
  process.env.NODE_ENV === 'production'
    ? process.env.CLIENT_ORIGIN_PRODUCTION || 'https://localhost:4173'
    : 'http://localhost:5173';
