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
exports.usersService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const uuid_1 = require("uuid");
const api_error_1 = require("../exceptions/api-error");
const repositories_1 = require("../repositories");
const utils_1 = require("../utils");
const constants_1 = require("../constants");
exports.usersService = {
    findUsers(_a) {
        return __awaiter(this, arguments, void 0, function* ({ limit, sort }) {
            const users = yield repositories_1.usersRepo.findUsers({ limit, sort });
            if (!users) {
                throw api_error_1.ApiError.ServerError('Internal Server Error');
            }
            return users.map(utils_1.userModelMapper);
        });
    },
    createUser(_a) {
        return __awaiter(this, arguments, void 0, function* ({ email, password: userPassword }) {
            const candidate = yield repositories_1.usersRepo.findUser('email', email);
            if (candidate) {
                throw api_error_1.ApiError.BadRequest(409, `User with email ${email} already exists`, [
                    {
                        type: 'field',
                        value: email,
                        msg: 'email address must be unique',
                        path: 'email',
                        location: 'body',
                    },
                ]);
            }
            const hashPassword = yield bcrypt_1.default.hash(userPassword, 7); // todo: move to auth-service
            const identifier = (0, uuid_1.v4)();
            const newUser = {
                email,
                password: hashPassword,
                role: constants_1.ALLOWED_ROLES[0],
                activationToken: identifier,
                createdAt: new Date(),
            };
            const { insertedId } = yield repositories_1.usersRepo.createUser(newUser);
            if (!insertedId)
                throw api_error_1.ApiError.ServerError('User was not inserted');
            // await mailService.sendActivationMail(email, identifier);
            return (0, utils_1.userModelMapper)(Object.assign(Object.assign({}, newUser), { _id: insertedId }));
        });
    },
    updateUser(userDataToUpdate) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedUser = yield repositories_1.usersRepo.updateUser(userDataToUpdate);
            if (!updatedUser) {
                throw api_error_1.ApiError.NotFound(`User with id: ${userDataToUpdate.id} wasn't found`);
            }
            return (0, utils_1.userModelMapper)(updatedUser);
        });
    },
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const { deletedCount } = yield repositories_1.usersRepo.deleteUser(id);
            if (deletedCount !== 1) {
                throw api_error_1.ApiError.NotFound(`User with id: ${id} wasn't found`);
            }
            return id;
        });
    },
};
//# sourceMappingURL=users-service.js.map