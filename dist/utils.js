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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizeUser = exports.getUserWithTokens = exports.teamMemberModelMapper = exports.eventModelMapper = exports.userModelMapper = exports.parseBlobUrl = exports.normalizeImage = exports.isDateValid = void 0;
const path_1 = __importDefault(require("path"));
const sharp_1 = __importDefault(require("sharp"));
const constants_1 = require("./constants");
const services_1 = require("./services");
const api_error_1 = require("./exceptions/api-error");
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
const parseBlobUrl = (url) => {
    const parsedUrl = new URL(url);
    const baseUrl = `${parsedUrl.protocol}//${parsedUrl.hostname}`;
    // Get the path without leading slash and decode special characters
    const fullPath = decodeURIComponent(parsedUrl.pathname.substring(1));
    // Split the full path into container name and blob name
    const lastSlashIndex = fullPath.lastIndexOf('/');
    const containerName = fullPath.substring(0, lastSlashIndex);
    const blobName = fullPath.substring(lastSlashIndex + 1);
    return {
        baseUrl,
        containerName,
        blobName,
    };
};
exports.parseBlobUrl = parseBlobUrl;
const userModelMapper = ({ _id, email, role, createdAt, updatedAt, }) => ({
    id: _id.toString(),
    email,
    role,
    createdAt,
    updatedAt,
});
exports.userModelMapper = userModelMapper;
const eventModelMapper = (event) => {
    const { _id } = event, rest = __rest(event, ["_id"]);
    return Object.assign({ id: _id.toString() }, rest);
};
exports.eventModelMapper = eventModelMapper;
const teamMemberModelMapper = (teamMember) => {
    const { _id } = teamMember, rest = __rest(teamMember, ["_id"]);
    return Object.assign({ id: _id.toString() }, rest);
};
exports.teamMemberModelMapper = teamMemberModelMapper;
const getUserWithTokens = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const user = (0, exports.userModelMapper)(userData);
    const tokens = services_1.tokensService.generateTokens(user);
    yield services_1.tokensService.saveToken({
        userId: user.id,
        refreshToken: tokens.refreshToken,
    });
    return Object.assign(Object.assign({}, tokens), { user });
});
exports.getUserWithTokens = getUserWithTokens;
const authorizeUser = (req) => {
    var _a;
    const accessToken = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (!accessToken) {
        throw api_error_1.ApiError.UnauthorizedError();
    }
    const secret = process.env.JWT_ACCESS_SECRET;
    if (!secret) {
        throw api_error_1.ApiError.ServerError('Internal Server Error');
    }
    const userData = services_1.tokensService.validateToken(accessToken, secret);
    if (!userData) {
        throw api_error_1.ApiError.UnauthorizedError();
    }
    return userData;
};
exports.authorizeUser = authorizeUser;
//# sourceMappingURL=utils.js.map