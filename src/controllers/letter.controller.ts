import { IResponse } from "../interfaces/response.interface";
import { Letter } from "../schemas/letter.schema";
import { LetterClass } from "../classes/letter.class";
import { createDir, removeDir } from "../tools/dir.tools";
import { resolve } from "path";
import { Image } from "../schemas/image.schema";
import { underline } from "colors";
export class LetterController {
  private static _letterClass = new LetterClass();

  public static async registerLetter(data: Letter): Promise<IResponse> {
    try {
      let { ok: isRegistred, letter: LetterRegistred } =
        await this._letterClass.getLetterByNameAndUser(data);
      if (!isRegistred) {
        let { ok, message, error, letter } =
          await this._letterClass.registerLetter(data);
        letter = letter as Letter;
        if (ok) {
          createDir(resolve(__dirname, letter.getPathLetter() as string));
          return { ok: true, status: 200, message, result: { letter } };
        }
        return { ok: false, status: 400, message, error };
      } else {
        return {
          ok: false,
          status: 400,
          message: "La letra ya fué registrada",
          result: { letter: LetterRegistred },
        };
      }
    } catch (error) {
      return { ok: false, status: 500, message: "Error en el servidor", error };
    }
  }

  public static async getLetterByUser(_userId: string): Promise<IResponse> {
    try {
      let { ok, message, letters } = await this._letterClass.getLettersByUser(
        _userId
      );
      if (ok) {
        let lettersMap: Map<string, Letter> = new Map<string, Letter>();
        let total = 0;
        letters!.forEach((letter) => {
          if (!lettersMap.has(letter.name)) {
            lettersMap.set(letter.name, new Letter());
            lettersMap.get(letter.name)!.name = letter.name;
          }

          let letterTemp = lettersMap.get(letter.name);

          if (!letterTemp?.hands) letterTemp!.hands = new Map<string, Letter>();

          if (!(letterTemp!.hands as Map<string, Letter>).has(letter.hand)) {
            (letterTemp!.hands as Map<string, Letter>).set(
              letter.hand,
              new Letter()
            );
            (letterTemp!.hands as Map<string, Letter>).get(letter.hand)!.hand =
              letter.hand;
          }

          let handTemp = (letterTemp!.hands as Map<string, Letter>).get(
            letter.hand
          ) as Letter;

          if (!handTemp.types) handTemp.types = new Map<string, Letter>();

          if (!(handTemp.types as Map<string, Letter>).has(letter._id))
            (handTemp.types as Map<string, Letter>).set(letter._id, letter);
        });

        let lettersArr: Letter[] = Array.from(lettersMap.values());

        lettersArr.forEach((letter) => {
          letter.hands = Array.from(letter.hands.values());
          letter.hands.forEach((hand) => {
            hand.types = Array.from(hand.types.values());
            total += hand.types.length;

            hand.types.forEach(type => type.images = [])
          });
          return letter;
        });
        return {
          ok: true,
          status: 200,
          message,
          result: { total, letters: lettersArr },
        };
      } else return { ok: false, status: 400, message };
    } catch (error) {
      return { ok: false, status: 400, message: "Error en el servidor", error };
    }
  }

  public static async getLetterByIdByUser(
    _id: string,
    _userId: string
  ): Promise<IResponse> {
    try {
      let { ok, message, letter } = await this._letterClass.getLetterByIdByUser(
        _id,
        _userId
      );

      if (ok) {
        return { ok: true, status: 200, message, result: { letter } };
      }

      return { ok: false, status: 400, message };
    } catch (error) {
      return { ok: false, status: 500, message: "Error en el servidor", error };
    }
  }

  public static async deleteLetterById(
    _id: string,
    _userId: string
  ): Promise<IResponse> {
    try {
      let { ok, letter, message } = await this._letterClass.deleteLetterById(
        _id,
        _userId
      );
      if (ok) {
        removeDir(resolve(__dirname, letter!.getPathLetter()));
        return { ok: true, status: 200, message, result: { letter } };
      }
      return { ok: false, status: 400, message };
    } catch (error) {
      return { ok: false, status: 500, message: "Error en el servidor", error };
    }
  }
}
