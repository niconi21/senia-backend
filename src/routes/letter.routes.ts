import { Request, Response, Router } from "express";
import { json_error } from "../tools/errors.tools";
import {
  HANDS_LETTER,
  Letter,
  TYPES_LETTERS,
  NAME_LETTERS,
} from "../models/letter.schema";
import { getUserFromRequest } from "../tools/request.tools";
import { LetterController } from "../controllers/letter.controller";

export const ROUTES_LETTER = Router();

ROUTES_LETTER.post("/", async (req: Request, res: Response) => {
  let letter = req.body.letter as Letter;
  if (letter) {
    if (letter.name) {
      if (NAME_LETTERS.indexOf(letter.name) != -1) {
        if (letter.hand) {
          if (HANDS_LETTER.indexOf(letter.hand) != -1) {
            if (letter.type) {
              if (TYPES_LETTERS.indexOf(letter.type) != -1) {
                let user = getUserFromRequest(req);
                letter.user = user._id;
                let response = await LetterController.registerLetter(letter);
                return res.status(response.status).json(response);
              } else
                json_error.message = `${
                  letter.type
                } no es un tipo válido, los tipos válidos son: ${TYPES_LETTERS.join(
                  ", "
                )}`;
            } else
              json_error.message = `Es necesario el tipo de la imagen, los tipos válidos son: ${TYPES_LETTERS.join(
                ", "
              )}`;
          } else
            json_error.message = `${
              letter.hand
            } no es una mano válida, los tipos válidos de mano son: ${HANDS_LETTER.join(
              ", "
            )}`;
        } else
          json_error.message = `Es necesario la mano de la imagen, los tipos válidos de mano son: ${HANDS_LETTER.join(
            ", "
          )}`;
      } else
        json_error.message = `${
          letter.name
        } no es un tipo válido de letra, los tipos válidos de letras son: ${NAME_LETTERS.join(
          ", "
        )}`;
    } else
      json_error.message = "Es necesario el nombre de la letra de la imagen";
  } else
    json_error.message =
      'Manda la información de la letra en el objeto "letter"';
  return res.status(json_error.status).json(json_error);
});

ROUTES_LETTER.get("/:_id", async (req: Request, res: Response) => {
  let _id = req.params._id;
  let user = getUserFromRequest(req);
  let response = await LetterController.getLetterByIdByUser(_id, user._id);
  res.status(response.status).json(response);
});

ROUTES_LETTER.get("/", async (req: Request, res: Response) => {
  let user = getUserFromRequest(req);
  let response = await LetterController.getLetterByUser(user._id);
  res.status(response.status).json(response);
});

ROUTES_LETTER.delete("/:_id", async (req: Request, res: Response) => {
  let user = getUserFromRequest(req);
  let _id = req.params._id;
  let response = await LetterController.deleteLetterById(_id, user._id);
  res.status(response.status).json(response);
});
