import { FindOptions, WithId } from 'mongodb';
import { eventCollection } from '.';
import { EventModel } from '../models';
import { QueryDTO } from '../types/dto-types';

export const eventsRepo = {
  async findEvent<T extends keyof WithId<EventModel>>(
    field: T,
    value: WithId<EventModel>[T]
  ) {
    return await eventCollection.findOne({ [field]: value });
  },

  async findEvents({ limit, sort }: QueryDTO) {
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
