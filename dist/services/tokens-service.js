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
exports.tokensService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const api_error_1 = require("../exceptions/api-error");
const repositories_1 = require("../repositories");
const constants_1 = require("./constants");
exports.tokensService = {
    generateTokens(payload) {
        if (!process.env.JWT_ACCESS_SECRET || !process.env.JWT_REFRESH_SECRET)
            throw api_error_1.ApiError.ServerError('Internal Server Error');
        const accessToken = jsonwebtoken_1.default.sign(payload, process.env.JWT_ACCESS_SECRET, {
            expiresIn: constants_1.accessTokenExpiryTime,
        });
        const refreshToken = jsonwebtoken_1.default.sign(payload, process.env.JWT_REFRESH_SECRET, {
            expiresIn: constants_1.refreshTokenExpiryTime,
        });
        return { accessToken, refreshToken };
    },
    validateToken(token, secret) {
        try {
            const userData = jsonwebtoken_1.default.verify(token, secret);
            return userData;
        }
        catch (error) {
            return null;
        }
    },
    saveToken(_a) {
        return __awaiter(this, arguments, void 0, function* ({ userId, refreshToken }) {
            const tokenData = yield repositories_1.tokensRepo.findToken('userId', userId);
            if (tokenData) {
                const result = yield repositories_1.tokensRepo.updateToken({
                    userId,
                    refreshToken,
                });
                if (!result) {
                    throw api_error_1.ApiError.ServerError('Updating token Error');
                }
                return result;
            }
            const result = yield repositories_1.tokensRepo.createToken({
                userId,
                refreshToken,
            });
            if (!result) {
                throw api_error_1.ApiError.ServerError('Saving token Error');
            }
            return result;
        });
    },
    deleteToken(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const { deletedCount } = yield repositories_1.tokensRepo.deleteToken(refreshToken);
            if (deletedCount !== 1) {
                throw api_error_1.ApiError.NotFound('Logout Error');
            }
        });
    },
};
//# sourceMappingURL=tokens-service.js.map