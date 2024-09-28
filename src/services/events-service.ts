import { ObjectId } from 'mongodb';
import { EventModel } from '../models';
import { eventsRepo } from '../repositories';
import { storageService } from '.';
import { ApiError } from '../exceptions/api-error';
import { eventModelMapper, isDateValid } from '../utils';
import { EventOutputDTO, EventInputDTO, QueryDTO } from '../types';

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
    if (!photoFiles) {
      throw ApiError.BadRequest(400, 'Photos are required', [
        {
          type: 'field',
          value: photoFiles || 'undefined',
          msg: 'photos are required',
          path: 'upload',
          location: 'body',
        },
      ]);
    }
    if (!isDateValid(date))
      throw ApiError.BadRequest(
        409,
        'Event date must be in yyyy-mm-dd format',
        [
          {
            type: 'field',
            value: date,
            msg: 'must be in yyyy-mm-dd format',
            path: 'date',
            location: 'body',
          },
        ]
      );

    const ISODate = new Date(date).toISOString();
    const candidate = await eventsRepo.findEvent('date', ISODate);
    if (candidate) {
      throw ApiError.BadRequest(409, `Event with date ${date} already exists`, [
        {
          type: 'field',
          value: date,
          msg: 'must be unique',
          path: 'date',
          location: 'body',
        },
      ]);
    }
    const containerName = process.env.AZURE_STORAGE_EVENTS_CONTAINER_NAME;
    if (!containerName) {
      throw ApiError.BadRequest(400, 'Storage container name is required');
    }

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
    };
    const { insertedId } = await eventsRepo.createEvent({ ...newEvent });
    if (!insertedId) throw ApiError.ServerError('Internal Server Error');

    return { id: insertedId.toString(), ...newEvent };
  },
};
