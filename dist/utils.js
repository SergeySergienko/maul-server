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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMailContent = exports.authorizeUser = exports.getUserWithTokens = exports.teamMemberModelMapper = exports.eventModelMapper = exports.userModelMapper = exports.parseBlobUrl = exports.normalizeImage = exports.isDateValid = void 0;
const path_1 = __importDefault(require("path"));
const sharp_1 = __importDefault(require("sharp"));
const constants_1 = require("./constants");
const services_1 = require("./services");
const api_error_1 = require("./exceptions/api-error");
const isDateValid = (date) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    return regex.test(date);
};
exports.isDateValid = isDateValid;
const normalizeImage = (file) => __awaiter(void 0, void 0, void 0, function* () {
    const { name: originalFileName, ext: originalFileExtension } = path_1.default.parse(file.originalname);
    const isExtensionAllowed = constants_1.ALLOWED_EXTENSIONS.includes(originalFileExtension.toLowerCase());
    const normalizedFileName = isExtensionAllowed
        ? `${originalFileName}.webp`
        : null;
    const resizedImageBuffer = yield (0, sharp_1.default)(file.buffer)
        .resize(constants_1.IMAGE_WIDTH, constants_1.IMAGE_HEIGHT)
        .webp({ quality: 50, nearLossless: true })
        .toBuffer();
    return {
        normalizedFileName,
        resizedImageBuffer,
    };
});
exports.normalizeImage = normalizeImage;
const parseBlobUrl = (url) => {
    const parsedUrl = new URL(url);
    const baseUrl = `${parsedUrl.protocol}//${parsedUrl.hostname}`;
    // Get the path without leading slash and decode special characters
    const fullPath = decodeURIComponent(parsedUrl.pathname.substring(1));
    // Split the full path into container name and blob name
    const lastSlashIndex = fullPath.lastIndexOf('/');
    const containerName = fullPath.substring(0, lastSlashIndex);
    const blobName = fullPath.substring(lastSlashIndex + 1);
    return {
        baseUrl,
        containerName,
        blobName,
    };
};
exports.parseBlobUrl = parseBlobUrl;
const userModelMapper = ({ _id, email, role, createdAt, updatedAt, }) => ({
    id: _id.toString(),
    email,
    role,
    createdAt,
    updatedAt,
});
exports.userModelMapper = userModelMapper;
const eventModelMapper = (event) => {
    const { _id } = event, rest = __rest(event, ["_id"]);
    return Object.assign({ id: _id.toString() }, rest);
};
exports.eventModelMapper = eventModelMapper;
const teamMemberModelMapper = (teamMember) => {
    const { _id } = teamMember, rest = __rest(teamMember, ["_id"]);
    return Object.assign({ id: _id.toString() }, rest);
};
exports.teamMemberModelMapper = teamMemberModelMapper;
const getUserWithTokens = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const user = (0, exports.userModelMapper)(userData);
    const tokens = services_1.tokensService.generateTokens(user);
    yield services_1.tokensService.saveToken({
        userId: user.id,
        refreshToken: tokens.refreshToken,
    });
    return Object.assign(Object.assign({}, tokens), { user });
});
exports.getUserWithTokens = getUserWithTokens;
const authorizeUser = (req) => {
    var _a;
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
    return userData;
};
exports.authorizeUser = authorizeUser;
const getMailContent = ({ heading, identifier, role, teamMemberId, teamMemberName, }) => {
    switch (heading) {
        case 'accountActivate':
            return {
                subject: 'Account activation / Accountaktivierung',
                html: `
          <h3>Dear User!</h3>
          <p>Please, follow this <a href="${constants_1.CLIENT_ORIGIN}/email-confirmation/${identifier}">link</a> to verify your email address</p>
          <br/>
          <h3>Sehr geehrter Benutzer!</h3>
          <p>Bitte folgen Sie diesem <a href="${constants_1.CLIENT_ORIGIN}/email-confirmation/${identifier}">Link</a>, um Ihre E-Mail-Adresse zu bestätigen</p>
          `,
            };
        case 'roleChange':
            return {
                subject: 'Role changed / Rolle geändert',
                html: `
          <h3>Dear User!</h3>
          <p>We inform you that your role has been changed to ${role}</p>
          <p><b>All the best</b></p>
          <br/>
          <h3>Sehr geehrter Benutzer!</h3>
          <p>Wir informieren Sie, dass Ihre Rolle in ${role} geändert wurde</p>
          <p><b>Alles Gute</b></p>
          `,
            };
        case 'membershipApprove':
            return {
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
            };
        case 'membershipRequest':
            return {
                subject: 'Team membership request / Teammitgliedschaftsanfrage',
                html: `
          <h3>Dear Website Administrator!</h3>
          <p>Activation request received from the candidate with team member ID: ${teamMemberId}</p>
          <br/>
          <h3>Sehr geehrter Website-Administrator!</h3>
          <p>Aktivierungsanfrage vom Kandidaten mit der Teammitglieds-ID erhalten: ${teamMemberId}</p>
          `,
            };
        case 'membershipSuspend':
            return {
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
            };
        case 'membershipTerminate':
            return {
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
            };
        default:
            return { subject: '', html: '' };
    }
};
exports.getMailContent = getMailContent;
//# sourceMappingURL=utils.js.map