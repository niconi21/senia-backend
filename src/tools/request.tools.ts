import { Request } from "express";
import { User } from "../models/user.schema";

export const getUserFromRequest = (req: Request): User => {
  return req.body.userData;
};
