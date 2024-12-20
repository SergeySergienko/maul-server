"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.teamMembersValidators = void 0;
const _1 = require(".");
exports.teamMembersValidators = {
    'GET /api/team-members/': [_1.limitRule, _1.sortRule],
    'GET /api/team-members/:id': [_1.paramIdRule],
    'GET /api/team-members/search': [_1.queryUserIdRule],
    'PATCH /api/team-members/:id': [_1.bodyIdRule, _1.bodyStatusRule],
    'POST /api/team-members/': [
        _1.bodyUserIdRule,
        _1.bodyNameRule,
        _1.bodyPositionRule,
        _1.uploadFileRule,
        _1.bodySloganRule,
    ],
    'PUT /api/team-members/': [_1.bodyIdRule],
    'DELETE /api/team-members/:id': [_1.paramIdRule],
};
//# sourceMappingURL=teamMembers-validators.js.map