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
const repositories_1 = require("../repositories");
const utils_1 = require("../utils");
const services_1 = require("../services");
const checkUserDeleteMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userData = (0, utils_1.authorizeUser)(req);
        const candidateToDelete = yield repositories_1.usersRepo.findUser('id', req.params.id);
        if (!candidateToDelete) {
            throw api_error_1.ApiError.BadRequest(400, 'User ID is incorrect');
        }
        const teamMemberData = yield services_1.teamMembersService.findTeamMemberByUserId(req.params.id);
        if (teamMemberData) {
            throw api_error_1.ApiError.ForbiddenError(`Can not delete user with ${teamMemberData.status} status`);
        }
        if (userData.id === candidateToDelete._id.toString()) {
            throw api_error_1.ApiError.ForbiddenError('Not allowed to delete themselves');
        }
        const hasPermission = models_1.RoleModel[userData.role] > models_1.RoleModel[candidateToDelete.role];
        if (!hasPermission) {
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