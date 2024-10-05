"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkUserCreateMiddleware = void 0;
const api_error_1 = require("../exceptions/api-error");
const repositories_1 = require("../repositories");
const checkUserCreateMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        const candidate = yield repositories_1.usersRepo.findUser('email', email);
        if (candidate) {
            throw api_error_1.ApiError.BadRequest(409, `User with email ${email} already exists`, [
                {
                    type: 'field',
                    value: email,
                    msg: 'email address must be unique',
                    path: 'email',
                    location: 'body',
                },
            ]);
        }
        next();
    }
    catch (error) {
        return next(error);
    }
});
exports.checkUserCreateMiddleware = checkUserCreateMiddleware;
//# sourceMappingURL=checkUserCreateMiddleware%20copy.js.map