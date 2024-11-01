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
exports.checkTeamMemberStatusMiddleware = void 0;
const api_error_1 = require("../exceptions/api-error");
const repositories_1 = require("../repositories");
const checkTeamMemberStatusMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, status } = req.body;
        const teamMember = yield repositories_1.teamMembersRepo.findTeamMember('id', id);
        if (!teamMember) {
            throw api_error_1.ApiError.NotFound(`Team member with id: ${id} wasn't found`, [
                {
                    type: 'field',
                    value: id,
                    msg: 'not found',
                    path: 'id',
                    location: 'body',
                },
            ]);
        }
        if (teamMember.status === status) {
            throw api_error_1.ApiError.BadRequest(409, `Team member with user id ${id} status is already set to ${status}`, [
                {
                    type: 'field',
                    value: status,
                    msg: 'already set',
                    path: 'status',
                    location: 'body',
                },
            ]);
        }
        next();
    }
    catch (error) {
        return next(error);
    }
});
exports.checkTeamMemberStatusMiddleware = checkTeamMemberStatusMiddleware;
//# sourceMappingURL=checkTeamMemberStatusMiddleware.js.map