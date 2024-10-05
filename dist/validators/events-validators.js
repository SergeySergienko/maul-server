"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventsValidators = void 0;
const _1 = require(".");
exports.eventsValidators = {
    'GET /api/events/': [_1.limitRule, _1.sortRule],
    'GET /api/events/:id': [_1.paramIdRule],
    'POST /api/events/': [
        _1.bodyDateRule,
        _1.bodyTitleRule,
        _1.bodyDescriptionRule,
        _1.bodyLocationRule,
        _1.teamPlaceRule,
        _1.uploadFilesRule,
    ],
    'PUT /api/events/': [
        _1.bodyIdRule,
        _1.bodyTitleRule,
        _1.bodyDescriptionRule,
        _1.bodyLocationRule,
        _1.teamPlaceRule,
    ],
    'DELETE /api/events/:id': [_1.paramIdRule],
};
//# sourceMappingURL=events-validators.js.map