"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.multerMiddleware = void 0;
const multer_1 = __importDefault(require("multer"));
const multerMiddleware = () => {
    const inMemoryStorage = multer_1.default.memoryStorage();
    return (0, multer_1.default)({ storage: inMemoryStorage }).single('image');
};
exports.multerMiddleware = multerMiddleware;
//# sourceMappingURL=azureUploadMiddleware.js.map