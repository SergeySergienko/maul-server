"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEventsRouter = void 0;
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const middleware_1 = require("../middleware");
const getEventsRouter = () => {
    const router = express_1.default.Router();
    router.get('/', controllers_1.eventsController.findEvents);
    router.get('/:id', controllers_1.eventsController.findEvent);
    router.post('/', (0, middleware_1.multerMiddleware)('array', 20), controllers_1.eventsController.createEvent);
    return router;
};
exports.getEventsRouter = getEventsRouter;
//# sourceMappingURL=events-router.js.map