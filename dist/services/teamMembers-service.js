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
const mongodb_1 = require("mongodb");
const repositories_1 = require("../repositories");
const _1 = require(".");
const api_error_1 = require("../exceptions/api-error");
exports.teamMembersService = {
    findTeamMember(id) {
        return __awaiter(this, void 0, void 0, function* () {
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
            return teamMember;
        });
    },
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
            const candidate = yield repositories_1.teamMembersRepo.findTeamMember('name', name);
            if (candidate) {
                throw api_error_1.ApiError.BadRequest(409, `Team member with name ${name} already exists`, [
                    {
                        type: 'field',
                        value: name,
                        msg: 'must be unique',
                        path: 'name',
                        location: 'body',
                    },
                ]);
            }
            const containerName = process.env.AZURE_STORAGE_MEMBERS_CONTAINER_NAME;
            if (!containerName) {
                throw api_error_1.ApiError.BadRequest(400, 'Storage container name is required');
            }
            const blobFile = yield _1.storageService.writeFileToAzureStorage(containerName, file.originalname, file.buffer);
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