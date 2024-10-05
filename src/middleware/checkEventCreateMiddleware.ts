import { NextFunction, Response } from 'express';
import { ApiError } from '../exceptions/api-error';
import { EventInputDTO, EventOutputDTO, RequestWithBody } from '../types';
import { eventsRepo } from '../repositories';

const containerName = process.env.AZURE_STORAGE_EVENTS_CONTAINER_NAME;

export const checkEventCreateMiddleware = async (
  req: RequestWithBody<EventInputDTO>,
  res: Response<EventOutputDTO>,
  next: NextFunction
) => {
  try {
    const { date } = req.body;

    const ISODate = new Date(date).toISOString();
    const candidate = await eventsRepo.findEvent('date', ISODate);
    if (candidate) {
      throw ApiError.BadRequest(409, `Event with date ${date} already exists`, [
        {
          type: 'field',
          value: date,
          msg: 'event date must be unique',
          path: 'date',
          location: 'body',
        },
      ]);
    }
    if (!containerName) {
      throw ApiError.BadRequest(400, 'Storage container name is required');
    }

    next();
  } catch (error) {
    return next(error);
  }
};
