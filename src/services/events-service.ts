import { ObjectId } from 'mongodb';
import { EventModel } from '../models';
import { eventsRepo } from '../repositories';
import { storageService } from '.';
import { ApiError } from '../exceptions/api-error';
import { eventModelMapper, isDateValid } from '../utils';
import {
  EventInputDTO,
  EventOutputDTO,
  EventUpdateDTO,
  EventUpdateBdDTO,
  QueryDTO,
} from '../types';

const containerName = process.env.AZURE_STORAGE_EVENTS_CONTAINER_NAME;

export const eventsService = {
  async findEvent(id: string) {
    const event = await eventsRepo.findEvent('_id', new ObjectId(id));
    if (!event) {
      throw ApiError.NotFound(`Event with id: ${id} wasn't found`, [
        {
          type: 'field',
          value: id,
          msg: 'not found',
          path: 'id',
          location: 'params',
        },
      ]);
    }
    return eventModelMapper(event);
  },

  async findEvents({ limit, sort }: QueryDTO) {
    const events = await eventsRepo.findEvents({
      limit,
      sort,
    });

    if (!events) {
      throw ApiError.ServerError('Internal Server Error');
    }
    return events.map(eventModelMapper);
  },

  async createEvent({
    date,
    title,
    description,
    location,
    teamPlace,
    photos: photoFiles,
    coverPhoto,
  }: EventInputDTO): Promise<EventOutputDTO> {
    const ISODate = new Date(date).toISOString();

    const photos: string[] = [];
    for (const file of photoFiles) {
      const blobFile = await storageService.writeFileToAzureStorage(
        `${containerName}/${date}`,
        file.originalname,
        file.buffer
      );
      photos.push(blobFile.url);
    }

    const newEvent: EventModel = {
      date: ISODate,
      title,
      description,
      location,
      teamPlace,
      photos,
      coverPhoto,
      createdAt: new Date(),
    };
    const { insertedId } = await eventsRepo.createEvent(newEvent);
    if (!insertedId) throw ApiError.ServerError('Internal Server Error');

    return { id: insertedId.toString(), ...newEvent };
  },

  async updateEvent({
    id,
    title,
    description,
    location,
    photos: photoFiles,
    teamPlace,
    coverPhoto,
  }: EventUpdateDTO): Promise<EventOutputDTO> {
    const eventToUpdate: EventUpdateBdDTO = {
      id,
      title,
      description,
      location,
      teamPlace,
      coverPhoto,
    };

    if (photoFiles.length) {
      const event = await this.findEvent(id);

      for (const photo of event.photos) {
        const res = await storageService.deleteFileFromAzureStorage(photo);
        if (res.errorCode) {
          throw ApiError.ServerError('Can not delete blob file');
        }
      }

      const photos: string[] = [];
      const date = event.date.split('T')[0]; // yyyy-mm-ddT00:00:00.000Z => yyyy-mm-dd
      for (const file of photoFiles) {
        const blobFile = await storageService.writeFileToAzureStorage(
          `${containerName}/${date}`,
          file.originalname,
          file.buffer
        );
        photos.push(blobFile.url);
      }

      eventToUpdate.photos = photos;
    }

    const updatedEvent = await eventsRepo.updateEvent(eventToUpdate);
    if (!updatedEvent) {
      throw ApiError.NotFound(`Event with id: ${id} wasn't found`);
    }
    return eventModelMapper(updatedEvent);
  },

  async deleteEvent(id: string) {
    const eventToDelete = await this.findEvent(id);
    for (const photo of eventToDelete.photos) {
      const res = await storageService.deleteFileFromAzureStorage(photo);

      if (res.errorCode) {
        throw ApiError.ServerError('Can not delete blob file');
      }
    }

    const { deletedCount } = await eventsRepo.deleteEvent(id);
    if (deletedCount !== 1) {
      throw ApiError.NotFound(`Event with id: ${id} wasn't found`);
    }

    return id;
  },
};
