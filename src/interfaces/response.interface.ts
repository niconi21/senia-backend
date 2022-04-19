import { User } from "../schemas/user.schema";
import { Letter } from '../schemas/letter.schema';
import { Image } from '../schemas/image.schema';

export interface IResponse {
  ok: boolean;
  status: number;
  message?: string;
  error?: any;
  result?: IResult;
}

export interface IResult {
  ok?: boolean;
  message?: string;

  error?:any | any[];

  token?: string;
  total?: number;
  limit?: number;
  skip?: number;
  count?: number;


  user?: User;
  users?: User[];
  letter?: Letter;
  letters?: Letter[];
  image?: Image;
  images?: Image[];
}
