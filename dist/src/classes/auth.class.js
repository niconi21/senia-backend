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
exports.AuthClass = void 0;
const user_schema_1 = __importDefault(require("../schemas/user.schema"));
class AuthClass {
    register(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let user = new user_schema_1.default(data);
                let error = user.validateSync();
                if (!error) {
                    yield user.save();
                    return {
                        ok: true,
                        message: "Usuario creado",
                        user,
                    };
                }
                else {
                    console.log(error);
                    return { ok: false, message: "Usuario no creado", error };
                }
            }
            catch (error) {
                let msg = "";
                let duplicate = error.message.indexOf("duplicate key error") != -1;
                if (duplicate) {
                    Object.keys(error.keyValue).forEach((value) => {
                        msg += `No es válido el ${value} intente otro`;
                    });
                }
                return { ok: false, message: "Usuario no creado", error: msg };
            }
        });
    }
    login(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let user = yield user_schema_1.default.findOne({ correo: data.correo });
                if (user) {
                    return { ok: true, message: "Información del usuario", user };
                }
                else {
                    return { ok: false, message: "Correo incorrecto" };
                }
            }
            catch (error) {
                return { ok: false, message: "Correo incorrecto" };
            }
        });
    }
}
exports.AuthClass = AuthClass;
