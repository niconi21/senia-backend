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
exports.ROUTES_LETTER = void 0;
const express_1 = require("express");
const errors_tools_1 = require("../tools/errors.tools");
const letter_schema_1 = require("../schemas/letter.schema");
const request_tools_1 = require("../tools/request.tools");
const letter_controller_1 = require("../controllers/letter.controller");
exports.ROUTES_LETTER = (0, express_1.Router)();
exports.ROUTES_LETTER.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let letter = req.body.letter;
    if (letter) {
        if (letter.name) {
            if (letter_schema_1.NAME_LETTERS.indexOf(letter.name) != -1) {
                if (letter.hand) {
                    if (letter_schema_1.HANDS_LETTER.indexOf(letter.hand) != -1) {
                        if (letter.type) {
                            if (letter_schema_1.TYPES_LETTERS.indexOf(letter.type) != -1) {
                                let user = (0, request_tools_1.getUserFromRequest)(req);
                                letter.user = user._id;
                                let response = yield letter_controller_1.LetterController.registerLetter(letter);
                                return res.status(response.status).json(response);
                            }
                            else
                                errors_tools_1.json_error.message = `${letter.type} no es un tipo válido, los tipos válidos son: ${letter_schema_1.TYPES_LETTERS.join(", ")}`;
                        }
                        else
                            errors_tools_1.json_error.message = `Es necesario el tipo de la imagen, los tipos válidos son: ${letter_schema_1.TYPES_LETTERS.join(", ")}`;
                    }
                    else
                        errors_tools_1.json_error.message = `${letter.hand} no es una mano válida, los tipos válidos de mano son: ${letter_schema_1.HANDS_LETTER.join(", ")}`;
                }
                else
                    errors_tools_1.json_error.message = `Es necesario la mano de la imagen, los tipos válidos de mano son: ${letter_schema_1.HANDS_LETTER.join(", ")}`;
            }
            else
                errors_tools_1.json_error.message = `${letter.name} no es un tipo válido de letra, los tipos válidos de letras son: ${letter_schema_1.NAME_LETTERS.join(", ")}`;
        }
        else
            errors_tools_1.json_error.message = "Es necesario el nombre de la letra de la imagen";
    }
    else
        errors_tools_1.json_error.message =
            'Manda la información de la letra en el objeto "letter"';
    return res.status(errors_tools_1.json_error.status).json(errors_tools_1.json_error);
}));
exports.ROUTES_LETTER.get("/:_id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let _id = req.params._id;
    let user = (0, request_tools_1.getUserFromRequest)(req);
    let response = yield letter_controller_1.LetterController.getLetterByIdByUser(_id, user._id);
    res.status(response.status).json(response);
}));
exports.ROUTES_LETTER.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let user = (0, request_tools_1.getUserFromRequest)(req);
    let response = yield letter_controller_1.LetterController.getLetterByUser(user._id);
    res.status(response.status).json(response);
}));
exports.ROUTES_LETTER.get("/get", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
}));
exports.ROUTES_LETTER.delete("/:_id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let user = (0, request_tools_1.getUserFromRequest)(req);
    let _id = req.params._id;
    let response = yield letter_controller_1.LetterController.deleteLetterById(_id, user._id);
    res.status(response.status).json(response);
}));
