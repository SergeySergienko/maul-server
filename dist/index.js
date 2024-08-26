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
require("dotenv/config");
const app_1 = require("./app");
const repositories_1 = require("./repositories");
const PORT = process.env.PORT || 5000;
const startApp = () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, repositories_1.runDb)();
    app_1.app.listen(PORT, () => {
        console.log('\x1b[36m%s\x1b[0m', `[OK] App is running on ${PORT} port...`);
        console.log('--------------------------------------------');
    });
});
startApp();
//# sourceMappingURL=index.js.map