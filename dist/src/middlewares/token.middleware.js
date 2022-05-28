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
exports.isUser = exports.isAdmin = exports.getToken = void 0;
const token_tools_1 = require("../tools/token.tools");
const errors_tools_1 = require("../tools/errors.tools");
const user_class_1 = require("../classes/user.class");
const request_tools_1 = require("../tools/request.tools");
const getToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let token = req.headers.token;
    let _id = (0, token_tools_1.decodeToken)(token);
    if (_id) {
        let userClass = new user_class_1.UserClass();
        let result = yield userClass.getById(_id);
        if (result.ok) {
            req.body.userData = result.user;
            return next();
        }
    }
    errors_tools_1.json_error.message = "No autotizado";
    return res.status(errors_tools_1.json_error.status).json(errors_tools_1.json_error);
});
exports.getToken = getToken;
const isAdmin = (req, res, next) => {
    let user = (0, request_tools_1.getUserFromRequest)(req);
    if (user.role == "ADMIN")
        return next();
    else {
        errors_tools_1.json_error.message = "No autorizado";
        return res.status(errors_tools_1.json_error.status).json(errors_tools_1.json_error);
    }
};
exports.isAdmin = isAdmin;
const isUser = (req, res, next) => {
    let user = (0, request_tools_1.getUserFromRequest)(req);
    if (user.role == "USER" || user.role == "ADMIN")
        return next();
    else {
        errors_tools_1.json_error.message = "No autorizado";
        return res.status(errors_tools_1.json_error.status).json(errors_tools_1.json_error);
    }
};
exports.isUser = isUser;
