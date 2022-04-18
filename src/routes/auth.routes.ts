import { Request, response, Response, Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { User } from "../models/user.schema";
import { json_error } from "../tools/errors.tools";

export const ROUTES_AUTH = Router();

ROUTES_AUTH.post("/registro", async (req: Request, res: Response) => {
  if (req.body.user) {
    let user = req.body.user as User;
    if (user.nombre) {
      if (user.correo) {
        let response = await AuthController.register(user);
        return res.status(response.status).json(response);
      } else {
        json_error.message = "Es necesari el correo";
      }
    } else {
      json_error.message = "Es necesario el nombre";
    }
  } else {
    json_error.message = "Envie la información del usuario en el objeto 'user' ";
  }
  return res.status(json_error.status).json(json_error);
});

ROUTES_AUTH.post("/registro/google", (req: Request, resp: Response) => {});

ROUTES_AUTH.post("/login", async (req: Request, res: Response) => {
  if (req.body.user) {
    let usuario = req.body.user as User;
    if (usuario.correo) {
      let response = await AuthController.login(usuario);
      return res.status(response.status).json(response);
    } else {
      json_error.message = "El correo es necesario";
    }
  } else {
    json_error.message = "Envie la información del usuario en el objeto 'user' ";
  }
  return res.status(json_error.status).json(json_error);
});
