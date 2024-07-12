import { NextFunction, Request, Response } from 'express';
import { ApiError } from '../exceptions/api-error';

export const errorMiddleware = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log('errorMiddleware:', err);
  if (err instanceof ApiError) {
    return res
      .status(err.status)
      .json({ message: err.message, errors: err.errors });
  }
  if (err instanceof Error) {
    return res.status(500).json({ message: err.message });
  }
  return res.status(500).json({ message: 'Unexpected error' });
};
