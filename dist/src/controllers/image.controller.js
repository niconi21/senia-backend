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
exports.ImageController = void 0;
const image_class_1 = require("../classes/image.class");
const image_schema_1 = require("../schemas/image.schema");
const path_1 = require("path");
const dir_tools_1 = require("../tools/dir.tools");
const letter_class_1 = require("../classes/letter.class");
class ImageController {
    static registredImage(_letterId, _userId, imageData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let isLetterFromUser = yield this._letterClass.isLetterFromUser(_letterId, _userId);
                if (isLetterFromUser) {
                    let isCompleted = yield this._letterClass.isCompletedLetter(_letterId);
                    if (!isCompleted) {
                        let data = new image_schema_1.Image();
                        data.extension = imageData.name.substring(imageData.name.lastIndexOf(".") + 1);
                        let { ok, message, letter, image } = yield this._imageClass.registredImage(_letterId, data);
                        if (ok) {
                            (0, dir_tools_1.createDir)((0, path_1.resolve)(__dirname, letter.getPathLetter()));
                            yield imageData.mv((0, path_1.resolve)(__dirname, image.getPathImage(letter)));
                            yield this._letterClass.updatePercentageLetter(_letterId);
                            return { ok: true, status: 200, message };
                        }
                        else
                            return { ok: false, status: 400, message };
                    }
                    else {
                        return {
                            ok: false,
                            status: 400,
                            message: "El registro de la letra ya está lleno",
                        };
                    }
                }
                else {
                    return {
                        ok: false,
                        status: 400,
                        message: "Esta letra no pertenece a este usuario",
                    };
                }
            }
            catch (error) {
                return { ok: true, status: 500, error };
            }
        });
    }
}
exports.ImageController = ImageController;
ImageController._imageClass = new image_class_1.ImageClass();
ImageController._letterClass = new letter_class_1.LetterClass();
