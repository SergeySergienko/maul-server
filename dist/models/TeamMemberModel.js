"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PositionModel = exports.TeamRoleModel = void 0;
var TeamRoleModel;
(function (TeamRoleModel) {
    TeamRoleModel[TeamRoleModel["CANDIDATE"] = 0] = "CANDIDATE";
    TeamRoleModel[TeamRoleModel["MEMBER"] = 1] = "MEMBER";
})(TeamRoleModel || (exports.TeamRoleModel = TeamRoleModel = {}));
var PositionModel;
(function (PositionModel) {
    PositionModel[PositionModel["UNIVERSAL"] = 0] = "UNIVERSAL";
    PositionModel[PositionModel["LIBERO"] = 1] = "LIBERO";
    PositionModel[PositionModel["SETTER"] = 2] = "SETTER";
    PositionModel[PositionModel["HITTER"] = 3] = "HITTER";
})(PositionModel || (exports.PositionModel = PositionModel = {}));
//# sourceMappingURL=TeamMemberModel.js.map