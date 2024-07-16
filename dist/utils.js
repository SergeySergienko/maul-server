"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isDateValid = void 0;
const isDateValid = (date) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    return regex.test(date);
};
exports.isDateValid = isDateValid;
//# sourceMappingURL=utils.js.map