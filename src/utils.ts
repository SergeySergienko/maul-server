import { WithId } from 'mongodb';
import path from 'path';
import sharp from 'sharp';
import { NormalizedImageResult } from './types';
import { ALLOWED_EXTENSIONS, IMAGE_HEIGHT, IMAGE_WIDTH } from './constants';
import { EventModel, UserModel } from './models';
import { tokensService } from './services';
import { EventOutputDTO, UserOutputDTO } from './types';

export const isDateValid = (date: string) => {
  const regex = /^\d{4}-\d{2}-\d{2}$/;

  return regex.test(date);
};

export const normalizeImage = async (
  file: Express.Multer.File
): Promise<NormalizedImageResult> => {
  const { name: originalFileName, ext: originalFileExtension } = path.parse(
    file.originalname
  );

  const isExtensionAllowed = ALLOWED_EXTENSIONS.includes(
    originalFileExtension.toLowerCase()
  );
  const normalizedFileName = isExtensionAllowed
    ? `${originalFileName}.webp`
    : null;

  const resizedImageBuffer = await sharp(file.buffer)
    .resize(IMAGE_WIDTH, IMAGE_HEIGHT)
    .webp({ quality: 50, nearLossless: true })
    .toBuffer();

  return {
    normalizedFileName,
    resizedImageBuffer,
  };
};

export const userModelMapper = ({
  _id,
  email,
  role,
  createdAt,
  updatedAt,
}: WithId<UserModel>): UserOutputDTO => ({
  id: _id.toString(),
  email,
  role,
  createdAt,
  updatedAt,
});

export const eventModelMapper = (event: WithId<EventModel>): EventOutputDTO => {
  const { _id, ...rest } = event;
  return { id: _id.toString(), ...rest };
};

export const getUserWithTokens = async (userData: WithId<UserModel>) => {
  const user = userModelMapper(userData);
  const tokens = tokensService.generateTokens(user);
  await tokensService.saveToken({
    userId: user.id,
    refreshToken: tokens.refreshToken,
  });

  return {
    ...tokens,
    user,
  };
};
