import multer from 'multer';

export const multerMiddleware = () => {
  const inMemoryStorage = multer.memoryStorage();

  return multer({ storage: inMemoryStorage }).single('photo');
};
