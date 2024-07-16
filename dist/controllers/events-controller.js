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
exports.eventsController = void 0;
const services_1 = require("../services");
exports.eventsController = {
    findEvent(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const event = yield services_1.eventsService.findEvent(req.params.id);
                return res.json(event);
            }
            catch (error) {
                next(error);
            }
        });
    },
    findEvents(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { limit, sort } = req.query;
            try {
                const events = yield services_1.eventsService.findEvents({
                    limit,
                    sort,
                });
                return res.json(events);
            }
            catch (error) {
                next(error);
            }
        });
    },
    createEvent(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { date, title, description, location, teamPlace, coverPhoto } = req.body;
                const files = req.files;
                const event = yield services_1.eventsService.createEvent({
                    date,
                    title,
                    description,
                    location,
                    teamPlace,
                    files,
                    coverPhoto,
                });
                return res.status(201).json(event);
            }
            catch (error) {
                next(error);
            }
        });
    },
};
//# sourceMappingURL=events-controller.js.map