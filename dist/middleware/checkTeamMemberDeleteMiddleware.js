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
exports.checkTeamMemberDeleteMiddleware = void 0;
const api_error_1 = require("../exceptions/api-error");
const services_1 = require("../services");
const utils_1 = require("../utils");
const checkTeamMemberDeleteMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userData = (0, utils_1.authorizeUser)(req);
        const teamMember = yield services_1.teamMembersService.findTeamMember(req.params.id);
        if (userData.id !== teamMember.userId) {
            throw api_error_1.ApiError.ForbiddenError('No permission to delete another team member');
        }
        const containerName = process.env.AZURE_STORAGE_MEMBERS_CONTAINER_NAME;
        if (!containerName) {
            throw api_error_1.ApiError.BadRequest(400, 'Storage container name is required');
        }
        next();
    }
    catch (error) {
        return next(error);
    }
});
exports.checkTeamMemberDeleteMiddleware = checkTeamMemberDeleteMiddleware;
//# sourceMappingURL=checkTeamMemberDeleteMiddleware.js.map