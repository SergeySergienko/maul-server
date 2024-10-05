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
exports.eventsRepo = void 0;
const mongodb_1 = require("mongodb");
const _1 = require(".");
exports.eventsRepo = {
    findEvent(field, value) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield _1.eventCollection.findOne({ [field]: value });
        });
    },
    findEvents(_a) {
        return __awaiter(this, arguments, void 0, function* ({ limit, sort }) {
            const options = {};
            if (limit) {
                options.limit = +limit;
            }
            options.sort = { date: sort || 'desc' };
            return yield _1.eventCollection.find({}, options).toArray();
        });
    },
    createEvent(event) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield _1.eventCollection.insertOne(event);
        });
    },
    updateEvent(updateData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = updateData, fieldsToUpdate = __rest(updateData, ["id"]);
            const result = yield _1.eventCollection.findOneAndUpdate({ _id: new mongodb_1.ObjectId(id) }, { $set: Object.assign(Object.assign({}, fieldsToUpdate), { updatedAt: new Date() }) }, { returnDocument: 'after' });
            return result.value;
        });
    },
    deleteEvent(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield _1.eventCollection.deleteOne({ _id: new mongodb_1.ObjectId(id) });
        });
    },
};
//# sourceMappingURL=events-repo.js.map