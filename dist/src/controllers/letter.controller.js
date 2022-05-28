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
exports.LetterController = void 0;
const letter_schema_1 = require("../schemas/letter.schema");
const letter_class_1 = require("../classes/letter.class");
const dir_tools_1 = require("../tools/dir.tools");
const path_1 = require("path");
class LetterController {
    static registerLetter(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { ok: isRegistred, letter: LetterRegistred } = yield this._letterClass.getLetterByNameAndUser(data);
                if (!isRegistred) {
                    let { ok, message, error, letter } = yield this._letterClass.registerLetter(data);
                    letter = letter;
                    if (ok) {
                        (0, dir_tools_1.createDir)((0, path_1.resolve)(__dirname, letter.getPathLetter()));
                        return { ok: true, status: 200, message, result: { letter } };
                    }
                    return { ok: false, status: 400, message, error };
                }
                else {
                    return {
                        ok: false,
                        status: 400,
                        message: "La letra ya fué registrada",
                        result: { letter: LetterRegistred },
                    };
                }
            }
            catch (error) {
                return { ok: false, status: 500, message: "Error en el servidor", error };
            }
        });
    }
    static getLetterByUser(_userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { ok, message, letters } = yield this._letterClass.getLettersByUser(_userId);
                if (ok) {
                    let lettersMap = new Map();
                    let total = 0;
                    letters.forEach((letter) => {
                        if (!lettersMap.has(letter.name)) {
                            lettersMap.set(letter.name, new letter_schema_1.Letter());
                            lettersMap.get(letter.name).name = letter.name;
                        }
                        let letterTemp = lettersMap.get(letter.name);
                        if (!(letterTemp === null || letterTemp === void 0 ? void 0 : letterTemp.hands))
                            letterTemp.hands = new Map();
                        if (!letterTemp.hands.has(letter.hand)) {
                            letterTemp.hands.set(letter.hand, new letter_schema_1.Letter());
                            letterTemp.hands.get(letter.hand).hand =
                                letter.hand;
                        }
                        let handTemp = letterTemp.hands.get(letter.hand);
                        if (!handTemp.types)
                            handTemp.types = new Map();
                        if (!handTemp.types.has(letter._id))
                            handTemp.types.set(letter._id, letter);
                    });
                    let lettersArr = Array.from(lettersMap.values());
                    lettersArr.forEach((letter) => {
                        letter.hands = Array.from(letter.hands.values());
                        letter.hands.forEach((hand) => {
                            hand.types = Array.from(hand.types.values());
                            total += hand.types.length;
                            hand.types.forEach(type => type.images = []);
                        });
                        return letter;
                    });
                    return {
                        ok: true,
                        status: 200,
                        message,
                        result: { total, letters: lettersArr },
                    };
                }
                else
                    return { ok: false, status: 400, message };
            }
            catch (error) {
                return { ok: false, status: 400, message: "Error en el servidor", error };
            }
        });
    }
    static getLetterByIdByUser(_id, _userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { ok, message, letter } = yield this._letterClass.getLetterByIdByUser(_id, _userId);
                if (ok) {
                    return { ok: true, status: 200, message, result: { letter } };
                }
                return { ok: false, status: 400, message };
            }
            catch (error) {
                return { ok: false, status: 500, message: "Error en el servidor", error };
            }
        });
    }
    static deleteLetterById(_id, _userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { ok, letter, message } = yield this._letterClass.deleteLetterById(_id, _userId);
                if (ok) {
                    (0, dir_tools_1.removeDir)((0, path_1.resolve)(__dirname, letter.getPathLetter()));
                    return { ok: true, status: 200, message, result: { letter } };
                }
                return { ok: false, status: 400, message };
            }
            catch (error) {
                return { ok: false, status: 500, message: "Error en el servidor", error };
            }
        });
    }
}
exports.LetterController = LetterController;
LetterController._letterClass = new letter_class_1.LetterClass();
