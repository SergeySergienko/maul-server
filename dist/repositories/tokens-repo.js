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
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokensRepo = void 0;
const _1 = require(".");
exports.tokensRepo = {
    findToken(field, value) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield _1.tokenCollection.findOne({ [field]: value });
        });
    },
    createToken(_a) {
        return __awaiter(this, arguments, void 0, function* ({ userId, refreshToken }) {
            return yield _1.tokenCollection.insertOne({
                userId,
                refreshToken,
            });
        });
    },
    updateToken(_a) {
        return __awaiter(this, arguments, void 0, function* ({ userId, refreshToken }) {
            return yield _1.tokenCollection.updateOne({ userId }, { $set: { refreshToken } });
        });
    },
    deleteToken(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield _1.tokenCollection.deleteOne({ refreshToken });
        });
    },
};
//# sourceMappingURL=tokens-repo.js.map