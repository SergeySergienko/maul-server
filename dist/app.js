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
const constants_1 = require("./constants");
exports.app = (0, express_1.default)();
const corsOptions = {
    credentials: true,
    origin: constants_1.CLIENT_ORIGIN,
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};
exports.app
    .use(express_1.default.static(path_1.default.join(__dirname, 'public')))
    .use(express_1.default.json())
    .use((0, cookie_parser_1.default)())
    .use((0, cors_1.default)(corsOptions));
exports.app.options('*', (0, cors_1.default)(corsOptions));
exports.app
    .use('/api/auth', routes_1.authRouter)
    .use('/api/users', routes_1.usersRouter)
    .use('/api/events', routes_1.eventsRouter)
    .use('/api/team-members', routes_1.teamMembersRouter);
exports.app.use(middleware_1.errorMiddleware);
//# sourceMappingURL=app.js.map