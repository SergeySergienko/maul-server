import express from 'express';
import { eventsController } from '../controllers';
import { multerMiddleware } from '../middleware';
import { PHOTO_ARRAY_LIMIT } from '../constants';

export const eventsRouter = express.Router();

eventsRouter.get('/', eventsController.findEvents);
eventsRouter.get('/:id', eventsController.findEvent);
eventsRouter.post(
  '/',
  multerMiddleware('array', PHOTO_ARRAY_LIMIT),
  eventsController.createEvent
);
