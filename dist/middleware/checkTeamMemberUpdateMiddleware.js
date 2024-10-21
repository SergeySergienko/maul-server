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
exports.checkTeamMemberUpdateMiddleware = void 0;
const api_error_1 = require("../exceptions/api-error");
const services_1 = require("../services");
const checkTeamMemberUpdateMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
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
        const teamMember = yield services_1.teamMembersService.findTeamMember(req.body.id);
        if (userData.id !== teamMember.userId) {
            throw api_error_1.ApiError.ForbiddenError('No permission to update another team member');
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
exports.checkTeamMemberUpdateMiddleware = checkTeamMemberUpdateMiddleware;
//# sourceMappingURL=checkTeamMemberUpdateMiddleware.js.map