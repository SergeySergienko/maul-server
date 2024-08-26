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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userModelMapper = exports.normalizeImage = exports.isDateValid = void 0;
const path_1 = __importDefault(require("path"));
const sharp_1 = __importDefault(require("sharp"));
const constants_1 = require("./constants");
const models_1 = require("./models");
const isDateValid = (date) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    return regex.test(date);
};
exports.isDateValid = isDateValid;
const normalizeImage = (file) => __awaiter(void 0, void 0, void 0, function* () {
    const { name: originalFileName, ext: originalFileExtension } = path_1.default.parse(file.originalname);
    const isExtensionAllowed = constants_1.ALLOWED_EXTENSIONS.includes(originalFileExtension.toLowerCase());
    const normalizedFileName = isExtensionAllowed
        ? `${originalFileName}.webp`
        : null;
    const resizedImageBuffer = yield (0, sharp_1.default)(file.buffer)
        .resize(constants_1.IMAGE_WIDTH, constants_1.IMAGE_HEIGHT)
        .webp({ quality: 50, nearLossless: true })
        .toBuffer();
    return {
        normalizedFileName,
        resizedImageBuffer,
    };
});
exports.normalizeImage = normalizeImage;
const userModelMapper = ({ _id, email, role, isActivated, activationToken, }) => ({
    id: _id.toString(),
    email,
    role: models_1.RoleModel[role],
    isActivated,
    activationToken,
});
exports.userModelMapper = userModelMapper;
//# sourceMappingURL=utils.js.map