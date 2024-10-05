import express from 'express';
import { eventsController } from '../controllers';
import {
  authMiddleware,
  checkEventCreateMiddleware,
  multerMiddleware,
} from '../middleware';
import { PHOTO_ARRAY_LIMIT } from '../constants';
import validateRequest, { eventsValidators } from '../validators';

export const eventsRouter = express.Router();

eventsRouter.get(
  '/',
  validateRequest(eventsValidators),
  eventsController.findEvents
);
eventsRouter.get(
  '/:id',
  validateRequest(eventsValidators),
  eventsController.findEvent
);
eventsRouter.post(
  '/',
  authMiddleware('ADMIN'),
  multerMiddleware('array', PHOTO_ARRAY_LIMIT),
  validateRequest(eventsValidators),
  checkEventCreateMiddleware,
  eventsController.createEvent
);
eventsRouter.put(
  '/',
  authMiddleware('ADMIN'),
  multerMiddleware('array', PHOTO_ARRAY_LIMIT),
  validateRequest(eventsValidators),
  eventsController.updateEvent
);
eventsRouter.delete(
  '/:id',
  authMiddleware('ADMIN'),
  validateRequest(eventsValidators),
  eventsController.deleteEvent
);
