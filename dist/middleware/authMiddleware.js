"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const api_error_1 = require("../exceptions/api-error");
const models_1 = require("../models");
const utils_1 = require("../utils");
const authMiddleware = (role) => (req, res, next) => {
    if (req.method === 'OPTIONS') {
        next();
    }
    try {
        const userData = (0, utils_1.authorizeUser)(req);
        const hasRole = models_1.RoleModel[userData.role] >= models_1.RoleModel[role];
        if (!hasRole) {
            throw api_error_1.ApiError.ForbiddenError('No access to resource');
        }
        next();
    }
    catch (error) {
        return next(error);
    }
};
exports.authMiddleware = authMiddleware;
//# sourceMappingURL=authMiddleware.js.map