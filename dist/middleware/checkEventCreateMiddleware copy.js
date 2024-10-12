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
exports.checkEventCreateMiddleware = void 0;
const api_error_1 = require("../exceptions/api-error");
const repositories_1 = require("../repositories");
const containerName = process.env.AZURE_STORAGE_EVENTS_CONTAINER_NAME;
const checkEventCreateMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { date } = req.body;
        const ISODate = new Date(date).toISOString();
        const candidate = yield repositories_1.eventsRepo.findEvent('date', ISODate);
        if (candidate) {
            throw api_error_1.ApiError.BadRequest(409, `Event with date ${date} already exists`, [
                {
                    type: 'field',
                    value: date,
                    msg: 'event date must be unique',
                    path: 'date',
                    location: 'body',
                },
            ]);
        }
        if (!containerName) {
            throw api_error_1.ApiError.BadRequest(400, 'Storage container name is required');
        }
        next();
    }
    catch (error) {
        return next(error);
    }
});
exports.checkEventCreateMiddleware = checkEventCreateMiddleware;
//# sourceMappingURL=checkEventCreateMiddleware%20copy.js.map