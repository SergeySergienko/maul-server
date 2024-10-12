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
exports.checkTeamMemberCreateMiddleware = void 0;
const api_error_1 = require("../exceptions/api-error");
const repositories_1 = require("../repositories");
const checkTeamMemberCreateMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.body;
        const candidate = yield repositories_1.teamMembersRepo.findTeamMember('userId', userId);
        if (candidate) {
            throw api_error_1.ApiError.BadRequest(409, `Team member with user ID ${userId} already exists`, [
                {
                    type: 'field',
                    value: userId,
                    msg: 'must be unique',
                    path: 'userId',
                    location: 'body',
                },
            ]);
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
exports.checkTeamMemberCreateMiddleware = checkTeamMemberCreateMiddleware;
//# sourceMappingURL=checkTeamMemberCreateMiddleware.js.map