"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PositionModel = exports.Status = void 0;
var Status;
(function (Status) {
    Status[Status["CANDIDATE"] = 0] = "CANDIDATE";
    Status[Status["MEMBER"] = 1] = "MEMBER";
})(Status || (exports.Status = Status = {}));
var PositionModel;
(function (PositionModel) {
    PositionModel[PositionModel["UNIVERSAL"] = 0] = "UNIVERSAL";
    PositionModel[PositionModel["LIBERO"] = 1] = "LIBERO";
    PositionModel[PositionModel["SETTER"] = 2] = "SETTER";
    PositionModel[PositionModel["HITTER"] = 3] = "HITTER";
})(PositionModel || (exports.PositionModel = PositionModel = {}));
//# sourceMappingURL=TeamMemberModel.js.map