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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.teamMembersService = void 0;
const repositories_1 = require("../repositories");
const _1 = require(".");
const api_error_1 = require("../exceptions/api-error");
const utils_1 = require("../utils");
const mail_service_1 = __importDefault(require("./mail-service"));
const containerName = process.env
    .AZURE_STORAGE_MEMBERS_CONTAINER_NAME;
exports.teamMembersService = {
    findTeamMember(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const teamMember = yield repositories_1.teamMembersRepo.findTeamMember('id', id);
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
            return (0, utils_1.teamMemberModelMapper)(teamMember);
        });
    },
    findTeamMemberByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const teamMember = yield repositories_1.teamMembersRepo.findTeamMember('userId', userId);
            if (!teamMember)
                return;
            return (0, utils_1.teamMemberModelMapper)(teamMember);
        });
    },
    findTeamMembers(_a) {
        return __awaiter(this, arguments, void 0, function* ({ limit, sort, status }) {
            const teamMembers = yield repositories_1.teamMembersRepo.findTeamMembers({
                limit,
                sort,
                status,
            });
            if (!teamMembers) {
                throw api_error_1.ApiError.ServerError('Internal Server Error');
            }
            return teamMembers.map(utils_1.teamMemberModelMapper);
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
            const blobFile = yield _1.storageService.writeFileToAzureStorage(containerName, photo.originalname, photo.buffer);
            const newTeamMember = {
                userId,
                name,
                position,
                photo: blobFile.url,
                slogan,
                status: 'CANDIDATE',
                createdAt: new Date(),
            };
            const { insertedId } = yield repositories_1.teamMembersRepo.createTeamMember(newTeamMember);
            if (!insertedId)
                throw api_error_1.ApiError.ServerError('Internal Server Error');
            const admins = yield _1.usersService.findUsers({ role: 'ADMIN' });
            yield Promise.all(admins.map((admin) => mail_service_1.default.sendMail({
                to: admin.email,
                heading: 'membershipRequest',
                teamMemberId: insertedId.toString(),
            })));
            return (0, utils_1.teamMemberModelMapper)(Object.assign(Object.assign({}, newTeamMember), { _id: insertedId }));
        });
    },
    changeStatus(_a) {
        return __awaiter(this, arguments, void 0, function* ({ id, status }) {
            const changedTeamMember = yield repositories_1.teamMembersRepo.changeStatus({
                id,
                status,
            });
            if (!changedTeamMember) {
                throw api_error_1.ApiError.NotFound(`Team member with id: ${id} wasn't found`);
            }
            // todo: create usersService.findUser
            const { userId, name } = changedTeamMember;
            const user = yield repositories_1.usersRepo.findUser('id', userId);
            if (!user) {
                throw api_error_1.ApiError.NotFound(`User with id: ${userId} wasn't found`);
            }
            if (status === 'MEMBER') {
                yield mail_service_1.default.sendMail({
                    to: user.email,
                    heading: 'membershipApprove',
                    teamMemberName: name,
                });
            }
            else {
                yield mail_service_1.default.sendMail({
                    to: user.email,
                    heading: 'membershipSuspend',
                    teamMemberName: name,
                });
            }
            return (0, utils_1.teamMemberModelMapper)(changedTeamMember);
        });
    },
    updateTeamMember(_a) {
        return __awaiter(this, arguments, void 0, function* ({ id, name, position, photo, slogan, }) {
            const teamMemberToUpdate = {
                id,
                name,
                position,
                slogan,
            };
            if (photo) {
                const teamMember = yield this.findTeamMember(id);
                const res = yield _1.storageService.deleteFileFromAzureStorage(teamMember.photo);
                if (res.errorCode) {
                    throw api_error_1.ApiError.ServerError('Could not delete blob file');
                }
                const blobFile = yield _1.storageService.writeFileToAzureStorage(containerName, photo.originalname, photo.buffer);
                teamMemberToUpdate.photo = blobFile.url;
            }
            const updatedTeamMember = yield repositories_1.teamMembersRepo.updateTeamMember(teamMemberToUpdate);
            if (!updatedTeamMember) {
                throw api_error_1.ApiError.NotFound(`Team member with id: ${id} wasn't found`);
            }
            return (0, utils_1.teamMemberModelMapper)(updatedTeamMember);
        });
    },
    deleteTeamMember(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId, name, photo } = yield this.findTeamMember(id);
            const res = yield _1.storageService.deleteFileFromAzureStorage(photo);
            if (res.errorCode) {
                throw api_error_1.ApiError.ServerError('Could not delete blob file');
            }
            const { deletedCount } = yield repositories_1.teamMembersRepo.deleteTeamMember(id);
            if (deletedCount !== 1) {
                throw api_error_1.ApiError.NotFound(`Team member with id: ${id} wasn't found`);
            }
            const user = yield repositories_1.usersRepo.findUser('id', userId);
            if (!user) {
                throw api_error_1.ApiError.NotFound(`User with id: ${userId} wasn't found`);
            }
            yield mail_service_1.default.sendMail({
                to: user.email,
                heading: 'membershipTerminate',
                teamMemberName: name,
            });
            return id;
        });
    },
};
//# sourceMappingURL=teamMembers-service.js.map