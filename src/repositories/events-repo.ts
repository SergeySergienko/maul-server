import { FindOptions, WithId } from 'mongodb';
import { eventCollection } from '.';
import { EventModel } from '../models';
import { GetQueryDto } from '../types';

export const eventsRepo = {
  async findEvent<T extends keyof WithId<EventModel>>(
    field: T,
    value: WithId<EventModel>[T]
  ) {
    return await eventCollection.findOne({ [field]: value });
  },

  async findEvents({ limit, sort }: GetQueryDto) {
    const options: FindOptions = {};

    if (limit) {
      options.limit = +limit;
    }
    options.sort = { date: sort || 'asc' };

    return await eventCollection.find({}, options).toArray();
  },

  async createEvent(event: EventModel) {
    return await eventCollection.insertOne(event);
  },
};
