"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getValidationResult = void 0;
const express_validator_1 = require("express-validator");
const api_error_1 = require("../exceptions/api-error");
const getValidationResult = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (errors.isEmpty())
        next();
    else
        throw api_error_1.ApiError.BadRequest(400, 'Validation error', errors.array());
};
exports.getValidationResult = getValidationResult;
//# sourceMappingURL=validationResultMiddleware.js.map