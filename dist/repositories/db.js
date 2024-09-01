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
exports.tokenCollection = exports.eventCollection = exports.teamMemberCollection = exports.userCollection = void 0;
exports.runDb = runDb;
const mongodb_1 = require("mongodb");
const url = process.env.DATABASE_URL;
const client = new mongodb_1.MongoClient(url);
exports.userCollection = client
    .db('maul_db')
    .collection('users');
exports.teamMemberCollection = client
    .db('maul_db')
    .collection('teamMembers');
exports.eventCollection = client
    .db('maul_db')
    .collection('events');
exports.tokenCollection = client
    .db('maul_db')
    .collection('tokens');
function runDb() {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            yield client.connect();
            console.log('\n--------------------------------------------');
            console.log('\x1b[35m%s\x1b[0m', `[OK] You successfully connected to ${((_a = client.options) === null || _a === void 0 ? void 0 : _a.appName) || 'MongoDB'}!`);
        }
        catch (error) {
            console.log(error);
            yield client.close();
        }
    });
}
//# sourceMappingURL=db.js.map