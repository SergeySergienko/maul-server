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
exports.teamMembersService = void 0;
const repositories_1 = require("../repositories");
const _1 = require(".");
const api_error_1 = require("../exceptions/api-error");
exports.teamMembersService = {
    findTeamMembers(_a) {
        return __awaiter(this, arguments, void 0, function* ({ limit, sort }) {
            const teamMembers = yield repositories_1.teamMembersRepo.findTeamMembers({
                limit,
                sort,
            });
            if (!teamMembers) {
                throw api_error_1.ApiError.ServerError('Internal Server Error');
            }
            return teamMembers;
        });
    },
    createTeamMember(_a) {
        return __awaiter(this, arguments, void 0, function* ({ name, position, file, }) {
            if (!file) {
                throw api_error_1.ApiError.BadRequest(409, 'Photo is required', [
                    {
                        type: 'field',
                        value: file || 'undefined',
                        msg: 'photo is required',
                        path: 'photo',
                        location: 'body',
                    },
                ]);
            }
            const candidate = yield repositories_1.teamMembersRepo.findTeamMember('name', name);
            if (candidate) {
                throw api_error_1.ApiError.BadRequest(409, `Team member with name ${name} already exists`, [
                    {
                        type: 'field',
                        value: name,
                        msg: 'team member name must be unique',
                        path: 'name',
                        location: 'body',
                    },
                ]);
            }
            const blobFile = yield _1.storageService.writeFileToAzureStorage(file.originalname, file.buffer);
            const newTeamMember = {
                name,
                position,
                photo: blobFile.url,
            };
            const result = yield repositories_1.teamMembersRepo.createTeamMember(newTeamMember);
            if (!result.insertedId)
                throw api_error_1.ApiError.ServerError('Internal Server Error');
            return Object.assign(Object.assign({}, newTeamMember), { _id: result.insertedId });
        });
    },
};
//# sourceMappingURL=teamMembers-service.js.map