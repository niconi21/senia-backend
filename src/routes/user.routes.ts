import { Request, Response, Router } from "express";
import { IResponse } from "../interfaces/response.interface";
import { getUserFromRequest } from "../tools/request.tools";
import { isAdmin } from "../middlewares/token.middleware";
import { json_error } from "../tools/errors.tools";
import { User } from "../models/user.schema";
import { UserController } from '../controllers/user.controller';

export const ROUTES_USER = Router();

ROUTES_USER.get("/", async (req: Request, res: Response) => {
  let json: IResponse = { ok: true, status: 200 };

  if (getUserFromRequest(req)) {
    let user = getUserFromRequest(req);
    json.result = { user };
    return res.status(json.status).json(json);
  } else {
    json.status = 400;
    json.message = "Unfound user";
    return res.status(json.status).json(json);
  }
});

ROUTES_USER.get("/get/all", [isAdmin], async (req: Request, res: Response) => {
  let limit = Number(req.query.limit) || 5;
  let skip = Number(req.query.skip) || 0;

  let response = await UserController.getAll(limit, skip);
  res.status(response.status).json(response);
});

ROUTES_USER.put("/", async (req: Request, res: Response) => {
  if (req.body.user) {
    let user = req.body.user as User;
    let userData = getUserFromRequest(req);
    user._id = userData._id;
    let response = await UserController.updateById(user);
    return res.status(response.status).json(response);
  } else json_error.message = "send data in objet 'User'";
  return res.status(json_error.status).json(json_error);
});

ROUTES_USER.delete("", async (req: Request, res: Response) => {
  let userData = getUserFromRequest(req);
  let response = await UserController.deleteById(userData._id);
  return res.status(response.status).json(response);
});
