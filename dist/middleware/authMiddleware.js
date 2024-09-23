"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const api_error_1 = require("../exceptions/api-error");
const models_1 = require("../models");
const services_1 = require("../services");
const authMiddleware = (role) => (req, res, next) => {
    var _a;
    if (req.method === 'OPTIONS') {
        next();
    }
    try {
        const accessToken = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        if (!accessToken) {
            throw api_error_1.ApiError.UnauthorizedError();
        }
        const secret = process.env.JWT_ACCESS_SECRET;
        if (!secret) {
            throw api_error_1.ApiError.ServerError('Internal Server Error');
        }
        const userData = services_1.tokensService.validateToken(accessToken, secret);
        if (!userData) {
            throw api_error_1.ApiError.UnauthorizedError();
        }
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