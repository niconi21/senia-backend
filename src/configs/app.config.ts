import { resolve } from "path";

import { green, magenta, red } from "colors";

import { Application } from "express";
import express from "express";
import cors from "cors";

import { ENVIROMENT_APP } from "./enviromets.config";
import { createDir } from "../tools/dir.tools";
import { connectionDB } from "./app.database";
import { APP_ROUTES } from "./app.routes";

export class App {
  private _app: Application;

  constructor() {
    this._app = express();
    this._middlewares();
  }

  private _middlewares(): void {
    this._app.use(cors());
    this._app.use(express.json());
    this._app.use(express.urlencoded({ extended: false }));
    this._app.use("/public", express.static(resolve(__dirname, "../public")));
    this._app.use("/api/v1/", APP_ROUTES);
    this._createDirectoryPublic();
  }

  private _createDirectoryPublic() {
    console.log(
      createDir(resolve(__dirname, "../public"))
        ? green("Public directory created")
        : red("Public direcroty not create")
    );
  }

  public listen(): void {
    connectionDB()
      .then((success) => {
        console.log(magenta(`Data base connected succesfully`));
        this._app.listen(ENVIROMENT_APP.PORT, () =>
          console.log(magenta(`Listen on port ${ENVIROMENT_APP.PORT}`))
        );
      })
      .catch((error) => {});
  }
}
