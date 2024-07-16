"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.multerMiddleware = void 0;
const multer_1 = __importDefault(require("multer"));
// import { MulterMethodArguments } from '../types';
// export const multerMiddleware2 = <T extends keyof MulterMethodArguments>(
//   methodName: T,
//   ...args: MulterMethodArguments[T]
// ) => {
//   const inMemoryStorage = multer.memoryStorage();
//   const upload = multer({ storage: inMemoryStorage });
//   const method = upload[methodName] as (
//     ...args: MulterMethodArguments[T]
//   ) => ReturnType<Multer[T]>;
//   return method(...args);
// };
const multerMiddleware = (method, maxCount) => {
    const storage = multer_1.default.memoryStorage();
    return (0, multer_1.default)({ storage })[method]('upload', maxCount);
};
exports.multerMiddleware = multerMiddleware;
// export const multerMiddleware = (
//   methodName: keyof Pick<Multer, 'array' | 'single'>
// ) => {
//   const inMemoryStorage = multer.memoryStorage();
//   const upload = multer({ storage: inMemoryStorage });
//   return upload[methodName]('upload');
// };
//# sourceMappingURL=multerMiddleware.js.map