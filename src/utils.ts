import path from 'path';
import sharp from 'sharp';
import { NormalizedImageResult } from './types';
import { ALLOWED_EXTENSIONS, IMAGE_HEIGHT, IMAGE_WIDTH } from './constants';

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
    ? `${originalFileName}.png`
    : null;

  const resizedImageBuffer = await sharp(file.buffer)
    .resize(IMAGE_WIDTH, IMAGE_HEIGHT)
    .png()
    // { quality: 50, palette: true }
    .toBuffer();

  return {
    normalizedFileName,
    resizedImageBuffer,
  };
};
