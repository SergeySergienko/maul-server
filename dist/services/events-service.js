"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventsService = void 0;
const mongodb_1 = require("mongodb");
const repositories_1 = require("../repositories");
const _1 = require(".");
const api_error_1 = require("../exceptions/api-error");
const utils_1 = require("../utils");
const containerName = process.env.AZURE_STORAGE_EVENTS_CONTAINER_NAME;
exports.eventsService = {
    findEvent(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const event = yield repositories_1.eventsRepo.findEvent('_id', new mongodb_1.ObjectId(id));
            if (!event) {
                throw api_error_1.ApiError.NotFound(`Event with id: ${id} wasn't found`, [
                    {
                        type: 'field',
                        value: id,
                        msg: 'not found',
                        path: 'id',
                        location: 'params',
                    },
                ]);
            }
            return (0, utils_1.eventModelMapper)(event);
        });
    },
    findEvents(_a) {
        return __awaiter(this, arguments, void 0, function* ({ limit, sort }) {
            const events = yield repositories_1.eventsRepo.findEvents({
                limit,
                sort,
            });
            if (!events) {
                throw api_error_1.ApiError.ServerError('Internal Server Error');
            }
            return events.map(utils_1.eventModelMapper);
        });
    },
    createEvent(_a) {
        return __awaiter(this, arguments, void 0, function* ({ date, title, description, location, teamPlace, photos: photoFiles, coverPhoto, }) {
            const ISODate = new Date(date).toISOString();
            const photos = [];
            for (const file of photoFiles) {
                const blobFile = yield _1.storageService.writeFileToAzureStorage(`${containerName}/${date}`, file.originalname, file.buffer);
                photos.push(blobFile.url);
            }
            const newEvent = {
                date: ISODate,
                title,
                description,
                location,
                teamPlace,
                photos,
                coverPhoto,
                createdAt: new Date(),
            };
            const { insertedId } = yield repositories_1.eventsRepo.createEvent(newEvent);
            if (!insertedId)
                throw api_error_1.ApiError.ServerError('Internal Server Error');
            return Object.assign({ id: insertedId.toString() }, newEvent);
        });
    },
    updateEvent(_a) {
        return __awaiter(this, arguments, void 0, function* ({ id, title, description, location, photos: photoFiles, teamPlace, coverPhoto, }) {
            const event = yield this.findEvent(id);
            for (const photo of event.photos) {
                const res = yield _1.storageService.deleteFileFromAzureStorage(photo);
                if (res.errorCode) {
                    throw api_error_1.ApiError.ServerError('Can not delete blob file');
                }
            }
            const photos = [];
            const date = event.date.split('T')[0]; // yyyy-mm-ddT00:00:00.000Z => yyyy-mm-dd
            for (const file of photoFiles) {
                const blobFile = yield _1.storageService.writeFileToAzureStorage(`${containerName}/${date}`, file.originalname, file.buffer);
                photos.push(blobFile.url);
            }
            const eventToUpdate = {
                id,
                title,
                description,
                location,
                photos,
                teamPlace,
                coverPhoto,
            };
            const updatedEvent = yield repositories_1.eventsRepo.updateEvent(eventToUpdate);
            if (!updatedEvent) {
                throw api_error_1.ApiError.NotFound(`Event with id: ${id} wasn't found`);
            }
            return (0, utils_1.eventModelMapper)(updatedEvent);
        });
    },
    deleteEvent(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const eventToDelete = yield this.findEvent(id);
            for (const photo of eventToDelete.photos) {
                const res = yield _1.storageService.deleteFileFromAzureStorage(photo);
                if (res.errorCode) {
                    throw api_error_1.ApiError.ServerError('Can not delete blob file');
                }
            }
            const { deletedCount } = yield repositories_1.eventsRepo.deleteEvent(id);
            if (deletedCount !== 1) {
                throw api_error_1.ApiError.NotFound(`Event with id: ${id} wasn't found`);
            }
            return id;
        });
    },
};
//# sourceMappingURL=events-service.js.map