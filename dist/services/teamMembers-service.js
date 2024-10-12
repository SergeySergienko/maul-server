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
const utils_1 = require("../utils");
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
        return __awaiter(this, arguments, void 0, function* ({ userId, name, position, photo, slogan, }) {
            // const { normalizedFileName, resizedImageBuffer } = await normalizeImage(
            //   file
            // );
            // if (!normalizedFileName) {
            //   throw ApiError.BadRequest(409, 'File extension is not allowed');
            // }
            const containerName = process.env
                .AZURE_STORAGE_MEMBERS_CONTAINER_NAME;
            const blobFile = yield _1.storageService.writeFileToAzureStorage(containerName, photo.originalname, photo.buffer);
            const newTeamMember = {
                userId,
                name,
                position,
                photo: blobFile.url,
                slogan,
                isActivated: false,
                createdAt: new Date(),
            };
            const { insertedId } = yield repositories_1.teamMembersRepo.createTeamMember(newTeamMember);
            if (!insertedId)
                throw api_error_1.ApiError.ServerError('Internal Server Error');
            return (0, utils_1.teamMemberModelMapper)(Object.assign(Object.assign({}, newTeamMember), { _id: insertedId }));
        });
    },
};
//# sourceMappingURL=teamMembers-service.js.map