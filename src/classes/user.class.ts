import { IResult } from "../interfaces/response.interface";
import UserSchema, { User } from "../models/user.schema";

export class UserClass {
  public async getById(_id: string): Promise<IResult> {
    try {
      let user = await UserSchema.findById(_id);
      if (user) {
        return { ok: true, message: "Información del usuario", user };
      } else {
        return { ok: false, message: "Usuario no encontrado" };
      }
    } catch (error) {
      return { ok: false, message: "Usuario no encontrado" };
    }
  }

  public async getAll(limit = 5, skip = 0): Promise<IResult> {
    try {
      let users = await UserSchema.find().limit(limit).skip(skip);
      let count = await UserSchema.countDocuments().limit(limit).skip(skip);

      return {
        ok: true,
        message: "Información de los usuarios",
        users,
        limit,
        skip,
        count,
        total: users.length,
      };
    } catch (error) {
      return { ok: false, message: "Usuarios no encontrados" };
    }
  }

  public async updateById(data: User): Promise<IResult> {
    try {
      let { nombre, correo } = data;
      let user = await UserSchema.findByIdAndUpdate(
        data._id,
        { nombre, correo },
        {
          new: true,
        }
      );
      if (user) {
        return { ok: true, message: "Usuario actualizado", user };
      } else {
        return { ok: false, message: "El usuario no fué actualizado" };
      }
    } catch (error) {
      let msg = `No es válido el `;
      let duplicate =
        (error.message as string).indexOf("duplicate key error") != -1;
      if (duplicate) {
        Object.keys(error.keyValue).forEach((value) => {
          msg += `"${value}" intente otro`;
        });
      }

      return { ok: false, message: "El usuario no fué actualizado", error: msg };
    }
  }

  public async deleteById(_id: string): Promise<IResult> {
    try {
      let user = await UserSchema.findByIdAndDelete(_id);
      if (user) {
        return { ok: true, message: "Usuario eliminado", user };
      } else {
        return { ok: false, message: "El usuario no fué eliminado" };
      }
    } catch (error) {
      let errorObj = { error: error.codeName, value: error.keyValue };

      return { ok: false, message: "El usuario no fué eliminado", error: errorObj };
    }
  }
}
