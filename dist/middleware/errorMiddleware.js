"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = void 0;
const api_error_1 = require("../exceptions/api-error");
const errorMiddleware = (err, req, res, next) => {
    console.log('errorMiddleware:', err);
    if (err instanceof api_error_1.ApiError) {
        return res
            .status(err.status)
            .json({ message: err.message, errors: err.errors });
    }
    if (err instanceof Error) {
        return res.status(500).json({ message: err.message });
    }
    return res.status(500).json({ message: 'Unexpected error' });
};
exports.errorMiddleware = errorMiddleware;
//# sourceMappingURL=errorMiddleware.js.map