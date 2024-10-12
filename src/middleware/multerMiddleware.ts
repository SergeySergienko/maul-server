import multer, { Multer } from 'multer';

export const multerMiddleware = <T extends keyof Omit<Multer, 'fields'>>(
  method: T,
  maxCount?: number
) => {
  const storage = multer.memoryStorage();
  return multer({ storage })[method]('upload', maxCount);
};
