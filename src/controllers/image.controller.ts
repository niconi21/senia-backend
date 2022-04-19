import { ImageClass } from "../classes/image.class";
import { IResponse } from "../interfaces/response.interface";
import { Image } from "../schemas/image.schema";
import { resolve } from "path";
import { UploadedFile } from "express-fileupload";
import { createDir } from "../tools/dir.tools";
import { LetterClass } from "../classes/letter.class";
export class ImageController {
  private static _imageClass = new ImageClass();
  private static _letterClass = new LetterClass();

  public static async registredImage(
    _letterId: string,
    _userId: string,
    imageData: UploadedFile
  ): Promise<IResponse> {
    try {
      let isLetterFromUser = await this._letterClass.isLetterFromUser(
        _letterId,
        _userId
      );
      if(isLetterFromUser){
        let isCompleted = await this._letterClass.isCompletedLetter(_letterId);
        if (!isCompleted) {
          let data = new Image();
          data.extension = imageData.name.substring(
            imageData.name.lastIndexOf(".") + 1
          );
          let { ok, message, letter, image } =
            await this._imageClass.registredImage(_letterId, data);
          if (ok) {
            createDir(resolve(__dirname, letter!.getPathLetter()));
            await imageData.mv(resolve(__dirname, image!.getPathImage(letter!)));
  
            await this._letterClass.updatePercentageLetter(_letterId);
  
            return { ok: true, status: 200, message };
          } else return { ok: false, status: 400, message };
        } else {
          return {
            ok: false,
            status: 400,
            message: "El registro de la letra ya está lleno",
          };
        }
      }else{
        return {
          ok: false,
          status: 400,
          message: "Esta letra no pertenece a este usuario",
        };
      }
      
    } catch (error) {
      return { ok: true, status: 500, error };
    }
  }
}
