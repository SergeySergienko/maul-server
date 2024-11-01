"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PositionModel = exports.StatusModel = void 0;
var StatusModel;
(function (StatusModel) {
    StatusModel[StatusModel["CANDIDATE"] = 0] = "CANDIDATE";
    StatusModel[StatusModel["MEMBER"] = 1] = "MEMBER";
})(StatusModel || (exports.StatusModel = StatusModel = {}));
var PositionModel;
(function (PositionModel) {
    PositionModel[PositionModel["UNIVERSAL"] = 0] = "UNIVERSAL";
    PositionModel[PositionModel["LIBERO"] = 1] = "LIBERO";
    PositionModel[PositionModel["SETTER"] = 2] = "SETTER";
    PositionModel[PositionModel["HITTER"] = 3] = "HITTER";
})(PositionModel || (exports.PositionModel = PositionModel = {}));
//# sourceMappingURL=TeamMemberModel.js.map