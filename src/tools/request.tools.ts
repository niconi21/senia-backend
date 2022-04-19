import { Request } from "express";
import { User } from "../schemas/user.schema";

export const getUserFromRequest = (req: Request): User => {
  return req.body.userData;
};
