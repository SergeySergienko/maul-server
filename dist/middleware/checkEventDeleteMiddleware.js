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
exports.checkEventDeleteMiddleware = void 0;
const mongodb_1 = require("mongodb");
const repositories_1 = require("../repositories");
const api_error_1 = require("../exceptions/api-error");
const checkEventDeleteMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const event = yield repositories_1.eventsRepo.findEvent('_id', new mongodb_1.ObjectId(req.params.id));
        if (!event) {
            throw api_error_1.ApiError.BadRequest(400, 'Event ID is incorrect');
        }
        if (event.protected) {
            throw api_error_1.ApiError.ForbiddenError(`No permission to delete event with ID ${event._id}`);
        }
        next();
    }
    catch (error) {
        return next(error);
    }
});
exports.checkEventDeleteMiddleware = checkEventDeleteMiddleware;
//# sourceMappingURL=checkEventDeleteMiddleware.js.map