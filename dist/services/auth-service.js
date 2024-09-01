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
exports.authService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const api_error_1 = require("../exceptions/api-error");
const repositories_1 = require("../repositories");
const utils_1 = require("../utils");
const _1 = require(".");
exports.authService = {
    login(_a) {
        return __awaiter(this, arguments, void 0, function* ({ email, password }) {
            const currentUser = yield repositories_1.usersRepo.findUser('email', email);
            if (!currentUser) {
                throw api_error_1.ApiError.NotFound('Incorrect login or password');
            }
            const isPasswordValid = yield bcrypt_1.default.compare(password, currentUser.password);
            if (!isPasswordValid) {
                throw api_error_1.ApiError.NotFound('Incorrect login or password');
            }
            if (currentUser.activationToken) {
                throw api_error_1.ApiError.ForbiddenError('Account has not yet been activated');
            }
            return (0, utils_1.getUserWithTokens)(currentUser);
        });
    },
    logout(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            yield _1.tokensService.deleteToken(refreshToken);
        });
    },
    activateUser(activationToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentUser = yield repositories_1.usersRepo.findUser('activationToken', activationToken);
            if (!currentUser) {
                throw api_error_1.ApiError.BadRequest(400, 'Activation token is incorrect');
            }
            const user = yield repositories_1.usersRepo.updateUser({
                id: currentUser._id.toString(),
                activationToken: '',
            });
            if (!user) {
                throw api_error_1.ApiError.ServerError('User was not activated');
            }
            return (0, utils_1.getUserWithTokens)(user);
        });
    },
    refresh(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!refreshToken) {
                throw api_error_1.ApiError.UnauthorizedError();
            }
            const secret = process.env.JWT_REFRESH_SECRET;
            if (!secret) {
                throw api_error_1.ApiError.ServerError('Internal Server Error');
            }
            const userData = _1.tokensService.validateToken(refreshToken, secret);
            const tokenFromDb = yield repositories_1.tokensRepo.findToken('refreshToken', refreshToken);
            if (!userData || !tokenFromDb) {
                throw api_error_1.ApiError.UnauthorizedError();
            }
            const currentUser = yield repositories_1.usersRepo.findUser('email', userData.email);
            if (!currentUser) {
                throw api_error_1.ApiError.UnauthorizedError();
            }
            return (0, utils_1.getUserWithTokens)(currentUser);
        });
    },
};
//# sourceMappingURL=auth-service.js.map