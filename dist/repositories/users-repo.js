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
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRepo = void 0;
const mongodb_1 = require("mongodb");
const _1 = require(".");
exports.usersRepo = {
    findUser(field, value) {
        return __awaiter(this, void 0, void 0, function* () {
            if (field === 'id') {
                return yield _1.userCollection.findOne({ _id: new mongodb_1.ObjectId(value) });
            }
            return yield _1.userCollection.findOne({ [field]: value });
        });
    },
    findUsers(_a) {
        return __awaiter(this, arguments, void 0, function* ({ limit, sort, role }) {
            const options = {};
            const filter = {};
            if (limit) {
                options.limit = +limit;
            }
            options.sort = { email: sort || 'asc' };
            if (role) {
                filter.role = role;
            }
            return yield _1.userCollection.find(filter, options).toArray();
        });
    },
    createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield _1.userCollection.insertOne(user);
        });
    },
    updateUser(updateData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = updateData, fieldsToUpdate = __rest(updateData, ["id"]);
            const updateFields = Object.entries(fieldsToUpdate).reduce((acc, [key, value]) => {
                if (value !== undefined) {
                    acc[key] = value;
                }
                return acc;
            }, {});
            const result = yield _1.userCollection.findOneAndUpdate({ _id: new mongodb_1.ObjectId(id) }, { $set: Object.assign(Object.assign({}, updateFields), { updatedAt: new Date() }) }, { returnDocument: 'after' });
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