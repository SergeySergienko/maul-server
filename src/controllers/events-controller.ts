import { Response, NextFunction } from 'express';
import { WithId } from 'mongodb';
import { EventModel } from '../models';
import { eventsService } from '../services';
import {
  RequestWithBody,
  RequestWithQuery,
  GetQueryDto,
  GetParamsDto,
  RequestWithParams,
  PostEventDto,
} from '../types';

export const eventsController = {
  async findEvent(
    req: RequestWithParams<GetParamsDto>,
    res: Response<WithId<EventModel>>,
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
    req: RequestWithQuery<GetQueryDto>,
    res: Response<WithId<EventModel>[]>,
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
    req: RequestWithBody<PostEventDto>,
    res: Response<WithId<EventModel>>,
    next: NextFunction
  ) {
    try {
      const { date, title, description, location, teamPlace, coverPhoto } =
        req.body;
      const files = req.files as Express.Multer.File[];
      const event = await eventsService.createEvent({
        date,
        title,
        description,
        location,
        teamPlace,
        files,
        coverPhoto,
      });
      return res.status(201).json(event);
    } catch (error) {
      next(error);
    }
  },
};
