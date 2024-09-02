"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkUserUpdateMiddleware = void 0;
const api_error_1 = require("../exceptions/api-error");
const services_1 = require("../services");
const checkUserUpdateMiddleware = (req, res, next) => {
    try {
        const { refreshToken } = req.cookies;
        const secret = process.env.JWT_REFRESH_SECRET;
        if (!secret) {
            throw api_error_1.ApiError.ServerError('Internal Server Error');
        }
        const userData = services_1.tokensService.validateToken(refreshToken, secret);
        if (req.body.id === (userData === null || userData === void 0 ? void 0 : userData.id)) {
            throw api_error_1.ApiError.ForbiddenError('User is not allowed to update their roles');
        }
        next();
    }
    catch (error) {
        return next(error);
    }
};
exports.checkUserUpdateMiddleware = checkUserUpdateMiddleware;
//# sourceMappingURL=checkUserUpdateMiddleware.js.map