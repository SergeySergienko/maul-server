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
exports.checkTeamMemberActivateMiddleware = void 0;
const mongodb_1 = require("mongodb");
const api_error_1 = require("../exceptions/api-error");
const repositories_1 = require("../repositories");
const checkTeamMemberActivateMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const teamMember = yield repositories_1.teamMembersRepo.findTeamMember('_id', new mongodb_1.ObjectId(id));
        if (!teamMember) {
            throw api_error_1.ApiError.NotFound(`Team member with id: ${id} wasn't found`, [
                {
                    type: 'field',
                    value: id,
                    msg: 'not found',
                    path: 'id',
                    location: 'params',
                },
            ]);
        }
        if (teamMember.isActivated) {
            throw api_error_1.ApiError.BadRequest(409, `Team member with user ID ${id} already activated`);
        }
        next();
    }
    catch (error) {
        return next(error);
    }
});
exports.checkTeamMemberActivateMiddleware = checkTeamMemberActivateMiddleware;
//# sourceMappingURL=checkTeamMemberActivateMiddleware.js.map