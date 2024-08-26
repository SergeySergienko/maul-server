"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRouter = void 0;
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
exports.usersRouter = express_1.default.Router();
exports.usersRouter.get('/', controllers_1.usersController.findUsers);
exports.usersRouter.post('/', controllers_1.usersController.createUser);
exports.usersRouter.put('/', controllers_1.usersController.updateUser);
exports.usersRouter.delete('/:id', controllers_1.usersController.deleteUser);
//# sourceMappingURL=users-router.js.map