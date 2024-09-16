"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CLIENT_ORIGIN = exports.ALLOWED_ROLES = exports.IMAGE_HEIGHT = exports.IMAGE_WIDTH = exports.ALLOWED_EXTENSIONS = void 0;
exports.ALLOWED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp'];
exports.IMAGE_WIDTH = 192;
exports.IMAGE_HEIGHT = 288;
exports.ALLOWED_ROLES = [
    'USER',
    'MEMBER',
    'ADMIN',
];
exports.CLIENT_ORIGIN = process.env.NODE_ENV === 'production'
    ? process.env.CLIENT_ORIGIN_PRODUCTION || 'https://localhost:4173'
    : 'http://localhost:5173';
//# sourceMappingURL=constants.js.map