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
exports.teamMembersController = void 0;
const services_1 = require("../services");
exports.teamMembersController = {
    findTeamMember(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const teamMember = yield services_1.teamMembersService.findTeamMember(req.params.id);
                return res.json(teamMember);
            }
            catch (error) {
                next(error);
            }
        });
    },
    findTeamMemberByUserId(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const teamMember = yield services_1.teamMembersService.findTeamMemberByUserId(req.query.userId);
                return res.json(teamMember);
            }
            catch (error) {
                next(error);
            }
        });
    },
    findTeamMembers(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const teamMembers = yield services_1.teamMembersService.findTeamMembers(req.query);
                return res.json(teamMembers);
            }
            catch (error) {
                next(error);
            }
        });
    },
    createTeamMember(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId, name, position, slogan } = req.body;
                const photo = req.file;
                const teamMember = yield services_1.teamMembersService.createTeamMember({
                    userId,
                    name,
                    position,
                    photo,
                    slogan,
                });
                return res.status(201).json(teamMember);
            }
            catch (error) {
                next(error);
            }
        });
    },
    changeStatus(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const teamMember = yield services_1.teamMembersService.changeStatus(req.body);
                return res.json(teamMember);
            }
            catch (error) {
                next(error);
            }
        });
    },
    updateTeamMember(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id, name, position, slogan } = req.body;
                const photo = req.file;
                const teamMember = yield services_1.teamMembersService.updateTeamMember({
                    id,
                    name,
                    position,
                    photo,
                    slogan,
                });
                return res.json(teamMember);
            }
            catch (error) {
                next(error);
            }
        });
    },
    deleteTeamMember(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = yield services_1.teamMembersService.deleteTeamMember(req.params.id);
                return res.json({ id, message: 'Team member was deleted successfully' });
            }
            catch (error) {
                next(error);
            }
        });
    },
};
//# sourceMappingURL=teamMembers-controller.js.map