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
exports.checkUserDeleteMiddleware = void 0;
const api_error_1 = require("../exceptions/api-error");
const models_1 = require("../models");
const services_1 = require("../services");
const repositories_1 = require("../repositories");
const checkUserDeleteMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { refreshToken } = req.cookies;
        const secret = process.env.JWT_REFRESH_SECRET;
        if (!secret) {
            throw api_error_1.ApiError.ServerError('Internal Server Error');
        }
        const userData = services_1.tokensService.validateToken(refreshToken, secret);
        if (!userData) {
            throw api_error_1.ApiError.UnauthorizedError();
        }
        const candidateToDelete = yield repositories_1.usersRepo.findUser('id', req.params.id);
        if (!candidateToDelete) {
            throw api_error_1.ApiError.BadRequest(400, 'User id is incorrect');
        }
        if (userData.id === candidateToDelete._id.toString()) {
            throw api_error_1.ApiError.ForbiddenError('User is not allowed to delete themselves');
        }
        const hasRole = models_1.RoleModel[userData.role] > models_1.RoleModel[candidateToDelete.role];
        if (!hasRole) {
            throw api_error_1.ApiError.ForbiddenError(`No permission to delete user with ${candidateToDelete.role} role`);
        }
        next();
    }
    catch (error) {
        return next(error);
    }
});
exports.checkUserDeleteMiddleware = checkUserDeleteMiddleware;
//# sourceMappingURL=checkUserDeleteMiddleware.js.map