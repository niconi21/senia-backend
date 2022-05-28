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
exports.ROUTES_USER = void 0;
const express_1 = require("express");
const request_tools_1 = require("../tools/request.tools");
const token_middleware_1 = require("../middlewares/token.middleware");
const errors_tools_1 = require("../tools/errors.tools");
const user_controller_1 = require("../controllers/user.controller");
exports.ROUTES_USER = (0, express_1.Router)();
exports.ROUTES_USER.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let json = { ok: true, status: 200 };
    if ((0, request_tools_1.getUserFromRequest)(req)) {
        let user = (0, request_tools_1.getUserFromRequest)(req);
        json.result = { user };
        return res.status(json.status).json(json);
    }
    else {
        json.status = 400;
        json.message = "Unfound user";
        return res.status(json.status).json(json);
    }
}));
exports.ROUTES_USER.get("/get/all", [token_middleware_1.isAdmin], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let limit = Number(req.query.limit) || 5;
    let skip = Number(req.query.skip) || 0;
    let response = yield user_controller_1.UserController.getAll(limit, skip);
    res.status(response.status).json(response);
}));
exports.ROUTES_USER.put("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.body.user) {
        let user = req.body.user;
        let userData = (0, request_tools_1.getUserFromRequest)(req);
        user._id = userData._id;
        let response = yield user_controller_1.UserController.updateById(user);
        return res.status(response.status).json(response);
    }
    else
        errors_tools_1.json_error.message = "send data in objet 'User'";
    return res.status(errors_tools_1.json_error.status).json(errors_tools_1.json_error);
}));
exports.ROUTES_USER.delete("", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let userData = (0, request_tools_1.getUserFromRequest)(req);
    let response = yield user_controller_1.UserController.deleteById(userData._id);
    return res.status(response.status).json(response);
}));
