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
exports.ImageClass = void 0;
const letter_class_1 = require("./letter.class");
const letter_schema_1 = __importDefault(require("../schemas/letter.schema"));
class ImageClass {
    constructor() {
        this._letterClass = new letter_class_1.LetterClass();
    }
    registredImage(_letterId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let letter = yield letter_schema_1.default.findById(_letterId);
                if (letter) {
                    letter.images.push(data);
                    let image = letter.images[letter.images.length - 1];
                    yield letter.save();
                    return {
                        ok: true,
                        message: "Imagen almacenada",
                        letter,
                        image,
                    };
                }
                else
                    return { ok: false, message: "La letra no existe" };
            }
            catch (error) {
                return { ok: false, message: "La letra no existe", error };
            }
        });
    }
}
exports.ImageClass = ImageClass;
