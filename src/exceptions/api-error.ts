import { ValidationError } from 'express-validator';

export class ApiError extends Error {
  status;
  errors;

  constructor(status: number, message: string, errors: ValidationError[] = []) {
    super(message);
    this.status = status;
    this.errors = errors;
  }

  static UnauthorizedError() {
    return new ApiError(401, 'User is not authorized');
  }

  static ForbiddenError(message: string) {
    return new ApiError(403, message);
  }

  static BadRequest(
    status: number,
    message: string,
    errors: ValidationError[] = []
  ) {
    return new ApiError(status, message, errors);
  }

  static NotFound(message: string, errors: ValidationError[] = []) {
    return new ApiError(404, message, errors);
  }

  static ServerError(message: string, errors: ValidationError[] = []) {
    return new ApiError(500, message, errors);
  }
}
