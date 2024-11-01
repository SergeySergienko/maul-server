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
        this.from = 'no-reply <meiga>';
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
                    from: this.from,
                    to,
                    subject: 'Account activation / Accountaktivierung',
                    html: `
<h3>Dear User!</h3>
<p>Please, follow this <a href="${constants_1.CLIENT_ORIGIN}/email-confirmation/${identifier}">link</a> to verify your email address</p>
<br/>
<h3>Sehr geehrter Benutzer!</h3>
<p>Bitte folgen Sie diesem <a href="${constants_1.CLIENT_ORIGIN}/email-confirmation/${identifier}">Link</a>, um Ihre E-Mail-Adresse zu bestätigen</p>
`,
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
                    from: this.from,
                    to,
                    subject: 'Team membership request / Teammitgliedschaftsanfrage',
                    html: `
<h3>Dear Website Administrator!</h3>
<p>Activation request received from the candidate with team member ID: ${teamMemberId}</p>
<br/>
<h3>Sehr geehrter Website-Administrator!</h3>
<p>Aktivierungsanfrage vom Kandidaten mit der Teammitglieds-ID erhalten: ${teamMemberId}</p>
`,
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
                    from: this.from,
                    to,
                    subject: 'Team membership approved / Teammitgliedschaft genehmigt',
                    html: `
<h3>Hello, ${teamMemberName}!</h3>
<p>We are pleased to inform you that your application has been approved!</p>
<p>Welcome to our team!</p>
<b>Best regards</b>
<br/>
<h3>Hallo, ${teamMemberName}!</h3>
<p>Wir freuen uns, Ihnen mitteilen zu können, dass Ihre Bewerbung genehmigt wurde!</p>
<p>Willkommen in unserem Team!</p>
<b>Mit freundlichen Grüßen</b>
`,
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
                    from: this.from,
                    to,
                    subject: 'Team membership terminated / Teammitgliedschaft beendet',
                    html: `
<h3>Hello, ${teamMemberName}!</h3>
<p>We inform you that your membership in the team has been terminated.</p>
<p>All the best</p>
<br/>
<h3>Hallo, ${teamMemberName}!</h3>
<p>Wir informieren Sie, dass Ihre Mitgliedschaft im Team beendet wurde.</p>
<p>Alles Gute</p>
`,
                });
            }
            catch (error) {
                throw api_error_1.ApiError.ServerError('Mail Service Error');
            }
        });
    }
    sendTeamMembershipSuspendedMail(to, teamMemberName) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.transport.sendMail({
                    from: this.from,
                    to,
                    subject: 'Team membership suspended / Teammitgliedschaft ausgesetzt',
                    html: `
<h3>Hello, ${teamMemberName}!</h3>
<p>We inform you that your membership in the team has been suspended.</p>
<p>All the best</p>
<br/>
<h3>Hallo, ${teamMemberName}!</h3>
<p>Wir informieren Sie, dass Ihre Mitgliedschaft im Team ausgesetzt wurde.</p>
<p>Alles Gute</p>
`,
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