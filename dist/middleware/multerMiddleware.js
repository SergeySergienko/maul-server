"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.multerMiddleware = void 0;
const multer_1 = __importDefault(require("multer"));
const multerMiddleware = (method, maxCount) => {
    const storage = multer_1.default.memoryStorage();
    return (0, multer_1.default)({ storage })[method]('upload', maxCount);
};
exports.multerMiddleware = multerMiddleware;
//# sourceMappingURL=multerMiddleware.js.map