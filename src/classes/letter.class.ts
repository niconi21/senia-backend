import { IResult } from "../interfaces/response.interface";
import LetterSchema, { Letter } from "../schemas/letter.schema";
import { ENVIROMENT_APP } from "../configs/enviromets.config";

export class LetterClass {
  public async registerLetter(data: Letter): Promise<IResult> {
    try {
      let letter = new LetterSchema(data);
      let error = letter.validateSync();
      if (!error) {
        await letter.save();
        return {
          ok: true,
          message: "letter created",
          letter,
        };
      } else return { ok: false, message: "letter not created", error };
    } catch (error) {
      let msg = "";
      let duplicate =
        (error.message as string).indexOf("duplicate key error") != -1;
      if (duplicate) {
        Object.keys(error.keyValue).forEach((value) => {
          msg = `No es válido el ${value} intente otro`;
        });
      }
      return { ok: false, message: "user no created", error: msg };
    }
  }

  public async getLetterByIdByUser(
    _id: string,
    _userId: string
  ): Promise<IResult> {
    try {
      let letter = await LetterSchema.findOne({ _id, user: _userId });
      if (letter) {
        return { ok: true, message: "Información de la letra", letter };
      }
      return { ok: false, message: "Letra no encontrada" };
    } catch (error) {
      return { ok: false, message: "Letra no encontrada", error };
    }
  }

  public async getLetterById(_id: string): Promise<IResult> {
    try {
      let letter = await LetterSchema.findById(_id);
      if (letter) {
        return { ok: true, message: "Información de la letra", letter };
      }
      return { ok: false, message: "Letra no encontrada" };
    } catch (error) {
      return { ok: false, message: "Letra no encontrada", error };
    }
  }

  public async getLettersByUser(_userId: string): Promise<IResult> {
    try {
      let letters = await LetterSchema.find({ user: _userId });
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
    } catch (error) {
      return {
        ok: false,
        message: "No se encontraron letras para este usuario",
        error,
      };
    }
  }

  public async getLetterByNameAndUser({
    name,
    type,
    hand,
    user,
  }: Letter): Promise<IResult> {
    try {
      let letter = await LetterSchema.findOne({
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
      } else {
        return {
          ok: false,
          message: "No existe esta letra para este usuario",
        };
      }
    } catch (error) {
      return {
        ok: false,
        message: "No existe esta letra para este usuario",
        error,
      };
    }
  }

  public async getLetterByOptions({ name, type, hand }: Letter) {
    try {
      let result = LetterSchema.find({ name, type, hand });
    } catch (error) {}
  }

  public async deleteLetterById(
    _id: string,
    _userId: string
  ): Promise<IResult> {
    try {
      let letter = await LetterSchema.findOneAndDelete({ _id, user: _userId });
      if (letter) {
        return { ok: true, message: "Letra eliimada", letter };
      } else {
        return { ok: false, message: "La letra no se pudo eliminar" };
      }
    } catch (error) {
      return { ok: false, message: "La letra no se pudo eliminar", error };
    }
  }

  public async isCompletedLetter(_letterId: string): Promise<boolean> {
    try {
      let letter = await LetterSchema.findById(_letterId);
      if (letter) {
        let percentage =
          (letter.images.length * 100) / ENVIROMENT_APP.COUNT_IMAGES;
        if (percentage < 100) {
          return false;
        } else {
          return true;
        }
      } else {
        return true;
      }
    } catch (error) {
      return true;
    }
  }

  public async updatePercentageLetter(_letterId: string): Promise<IResult> {
    try {
      let letter = await LetterSchema.findById(_letterId);
      if (letter) {
        letter.percentage =
          (letter.images.length * 100) / ENVIROMENT_APP.COUNT_IMAGES;
        await letter.save();
        return { ok: true, message: "letra actualizada", letter };
      }
      return { ok: false, message: "letra no actualizada"};
    } catch (error) {
      console.log(error);
      return { ok: false, message: "letra no actualizada" };
    }
  }

  public async isLetterFromUser(
    _id: string,
    _userId: string
  ): Promise<boolean> {
    try {
      let letter = await LetterSchema.findOne({ _id, user: _userId });
      if (letter) return true;
      else return false;
    } catch (error) {
      return false;
    }
  }
}
