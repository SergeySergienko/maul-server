import express from 'express';
import { eventsController } from '../controllers';
import { multerMiddleware } from '../middleware';

export const eventsRouter = express.Router();

eventsRouter.get('/', eventsController.findEvents);
eventsRouter.get('/:id', eventsController.findEvent);
eventsRouter.post(
  '/',
  multerMiddleware('array', 20),
  eventsController.createEvent
);
