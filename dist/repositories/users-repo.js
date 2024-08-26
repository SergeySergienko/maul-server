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
exports.usersRepo = void 0;
const mongodb_1 = require("mongodb");
const _1 = require(".");
exports.usersRepo = {
    findUser(field, value) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield _1.userCollection.findOne({ [field]: value });
        });
    },
    findUsers(_a) {
        return __awaiter(this, arguments, void 0, function* ({ limit, sort }) {
            const options = {};
            if (limit) {
                options.limit = +limit;
            }
            options.sort = { email: sort || 'asc' };
            return yield _1.userCollection.find({}, options).toArray();
        });
    },
    createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield _1.userCollection.insertOne(user);
        });
    },
    updateUser(_a) {
        return __awaiter(this, arguments, void 0, function* ({ id, role }) {
            const result = yield _1.userCollection.findOneAndUpdate({ _id: new mongodb_1.ObjectId(id) }, { $set: { role } }, { returnDocument: 'after' });
            return result.value;
        });
    },
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield _1.userCollection.deleteOne({ _id: new mongodb_1.ObjectId(id) });
        });
    },
};
//# sourceMappingURL=users-repo.js.map