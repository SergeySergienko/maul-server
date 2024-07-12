"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiError = void 0;
class ApiError extends Error {
    constructor(status, message, errors = []) {
        super(message);
        this.status = status;
        this.errors = errors;
    }
    static UnauthorizedError() {
        return new ApiError(401, 'User is not authorized');
    }
    static ForbiddenError(message) {
        return new ApiError(403, message);
    }
    static BadRequest(status, message, errors = []) {
        return new ApiError(status, message, errors);
    }
    static NotFound(message, errors = []) {
        return new ApiError(404, message, errors);
    }
    static ServerError(message, errors = []) {
        return new ApiError(500, message, errors);
    }
}
exports.ApiError = ApiError;
//# sourceMappingURL=api-error.js.map