import { Image } from "../schemas/image.schema";
import { LetterClass } from "./letter.class";
import LetterSchema from "../schemas/letter.schema";
import { IResult } from "../interfaces/response.interface";
export class ImageClass {
  private _letterClass = new LetterClass();

  public async registredImage(
    _letterId: string,
    data: Image
  ): Promise<IResult> {
    try {
      let letter = await LetterSchema.findById(_letterId);
      if (letter) {
        letter!.images.push(data);
        let image = letter.images[letter.images.length - 1];
        await letter.save();
        return {
          ok: true,
          message: "Imagen almacenada",
          letter,
          image,
        };
      } else return { ok: false, message: "La letra no existe" };
    } catch (error) {
      return { ok: false, message: "La letra no existe", error };
    }
  }
}
