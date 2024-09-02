"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadRule = exports.bodyPositionRule = exports.bodyNameRule = exports.bodyPasswordRule = exports.bodyEmailRule = exports.bodyRoleRule = exports.bodyIdRule = exports.paramIdRule = exports.sortRule = exports.limitRule = void 0;
const express_validator_1 = require("express-validator");
const constants_1 = require("../constants");
exports.limitRule = (0, express_validator_1.query)('limit')
    .optional()
    .default(1000000000)
    .isNumeric()
    .withMessage('limit must be a number');
exports.sortRule = (0, express_validator_1.query)('sort')
    .optional()
    .default('asc')
    .isIn(['asc', 'desc'])
    .withMessage('sort must be asc or desc');
exports.paramIdRule = (0, express_validator_1.param)('id')
    .isMongoId()
    .withMessage('id must have mongoId format');
exports.bodyIdRule = (0, express_validator_1.body)('id')
    .isMongoId()
    .withMessage('id must have mongoId format');
exports.bodyRoleRule = (0, express_validator_1.body)('role')
    .isIn(constants_1.ALLOWED_ROLES)
    .withMessage(`role must have one of the values: [${constants_1.ALLOWED_ROLES}]`);
exports.bodyEmailRule = (0, express_validator_1.body)('email', 'email must have email format').isEmail();
exports.bodyPasswordRule = (0, express_validator_1.body)('password', 'the password must contain from 4 to 10 characters')
    .trim()
    .isLength({ min: 4, max: 10 });
exports.bodyNameRule = (0, express_validator_1.body)('name')
    .trim()
    .notEmpty()
    .withMessage('name is required');
exports.bodyPositionRule = (0, express_validator_1.body)('position')
    .trim()
    .notEmpty()
    .withMessage('position is required');
exports.uploadRule = (0, express_validator_1.check)('upload').custom((value, { req }) => {
    if (!req.file) {
        throw new Error('file is required');
    }
    return true;
});
//# sourceMappingURL=rules.js.map