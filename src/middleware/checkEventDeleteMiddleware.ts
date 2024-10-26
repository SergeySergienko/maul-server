import { Response, NextFunction } from 'express';
import { ObjectId } from 'mongodb';
import { RequestWithParams, IdParamsDTO } from '../types';
import { eventsRepo } from '../repositories';
import { ApiError } from '../exceptions/api-error';

export const checkEventDeleteMiddleware = async (
  req: RequestWithParams<IdParamsDTO>,
  res: Response,
  next: NextFunction
) => {
  try {
    const event = await eventsRepo.findEvent(
      '_id',
      new ObjectId(req.params.id)
    );
    if (!event) {
      throw ApiError.BadRequest(400, 'Event ID is incorrect');
    }

    if (event.protected) {
      throw ApiError.ForbiddenError(
        `No permission to delete event with ID ${event._id}`
      );
    }

    next();
  } catch (error) {
    return next(error);
  }
};
