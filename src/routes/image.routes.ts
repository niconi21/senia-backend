import { Request, Response, Router } from "express";
import fileUpload, { UploadedFile } from "express-fileupload";
import { ImageController } from "../controllers/image.controller";
import { json_error } from "../tools/errors.tools";
import { getUserFromRequest } from '../tools/request.tools';

export const ROUTES_IMAGE = Router();

ROUTES_IMAGE.post(
  "/:_letterId",
  fileUpload(),
  async (req: Request, res: Response) => {
    if (req.files) {
      if (req.files.image) {
        let user = getUserFromRequest(req);
        let image = req.files.image as UploadedFile;
        let _letraId = req.params._letterId;
        let response = await ImageController.registredImage(_letraId, user._id,image);
        return res.status(response.status).json(response);
      } else
        json_error.message = 'Es necesaria una imagen en la propiedad "image"';
    } else
      json_error.message = 'Es necesaria una imagen en la propiedad "image"';

    return res.status(json_error.status).json(json_error);
  }
);
