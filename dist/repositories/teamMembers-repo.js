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
exports.teamMembersRepo = void 0;
const _1 = require(".");
exports.teamMembersRepo = {
    findTeamMember(field, value) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield _1.teamMemberCollection.findOne({ [field]: value });
        });
    },
    findTeamMembers(_a) {
        return __awaiter(this, arguments, void 0, function* ({ limit, sort }) {
            const options = {};
            if (limit) {
                options.limit = +limit;
            }
            options.sort = { name: sort || 'asc' };
            return yield _1.teamMemberCollection.find({}, options).toArray();
        });
    },
    createTeamMember(teamMember) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield _1.teamMemberCollection.insertOne(teamMember);
        });
    },
};
//# sourceMappingURL=teamMembers-repo.js.map