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
            if (!photoFiles) {
                throw api_error_1.ApiError.BadRequest(400, 'Photos are required', [
                    {
                        type: 'field',
                        value: photoFiles || 'undefined',
                        msg: 'photos are required',
                        path: 'upload',
                        location: 'body',
                    },
                ]);
            }
            if (!(0, utils_1.isDateValid)(date))
                throw api_error_1.ApiError.BadRequest(409, 'Event date must be in yyyy-mm-dd format', [
                    {
                        type: 'field',
                        value: date,
                        msg: 'must be in yyyy-mm-dd format',
                        path: 'date',
                        location: 'body',
                    },
                ]);
            const ISODate = new Date(date).toISOString();
            const candidate = yield repositories_1.eventsRepo.findEvent('date', ISODate);
            if (candidate) {
                throw api_error_1.ApiError.BadRequest(409, `Event with date ${date} already exists`, [
                    {
                        type: 'field',
                        value: date,
                        msg: 'must be unique',
                        path: 'date',
                        location: 'body',
                    },
                ]);
            }
            if (!containerName) {
                throw api_error_1.ApiError.BadRequest(400, 'Storage container name is required');
            }
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
            };
            const { insertedId } = yield repositories_1.eventsRepo.createEvent(Object.assign({}, newEvent));
            if (!insertedId)
                throw api_error_1.ApiError.ServerError('Internal Server Error');
            return Object.assign({ id: insertedId.toString() }, newEvent);
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