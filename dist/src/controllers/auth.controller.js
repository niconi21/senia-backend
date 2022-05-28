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
exports.AuthController = void 0;
const auth_class_1 = require("../classes/auth.class");
const token_tools_1 = require("../tools/token.tools");
const dir_tools_1 = require("../tools/dir.tools");
const path_1 = require("path");
class AuthController {
    static register(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this._authClass.register(data);
                const { user, message } = result;
                if (result.ok) {
                    (0, dir_tools_1.createDir)((0, path_1.resolve)(__dirname, `../public/${user === null || user === void 0 ? void 0 : user._id}`));
                    return {
                        ok: true,
                        status: 200,
                        message,
                        result: { user },
                    };
                }
                else {
                    return {
                        ok: false,
                        status: 400,
                        error: result.error,
                        message,
                    };
                }
            }
            catch (error) {
                return { ok: false, status: 500, message: "Error en el servidor", error };
            }
        });
    }
    static login(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let result = yield this._authClass.login(data);
                if (result.ok) {
                    let token = (0, token_tools_1.createToken)(result.user);
                    return {
                        ok: true,
                        status: 200,
                        message: result.message,
                        result: { token, user: result.user },
                    };
                }
                else {
                    return { ok: false, status: 400, message: result.message };
                }
            }
            catch (error) {
                return { ok: false, status: 500, message: "Error en el servidor", error };
            }
        });
    }
}
exports.AuthController = AuthController;
AuthController._authClass = new auth_class_1.AuthClass();
