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
exports.UserController = void 0;
const user_class_1 = require("../classes/user.class");
const dir_tools_1 = require("../tools/dir.tools");
const path_1 = require("path");
class UserController {
    static getById(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { ok, message, user } = yield this._userClass.getById(_id);
                if (ok) {
                    return { ok, status: 200, message, result: { user } };
                }
                else {
                    return { ok: false, status: 400, message };
                }
            }
            catch (error) {
                return { ok: false, status: 500, message: "Error en el servidor", error };
            }
        });
    }
    static getAll(limit = 5, skip = 0) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let result = yield this._userClass.getAll(limit, skip);
                let { ok, message, users, count, total } = result;
                if (ok) {
                    return {
                        ok,
                        status: 200,
                        message,
                        result: { limit, skip, count, total, users },
                    };
                }
                else {
                    return { ok: false, status: 400, message };
                }
            }
            catch (error) {
                return { ok: false, status: 500, message: "Error en el servidor", error };
            }
        });
    }
    static updateById(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let result = yield this._userClass.updateById(data);
                let { ok, message, user, error } = result;
                if (ok) {
                    return { ok, status: 200, message, result: { user } };
                }
                else {
                    return { ok: false, status: 400, message, error };
                }
            }
            catch (error) {
                return { ok: false, status: 500, message: "Error en el servidor", error };
            }
        });
    }
    static deleteById(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let result = yield this._userClass.deleteById(_id);
                let { ok, message, user, error } = result;
                if (ok) {
                    (0, dir_tools_1.removeDir)((0, path_1.resolve)(__dirname, `../public/${user === null || user === void 0 ? void 0 : user._id}`));
                    return { ok, status: 200, message, result: { user } };
                }
                else {
                    return { ok: false, status: 400, message, error };
                }
            }
            catch (error) {
                return { ok: false, status: 500, message: "Error en el servidor", error };
            }
        });
    }
}
exports.UserController = UserController;
UserController._userClass = new user_class_1.UserClass();
