import multer, { Multer } from 'multer';
// import { MulterMethodArguments } from '../types';

// export const multerMiddleware2 = <T extends keyof MulterMethodArguments>(
//   methodName: T,
//   ...args: MulterMethodArguments[T]
// ) => {
//   const inMemoryStorage = multer.memoryStorage();
//   const upload = multer({ storage: inMemoryStorage });
//   const method = upload[methodName] as (
//     ...args: MulterMethodArguments[T]
//   ) => ReturnType<Multer[T]>;

//   return method(...args);
// };

export const multerMiddleware = <T extends keyof Omit<Multer, 'fields'>>(
  method: T,
  maxCount?: number
) => {
  const storage = multer.memoryStorage();
  return multer({ storage })[method]('upload', maxCount);
};

// export const multerMiddleware = (
//   methodName: keyof Pick<Multer, 'array' | 'single'>
// ) => {
//   const inMemoryStorage = multer.memoryStorage();
//   const upload = multer({ storage: inMemoryStorage });
//   return upload[methodName]('upload');
// };
