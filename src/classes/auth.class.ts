import { User } from "../models/user.schema";
import UserSchema from "../models/user.schema";
import { IResult } from "../interfaces/response.interface";
export class AuthClass {
  public async register(data: User): Promise<IResult> {
    try {
      let user = new UserSchema(data);
      let error = user.validateSync();
      if (!error) {
        await user.save();
        return {
          ok: true,
          message: "Usuario creado",
          user,
        };
      } else {
        console.log(error);
        return { ok: false, message: "Usuario no creado", error };
      }
    } catch (error) {
      let msg = "";
      let duplicate =
        (error.message as string).indexOf("duplicate key error") != -1;
      if (duplicate) {
        Object.keys(error.keyValue).forEach((value) => {
          msg += `No es válido el ${value} intente otro`;
        });
      }

      return { ok: false, message: "Usuario no creado", error: msg };
    }
  }

  public async login(data: User): Promise<IResult> {
    try {
      let user = await UserSchema.findOne({ correo: data.correo });
      if (user) {
        return { ok: true, message: "Información del usuario", user };
      } else {
        return { ok: false, message: "Correo incorrecto" };
      }
    } catch (error) {
      return { ok: false, message: "Correo incorrecto" };
    }
  }
}
