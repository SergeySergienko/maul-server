"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.teamPlaceRule = exports.uploadFilesRule = exports.bodyLocationRule = exports.bodyDescriptionRule = exports.bodyTitleRule = exports.bodyDateRule = exports.uploadFileRule = exports.bodyPositionRule = exports.bodyNameRule = exports.bodyPasswordRule = exports.bodyEmailRule = exports.bodyRoleRule = exports.bodyIdRule = exports.paramIdRule = exports.sortRule = exports.limitRule = void 0;
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
// team-member rules
exports.bodyNameRule = (0, express_validator_1.body)('name')
    .trim()
    .notEmpty()
    .withMessage('name is required');
exports.bodyPositionRule = (0, express_validator_1.body)('position')
    .trim()
    .notEmpty()
    .withMessage('position is required');
exports.uploadFileRule = (0, express_validator_1.check)('upload').custom((value, { req }) => {
    if (!req.file) {
        throw new Error('file is required');
    }
    return true;
});
// event rules
exports.bodyDateRule = (0, express_validator_1.body)('date')
    .trim()
    .isDate()
    .withMessage('date must be in yyyy-mm-dd format');
exports.bodyTitleRule = (0, express_validator_1.body)('title')
    .trim()
    .isLength({ min: 3 })
    .withMessage('the title must contain min 3 characters');
exports.bodyDescriptionRule = (0, express_validator_1.body)('description')
    .trim()
    .isLength({ min: 20 })
    .withMessage('the description must contain min 20 characters');
exports.bodyLocationRule = (0, express_validator_1.body)('location')
    .trim()
    .isLength({ min: 3 })
    .withMessage('the location must contain min 3 characters');
exports.uploadFilesRule = (0, express_validator_1.check)('upload').custom((value, { req }) => {
    var _a;
    if (!((_a = req.files) === null || _a === void 0 ? void 0 : _a.length)) {
        throw new Error('files to upload are required');
    }
    return true;
});
exports.teamPlaceRule = (0, express_validator_1.body)('teamPlace').optional();
// .isNumeric()
// .isByteLength({ gt: 0 })
// .withMessage('the teamPlace must be a number more then 0');
//# sourceMappingURL=rules.js.map