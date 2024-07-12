"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const path_1 = __importDefault(require("path"));
const routes_1 = require("./routes");
const middleware_1 = require("./middleware");
exports.app = (0, express_1.default)();
exports.app
    .use(express_1.default.static(path_1.default.join(__dirname, 'public')))
    .use(express_1.default.json())
    .use((0, cookie_parser_1.default)())
    .use((0, cors_1.default)({
    credentials: true,
    // origin: process.env.CLIENT_URL,
}));
exports.app.use('/api/team-members', (0, routes_1.getTeamMembersRouter)());
exports.app.use(middleware_1.errorMiddleware);
//# sourceMappingURL=app.js.map