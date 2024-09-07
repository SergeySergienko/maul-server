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
exports.usersRouter = void 0;
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const validators_1 = __importStar(require("../validators"));
const middleware_1 = require("../middleware");
exports.usersRouter = express_1.default.Router();
exports.usersRouter.get('/', (0, middleware_1.authMiddleware)('ADMIN'), (0, validators_1.default)(validators_1.usersValidators), controllers_1.usersController.findUsers);
exports.usersRouter.post('/', (0, validators_1.default)(validators_1.usersValidators), controllers_1.usersController.createUser);
exports.usersRouter.put('/', (0, middleware_1.authMiddleware)('ADMIN'), (0, validators_1.default)(validators_1.usersValidators), middleware_1.checkUserUpdateMiddleware, controllers_1.usersController.updateUser);
exports.usersRouter.delete('/:id', (0, middleware_1.authMiddleware)('ADMIN'), (0, validators_1.default)(validators_1.usersValidators), middleware_1.checkUserDeleteMiddleware, controllers_1.usersController.deleteUser);
//# sourceMappingURL=users-router.js.map