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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ROUTES_IMAGE = void 0;
const express_1 = require("express");
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const image_controller_1 = require("../controllers/image.controller");
const errors_tools_1 = require("../tools/errors.tools");
const request_tools_1 = require("../tools/request.tools");
exports.ROUTES_IMAGE = (0, express_1.Router)();
exports.ROUTES_IMAGE.post("/:_letterId", (0, express_fileupload_1.default)(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.files) {
        if (req.files.image) {
            let user = (0, request_tools_1.getUserFromRequest)(req);
            let image = req.files.image;
            let _letraId = req.params._letterId;
            let response = yield image_controller_1.ImageController.registredImage(_letraId, user._id, image);
            return res.status(response.status).json(response);
        }
        else
            errors_tools_1.json_error.message = 'Es necesaria una imagen en la propiedad "image"';
    }
    else
        errors_tools_1.json_error.message = 'Es necesaria una imagen en la propiedad "image"';
    return res.status(errors_tools_1.json_error.status).json(errors_tools_1.json_error);
}));
