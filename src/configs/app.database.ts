import { connect } from "mongoose";
import { ENVIROMENT_DATABASE } from "./enviromets.config";

export const connectionDB = () => {
  return connect(ENVIROMENT_DATABASE.URI_DB);
};
