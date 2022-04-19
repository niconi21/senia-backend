import { User } from "../schemas/user.schema";
import { verify, sign, JwtPayload } from "jsonwebtoken";
import { ENVIROMENT_APP } from "../configs/enviromets.config";

export const createToken = (user: User): string => {
  let { _id } = user;
  return sign({ _id }, ENVIROMENT_APP.SECRET_TOKEN, {
    expiresIn: ENVIROMENT_APP.EXPIRES_IN,
  });
};

export const decodeToken = (token: string): string | null => {
  try {
    let decode = verify(token, ENVIROMENT_APP.SECRET_TOKEN) as JwtPayload;
    return decode._id;
  } catch (error) {
    return null;
  }
};
