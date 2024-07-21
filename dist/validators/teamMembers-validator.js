"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validators = void 0;
const express_validator_1 = require("express-validator");
exports.validators = {
    'GET /api/team-members/': [
        (0, express_validator_1.query)('limit')
            .optional()
            .default(1000000000)
            .isNumeric()
            .withMessage('limit must be a number'),
        (0, express_validator_1.query)('sort')
            .optional()
            .default('asc')
            .isIn(['asc', 'desc'])
            .withMessage('sort must be asc or desc'),
    ],
    'GET /api/team-members/:id': [
        (0, express_validator_1.param)('id').isMongoId().withMessage('id must have mongoId format'),
    ],
    'POST /api/team-members/': [
        (0, express_validator_1.body)('name').trim().notEmpty().withMessage('name is required'),
        (0, express_validator_1.body)('position').trim().notEmpty().withMessage('position is required'),
        (0, express_validator_1.check)('upload').custom((value, { req }) => {
            if (!req.file) {
                throw new Error('file is required');
            }
            return true;
        }),
    ],
};
//# sourceMappingURL=teamMembers-validator.js.map