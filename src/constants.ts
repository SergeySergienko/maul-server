import { PositionModel, RoleModel, StatusModel } from './models';

export const ALLOWED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp'];
export const IMAGE_WIDTH = 192;
export const IMAGE_HEIGHT = 288;

export const PHOTO_ARRAY_LIMIT = 20;

export const ALLOWED_ROLES: Array<Exclude<keyof typeof RoleModel, 'OWNER'>> = [
  'USER',
  'ADMIN',
];

export const POSITIONS: Array<keyof typeof PositionModel> = [
  'UNIVERSAL',
  'LIBERO',
  'SETTER',
  'HITTER',
];

export const STATUSES: Array<keyof typeof StatusModel> = [
  'CANDIDATE',
  'MEMBER',
];

export const CLIENT_ORIGIN =
  process.env.NODE_ENV === 'production'
    ? process.env.CLIENT_ORIGIN_PRODUCTION || 'https://localhost:4173'
    : 'http://localhost:5173';
