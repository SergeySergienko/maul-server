"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTeamMembersRouter = void 0;
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const middleware_1 = require("../middleware");
const getTeamMembersRouter = () => {
    const router = express_1.default.Router();
    router.get('/', controllers_1.teamMembersController.findTeamMembers);
    router.post('/', (0, middleware_1.multerMiddleware)(), controllers_1.teamMembersController.createTeamMember);
    return router;
};
exports.getTeamMembersRouter = getTeamMembersRouter;
//# sourceMappingURL=teamMembers-router.js.map