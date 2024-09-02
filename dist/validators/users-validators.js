"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersValidators = void 0;
const _1 = require(".");
exports.usersValidators = {
    'GET /api/users/': [_1.limitRule, _1.sortRule],
    'POST /api/users/': [_1.bodyEmailRule, _1.bodyPasswordRule],
    'PUT /api/users/': [_1.bodyIdRule, _1.bodyRoleRule],
    'DELETE /api/users/:id': [_1.paramIdRule],
};
//# sourceMappingURL=users-validators.js.map