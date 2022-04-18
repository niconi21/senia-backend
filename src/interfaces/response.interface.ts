import { User } from "../models/user.schema";
import { Letter } from '../models/letter.schema';

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
}
