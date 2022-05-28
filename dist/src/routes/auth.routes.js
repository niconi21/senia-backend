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
exports.ROUTES_AUTH = void 0;
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const errors_tools_1 = require("../tools/errors.tools");
exports.ROUTES_AUTH = (0, express_1.Router)();
exports.ROUTES_AUTH.post("/registro", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.body.user) {
        let user = req.body.user;
        if (user.nombre) {
            if (user.correo) {
                let response = yield auth_controller_1.AuthController.register(user);
                return res.status(response.status).json(response);
            }
            else {
                errors_tools_1.json_error.message = "Es necesari el correo";
            }
        }
        else {
            errors_tools_1.json_error.message = "Es necesario el nombre";
        }
    }
    else {
        errors_tools_1.json_error.message = "Envie la información del usuario en el objeto 'user' ";
    }
    return res.status(errors_tools_1.json_error.status).json(errors_tools_1.json_error);
}));
exports.ROUTES_AUTH.post("/registro/google", (req, resp) => { });
exports.ROUTES_AUTH.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.body.user) {
        let usuario = req.body.user;
        if (usuario.correo) {
            let response = yield auth_controller_1.AuthController.login(usuario);
            return res.status(response.status).json(response);
        }
        else {
            errors_tools_1.json_error.message = "El correo es necesario";
        }
    }
    else {
        errors_tools_1.json_error.message = "Envie la información del usuario en el objeto 'user' ";
    }
    return res.status(errors_tools_1.json_error.status).json(errors_tools_1.json_error);
}));
