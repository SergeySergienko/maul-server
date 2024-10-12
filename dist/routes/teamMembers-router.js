"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.teamMembersRouter = void 0;
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const middleware_1 = require("../middleware");
const validators_1 = __importStar(require("../validators"));
exports.teamMembersRouter = express_1.default.Router();
exports.teamMembersRouter.get('/', (0, validators_1.default)(validators_1.teamMembersValidators), controllers_1.teamMembersController.findTeamMembers);
exports.teamMembersRouter.get('/:id', (0, validators_1.default)(validators_1.teamMembersValidators), controllers_1.teamMembersController.findTeamMember);
exports.teamMembersRouter.post('/', (0, middleware_1.authMiddleware)('USER'), (0, middleware_1.multerMiddleware)('single'), (0, validators_1.default)(validators_1.teamMembersValidators), middleware_1.checkTeamMemberCreateMiddleware, controllers_1.teamMembersController.createTeamMember);
//# sourceMappingURL=teamMembers-router.js.map