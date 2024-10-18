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
    sendAccountActivationMail(to, identifier) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.transport.sendMail({
                    from: 'no-reply/keine Antwort <maul-server>',
                    to,
                    subject: 'Account activation / Accountaktivierung',
                    html: `Follow this <a href="${constants_1.CLIENT_ORIGIN}/email-confirmation/${identifier}">link</a> to verify your email address /
         Folgen Sie diesem <a href="${constants_1.CLIENT_ORIGIN}/email-confirmation/${identifier}">Link</a>, um Ihre E-Mail-Adresse zu bestätigen`,
                });
            }
            catch (error) {
                throw api_error_1.ApiError.ServerError('Mail Service Error');
            }
        });
    }
    sendTeamMembershipRequestMail(to, teamMemberId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.transport.sendMail({
                    from: 'no-reply/keine Antwort <maul-server>',
                    to,
                    subject: 'Team membership request / Teammitgliedschaftsanfrage',
                    html: `Activation request received from the candidate with team member id: ${teamMemberId} /
         Aktivierungsanfrage vom Kandidaten mit der Teammitglieds-ID erhalten: ${teamMemberId}`,
                });
            }
            catch (error) {
                throw api_error_1.ApiError.ServerError('Mail Service Error');
            }
        });
    }
    sendTeamMembershipApprovedMail(to, teamMemberName) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.transport.sendMail({
                    from: 'no-reply/keine Antwort <maul-server>',
                    to,
                    subject: 'Team membership approved / Teammitgliedschaft genehmigt',
                    html: `Hello, ${teamMemberName}!\n
We are pleased to inform you that your application has been approved!
Welcome to our team!
\n\n
Hallo, ${teamMemberName}!\n
Wir freuen uns, Ihnen mitteilen zu können, dass Ihre Bewerbung genehmigt wurde!
Willkommen in unserem Team!`,
                });
            }
            catch (error) {
                throw api_error_1.ApiError.ServerError('Mail Service Error');
            }
        });
    }
    sendTeamMembershipTerminatedMail(to, teamMemberName) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.transport.sendMail({
                    from: 'no-reply/keine Antwort <maul-server>',
                    to,
                    subject: 'Team membership terminated / Teammitgliedschaft beendet',
                    html: `Hello, ${teamMemberName}!
We inform you that your membership in the team has been terminated. All the best.

Hallo, ${teamMemberName}!
Wir informieren Sie, dass Ihre Mitgliedschaft im Team beendet wurde. Alles Gute.`,
                });
            }
            catch (error) {
                throw api_error_1.ApiError.ServerError('Mail Service Error');
            }
        });
    }
}
exports.default = new MailService();
//# sourceMappingURL=mail-service.js.map