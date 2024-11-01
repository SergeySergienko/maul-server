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
const repositories_1 = require("../repositories");
const utils_1 = require("../utils");
const checkUserUpdateMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userData = (0, utils_1.authorizeUser)(req);
        if (userData.id === req.body.id) {
            throw api_error_1.ApiError.ForbiddenError('User is not allowed to update their role');
        }
        const candidateToUpdate = yield repositories_1.usersRepo.findUser('id', req.body.id);
        if (!candidateToUpdate) {
            throw api_error_1.ApiError.BadRequest(400, 'User ID is incorrect');
        }
        const role = req.body.role;
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