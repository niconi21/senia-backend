import { NextFunction, Request, Response } from "express";
import { decodeToken } from "../tools/token.tools";
import { json_error } from "../tools/errors.tools";
import { UserClass } from "../classes/user.class";
import { getUserFromRequest } from "../tools/request.tools";

export const getToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token = req.headers.token;
  let _id = decodeToken(token as string);
  if (_id) {
    let userClass = new UserClass();
    let result = await userClass.getById(_id);
    if (result.ok) {
      req.body.userData = result.user;
      return next();
    }
  }
  json_error.message = "No autotizado";
  return res.status(json_error.status).json(json_error);
};

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  let user = getUserFromRequest(req);
  if (user.role == "ADMIN") return next();
  else {
    json_error.message = "No autorizado";
    return res.status(json_error.status).json(json_error);
  }
};

export const isUser = (req: Request, res: Response, next: NextFunction) => {
  let user = getUserFromRequest(req);
  if (user.role == "USER" || user.role == "ADMIN") return next();
  else {
    json_error.message = "No autorizado";
    return res.status(json_error.status).json(json_error);
  }
};
