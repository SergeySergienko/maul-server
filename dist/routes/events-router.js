"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventsRouter = void 0;
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const middleware_1 = require("../middleware");
exports.eventsRouter = express_1.default.Router();
exports.eventsRouter.get('/', controllers_1.eventsController.findEvents);
exports.eventsRouter.get('/:id', controllers_1.eventsController.findEvent);
exports.eventsRouter.post('/', (0, middleware_1.multerMiddleware)('array', 20), controllers_1.eventsController.createEvent);
//# sourceMappingURL=events-router.js.map