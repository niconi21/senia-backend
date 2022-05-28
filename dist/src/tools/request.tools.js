"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserFromRequest = void 0;
const getUserFromRequest = (req) => {
    return req.body.userData;
};
exports.getUserFromRequest = getUserFromRequest;
