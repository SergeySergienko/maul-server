"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.teamMembersValidators = void 0;
const _1 = require(".");
exports.teamMembersValidators = {
    'GET /api/team-members/': [_1.limitRule, _1.sortRule],
    'GET /api/team-members/:id': [_1.paramIdRule],
    'POST /api/team-members/': [_1.bodyNameRule, _1.bodyPositionRule, _1.uploadFileRule],
};
//# sourceMappingURL=teamMembers-validators.js.map