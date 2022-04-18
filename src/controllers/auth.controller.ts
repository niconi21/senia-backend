import { errors } from "@typegoose/typegoose";
import { AuthClass } from "../classes/auth.class";
import { IResponse } from "../interfaces/response.interface";
import { User } from "../models/user.schema";
import { createToken } from "../tools/token.tools";
import { createDir } from "../tools/dir.tools";
import { resolve } from "path";
export class AuthController {
  private static _authClass = new AuthClass();

  public static async register(data: User): Promise<IResponse> {
    try {
      const result = await this._authClass.register(data);
      const { user, message } = result;
      if (result.ok) {
        createDir(resolve(__dirname, `../public/${user?._id}`));
        return {
          ok: true,
          status: 200,
          message,
          result: { user },
        };
      } else {
        return {
          ok: false,
          status: 400,
          error: result.error,
          message,
        };
      }
    } catch (error) {
      return { ok: false, status: 500,message: "Error en el servidor", error };
    }
  }

  public static async login(data: User): Promise<IResponse> {
    try {
      let result = await this._authClass.login(data);
      if (result.ok) {
        let token = createToken(result.user as User);
        return {
          ok: true,
          status: 200,
          message: result.message,
          result: { token, user: result.user },
        };
      } else {
        return { ok: false, status: 400, message: result.message };
      }
    } catch (error) {
      return { ok: false, status: 500, message: "Error en el servidor", error };
    }
  }
}
