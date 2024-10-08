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
exports.authController = void 0;
const services_1 = require("../services");
exports.authController = {
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const userData = yield services_1.authService.login({ email, password });
                return res.json(userData);
            }
            catch (error) {
                next(error);
            }
        });
    },
    logout(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const refreshToken = req.headers['x-refresh-token'];
                yield services_1.authService.logout(refreshToken);
                return res.json({ message: 'User successfully logged out' });
            }
            catch (error) {
                next(error);
            }
        });
    },
    activate(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userData = yield services_1.authService.activateUser(req.params.activationToken);
                return res.json(userData);
            }
            catch (error) {
                next(error);
            }
        });
    },
    refresh(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const refreshToken = req.headers['x-refresh-token'];
                const userData = yield services_1.authService.refresh(refreshToken);
                return res.json(userData);
            }
            catch (error) {
                next(error);
            }
        });
    },
};
//# sourceMappingURL=auth-controller.js.map