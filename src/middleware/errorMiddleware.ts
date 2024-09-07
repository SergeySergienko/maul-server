import { NextFunction, Request, Response } from 'express';
import { ApiError } from '../exceptions/api-error';

export const errorMiddleware = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ApiError) {
    return res
      .status(err.status)
      .json({ message: err.message, errors: err.errors });
  }
  return res
    .status(500)
    .json({
      message: `${err instanceof Error ? err.message : 'Unexpected error'}`,
    });
};
