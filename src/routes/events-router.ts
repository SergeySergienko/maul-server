import express from 'express';
import { eventsController } from '../controllers';
import { multerMiddleware } from '../middleware';

export const getEventsRouter = () => {
  const router = express.Router();

  router.get('/', eventsController.findEvents);
  router.get('/:id', eventsController.findEvent);

  router.post('/', multerMiddleware('array', 20), eventsController.createEvent);

  return router;
};
