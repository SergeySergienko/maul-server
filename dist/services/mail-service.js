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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const api_error_1 = require("../exceptions/api-error");
const constants_1 = require("../constants");
class MailService {
    constructor() {
        this.transport = nodemailer_1.default.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });
    }
    sendActivationMail(to, identifier) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.transport.sendMail({
                    from: 'no-reply <maul-server>',
                    to,
                    subject: 'Account activation',
                    html: `Follow this <a href="${constants_1.CLIENT_ORIGIN}/email-confirmation/${identifier}">link</a> to verify your email address`,
                });
            }
            catch (error) {
                throw api_error_1.ApiError.ServerError('Internal Server Error');
            }
        });
    }
}
exports.default = new MailService();
//# sourceMappingURL=mail-service.js.map