import { Response, NextFunction } from 'express';
import { eventsService } from '../services';
import {
  RequestWithBody,
  RequestWithQuery,
  RequestWithParams,
  EventInputDTO,
  EventOutputDTO,
  EventUpdateDTO,
  IdParamsDTO,
  QueryDTO,
} from '../types';

export const eventsController = {
  async findEvent(
    req: RequestWithParams<IdParamsDTO>,
    res: Response<EventOutputDTO>,
    next: NextFunction
  ) {
    try {
      const event = await eventsService.findEvent(req.params.id);
      return res.json(event);
    } catch (error) {
      next(error);
    }
  },

  async findEvents(
    req: RequestWithQuery<QueryDTO>,
    res: Response<EventOutputDTO[]>,
    next: NextFunction
  ) {
    const { limit, sort } = req.query;
    try {
      const events = await eventsService.findEvents({
        limit,
        sort,
      });
      return res.json(events);
    } catch (error) {
      next(error);
    }
  },

  async createEvent(
    req: RequestWithBody<EventInputDTO>,
    res: Response<EventOutputDTO>,
    next: NextFunction
  ) {
    try {
      const { date, title, description, location, teamPlace, coverPhoto } =
        req.body;

      const photos = req.files as Express.Multer.File[];
      const event = await eventsService.createEvent({
        date,
        title,
        description,
        location,
        teamPlace,
        photos,
        coverPhoto,
      });
      return res.status(201).json(event);
    } catch (error) {
      next(error);
    }
  },

  async updateEvent(
    req: RequestWithBody<EventUpdateDTO>,
    res: Response<EventOutputDTO>,
    next: NextFunction
  ) {
    try {
      const { id, title, description, location, teamPlace, coverPhoto } =
        req.body;
      const photos = req.files as Express.Multer.File[];

      const event = await eventsService.updateEvent({
        id,
        title,
        description,
        location,
        photos,
        teamPlace,
        coverPhoto,
      });

      return res.json(event);
    } catch (error) {
      next(error);
    }
  },

  async deleteEvent(
    req: RequestWithParams<IdParamsDTO>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const id = await eventsService.deleteEvent(req.params.id);
      return res.json({ id, message: 'Event was deleted successfully' });
    } catch (error) {
      next(error);
    }
  },
};
