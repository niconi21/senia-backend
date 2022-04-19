import { IResponse } from "../interfaces/response.interface";
import { UserClass } from "../classes/user.class";
import { User } from "../schemas/user.schema";
import { removeDir } from "../tools/dir.tools";
import { resolve } from "path";

export class UserController {
  private static _userClass = new UserClass();

  public static async getById(_id: string): Promise<IResponse> {
    try {
      let { ok, message, user } = await this._userClass.getById(_id);

      if (ok) {
        return { ok, status: 200, message, result: { user } };
      } else {
        return { ok: false, status: 400, message };
      }
    } catch (error) {
      return { ok: false, status: 500,message: "Error en el servidor",  error };
    }
  }

  public static async getAll(limit = 5, skip = 0): Promise<IResponse> {
    try {
      let result = await this._userClass.getAll(limit, skip);
      let { ok, message, users, count, total } = result;
      if (ok) {
        return {
          ok,
          status: 200,
          message,
          result: { limit, skip, count, total, users },
        };
      } else {
        return { ok: false, status: 400, message };
      }
    } catch (error) {
      return { ok: false, status: 500,message: "Error en el servidor",  error };
    }
  }

  public static async updateById(data: User): Promise<IResponse> {
    try {
      let result = await this._userClass.updateById(data);
      let { ok, message, user, error } = result;
      if (ok) {
        return { ok, status: 200, message, result: { user } };
      } else {
        return { ok: false, status: 400, message, error };
      }
    } catch (error) {
      return { ok: false, status: 500, message: "Error en el servidor", error };
    }
  }

  public static async deleteById(_id: string): Promise<IResponse> {
    try {
      let result = await this._userClass.deleteById(_id);
      let { ok, message, user, error } = result;
      if (ok) {
        removeDir(resolve(__dirname, `../public/${user?._id}`));

        return { ok, status: 200, message, result: { user } };
      } else {
        return { ok: false, status: 400, message, error };
      }
    } catch (error) {
      return { ok: false, status: 500, message: "Error en el servidor", error };
    }
  }
}
