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
exports.LetterClass = void 0;
const letter_schema_1 = __importDefault(require("../schemas/letter.schema"));
const enviromets_config_1 = require("../configs/enviromets.config");
class LetterClass {
    registerLetter(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let letter = new letter_schema_1.default(data);
                let error = letter.validateSync();
                if (!error) {
                    yield letter.save();
                    return {
                        ok: true,
                        message: "letter created",
                        letter,
                    };
                }
                else
                    return { ok: false, message: "letter not created", error };
            }
            catch (error) {
                let msg = "";
                let duplicate = error.message.indexOf("duplicate key error") != -1;
                if (duplicate) {
                    Object.keys(error.keyValue).forEach((value) => {
                        msg = `No es válido el ${value} intente otro`;
                    });
                }
                return { ok: false, message: "user no created", error: msg };
            }
        });
    }
    getLetterByIdByUser(_id, _userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let letter = yield letter_schema_1.default.findOne({ _id, user: _userId });
                if (letter) {
                    return { ok: true, message: "Información de la letra", letter };
                }
                return { ok: false, message: "Letra no encontrada" };
            }
            catch (error) {
                return { ok: false, message: "Letra no encontrada", error };
            }
        });
    }
    getLetterById(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let letter = yield letter_schema_1.default.findById(_id);
                if (letter) {
                    return { ok: true, message: "Información de la letra", letter };
                }
                return { ok: false, message: "Letra no encontrada" };
            }
            catch (error) {
                return { ok: false, message: "Letra no encontrada", error };
            }
        });
    }
    getLettersByUser(_userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let letters = yield letter_schema_1.default.find({ user: _userId });
                if (letters) {
                    return {
                        ok: true,
                        message: "Información de las letras del usuario",
                        letters,
                        total: letters.length,
                    };
                }
                return {
                    ok: false,
                    message: "No se encontraron letras para este usuario",
                };
            }
            catch (error) {
                return {
                    ok: false,
                    message: "No se encontraron letras para este usuario",
                    error,
                };
            }
        });
    }
    getLetterByNameAndUser({ name, type, hand, user, }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let letter = yield letter_schema_1.default.findOne({
                    user,
                    name,
                    type,
                    hand,
                });
                if (letter) {
                    return {
                        ok: true,
                        message: "Información de la letra",
                        letter,
                    };
                }
                else {
                    return {
                        ok: false,
                        message: "No existe esta letra para este usuario",
                    };
                }
            }
            catch (error) {
                return {
                    ok: false,
                    message: "No existe esta letra para este usuario",
                    error,
                };
            }
        });
    }
    getLetterByOptions({ name, type, hand }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let result = letter_schema_1.default.find({ name, type, hand });
            }
            catch (error) { }
        });
    }
    deleteLetterById(_id, _userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let letter = yield letter_schema_1.default.findOneAndDelete({ _id, user: _userId });
                if (letter) {
                    return { ok: true, message: "Letra eliimada", letter };
                }
                else {
                    return { ok: false, message: "La letra no se pudo eliminar" };
                }
            }
            catch (error) {
                return { ok: false, message: "La letra no se pudo eliminar", error };
            }
        });
    }
    isCompletedLetter(_letterId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let letter = yield letter_schema_1.default.findById(_letterId);
                if (letter) {
                    let percentage = (letter.images.length * 100) / enviromets_config_1.ENVIROMENT_APP.COUNT_IMAGES;
                    if (percentage < 100) {
                        return false;
                    }
                    else {
                        return true;
                    }
                }
                else {
                    return true;
                }
            }
            catch (error) {
                return true;
            }
        });
    }
    updatePercentageLetter(_letterId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let letter = yield letter_schema_1.default.findById(_letterId);
                if (letter) {
                    letter.percentage =
                        (letter.images.length * 100) / enviromets_config_1.ENVIROMENT_APP.COUNT_IMAGES;
                    yield letter.save();
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    isLetterFromUser(_id, _userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let letter = yield letter_schema_1.default.findOne({ _id, user: _userId });
                if (letter)
                    return true;
                else
                    return false;
            }
            catch (error) {
                return false;
            }
        });
    }
}
exports.LetterClass = LetterClass;
