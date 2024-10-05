import { FindOptions, ObjectId, WithId } from 'mongodb';
import { eventCollection } from '.';
import { EventModel } from '../models';
import { EventUpdateBdDTO, QueryDTO } from '../types';

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
    options.sort = { date: sort || 'desc' };

    return await eventCollection.find({}, options).toArray();
  },

  async createEvent(event: EventModel) {
    return await eventCollection.insertOne(event);
  },

  async updateEvent(updateData: EventUpdateBdDTO) {
    const { id, ...fieldsToUpdate } = updateData;

    const result = await eventCollection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: { ...fieldsToUpdate, updatedAt: new Date() } },
      { returnDocument: 'after' }
    );

    return result.value;
  },

  async deleteEvent(id: string) {
    return await eventCollection.deleteOne({ _id: new ObjectId(id) });
  },
};
