"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventsRouter = void 0;
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const middleware_1 = require("../middleware");
const constants_1 = require("../constants");
const validators_1 = __importStar(require("../validators"));
exports.eventsRouter = express_1.default.Router();
exports.eventsRouter.get('/', (0, validators_1.default)(validators_1.eventsValidators), controllers_1.eventsController.findEvents);
exports.eventsRouter.get('/:id', (0, validators_1.default)(validators_1.eventsValidators), controllers_1.eventsController.findEvent);
exports.eventsRouter.post('/', (0, middleware_1.authMiddleware)('ADMIN'), (0, middleware_1.multerMiddleware)('array', constants_1.PHOTO_ARRAY_LIMIT), (0, validators_1.default)(validators_1.eventsValidators), middleware_1.checkEventCreateMiddleware, controllers_1.eventsController.createEvent);
exports.eventsRouter.put('/', (0, middleware_1.authMiddleware)('ADMIN'), (0, middleware_1.multerMiddleware)('array', constants_1.PHOTO_ARRAY_LIMIT), (0, validators_1.default)(validators_1.eventsValidators), controllers_1.eventsController.updateEvent);
exports.eventsRouter.delete('/:id', (0, middleware_1.authMiddleware)('ADMIN'), (0, validators_1.default)(validators_1.eventsValidators), middleware_1.checkEventDeleteMiddleware, controllers_1.eventsController.deleteEvent);
//# sourceMappingURL=events-router.js.map