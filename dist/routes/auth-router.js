"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
exports.authRouter = express_1.default.Router();
exports.authRouter.post('/login', controllers_1.authController.login);
exports.authRouter.post('/logout', controllers_1.authController.logout);
exports.authRouter.put('/activate/:activationToken', controllers_1.authController.activate);
exports.authRouter.get('/refresh', controllers_1.authController.refresh);
//# sourceMappingURL=auth-router.js.map