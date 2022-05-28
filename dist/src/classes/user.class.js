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
exports.UserClass = void 0;
const user_schema_1 = __importDefault(require("../schemas/user.schema"));
class UserClass {
    getById(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let user = yield user_schema_1.default.findById(_id);
                if (user) {
                    return { ok: true, message: "Información del usuario", user };
                }
                else {
                    return { ok: false, message: "Usuario no encontrado" };
                }
            }
            catch (error) {
                return { ok: false, message: "Usuario no encontrado" };
            }
        });
    }
    getAll(limit = 5, skip = 0) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let users = yield user_schema_1.default.find().limit(limit).skip(skip);
                let count = yield user_schema_1.default.countDocuments().limit(limit).skip(skip);
                return {
                    ok: true,
                    message: "Información de los usuarios",
                    users,
                    limit,
                    skip,
                    count,
                    total: users.length,
                };
            }
            catch (error) {
                return { ok: false, message: "Usuarios no encontrados" };
            }
        });
    }
    updateById(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { nombre, correo } = data;
                let user = yield user_schema_1.default.findByIdAndUpdate(data._id, { nombre, correo }, {
                    new: true,
                });
                if (user) {
                    return { ok: true, message: "Usuario actualizado", user };
                }
                else {
                    return { ok: false, message: "El usuario no fué actualizado" };
                }
            }
            catch (error) {
                let msg = `No es válido el `;
                let duplicate = error.message.indexOf("duplicate key error") != -1;
                if (duplicate) {
                    Object.keys(error.keyValue).forEach((value) => {
                        msg += `"${value}" intente otro`;
                    });
                }
                return { ok: false, message: "El usuario no fué actualizado", error: msg };
            }
        });
    }
    deleteById(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let user = yield user_schema_1.default.findByIdAndDelete(_id);
                if (user) {
                    return { ok: true, message: "Usuario eliminado", user };
                }
                else {
                    return { ok: false, message: "El usuario no fué eliminado" };
                }
            }
            catch (error) {
                let errorObj = { error: error.codeName, value: error.keyValue };
                return { ok: false, message: "El usuario no fué eliminado", error: errorObj };
            }
        });
    }
}
exports.UserClass = UserClass;
