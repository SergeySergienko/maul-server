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
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkUserUpdateMiddleware = void 0;
const api_error_1 = require("../exceptions/api-error");
const models_1 = require("../models");
const services_1 = require("../services");
const repositories_1 = require("../repositories");
const checkUserUpdateMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const accessToken = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        if (!accessToken) {
            throw api_error_1.ApiError.UnauthorizedError();
        }
        const role = req.body.role;
        const secret = process.env.JWT_ACCESS_SECRET;
        if (!secret) {
            throw api_error_1.ApiError.ServerError('Internal Server Error');
        }
        const userData = services_1.tokensService.validateToken(accessToken, secret);
        if (!userData) {
            throw api_error_1.ApiError.UnauthorizedError();
        }
        if (userData.id === req.body.id) {
            throw api_error_1.ApiError.ForbiddenError('User is not allowed to update their role');
        }
        const candidateToUpdate = yield repositories_1.usersRepo.findUser('id', req.body.id);
        if (!candidateToUpdate) {
            throw api_error_1.ApiError.BadRequest(400, 'User ID is incorrect');
        }
        const hasRole = models_1.RoleModel[userData.role] > models_1.RoleModel[role] &&
            models_1.RoleModel[userData.role] > models_1.RoleModel[candidateToUpdate.role];
        if (!hasRole) {
            throw api_error_1.ApiError.ForbiddenError('No permission to change role');
        }
        next();
    }
    catch (error) {
        return next(error);
    }
});
exports.checkUserUpdateMiddleware = checkUserUpdateMiddleware;
//# sourceMappingURL=checkUserUpdateMiddleware.js.map