"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const path_1 = require("path");
const fs_1 = require("fs");
const https_1 = __importDefault(require("https"));
const colors_1 = require("colors");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const enviromets_config_1 = require("./enviromets.config");
const dir_tools_1 = require("../tools/dir.tools");
const app_database_1 = require("./app.database");
const app_routes_1 = require("./app.routes");
class App {
    constructor() {
        this._app = (0, express_1.default)();
        this._middlewares();
    }
    _middlewares() {
        this._app.use((0, cors_1.default)());
        this._app.use(express_1.default.json({ limit: "50bm" }));
        this._app.use(express_1.default.urlencoded({ extended: false, limit: "50bm" }));
        this._app.use("/public", express_1.default.static((0, path_1.resolve)(__dirname, "../public")));
        this._app.use("/api/v1/", app_routes_1.APP_ROUTES);
        this._createDirectoryPublic();
    }
    _createDirectoryPublic() {
        console.log((0, dir_tools_1.createDir)((0, path_1.resolve)(__dirname, "../public"))
            ? (0, colors_1.green)("Public directory created")
            : (0, colors_1.red)("Public direcroty not create"));
    }
    listen() {
        (0, app_database_1.connectionDB)()
            .then((success) => {
            console.log((0, colors_1.magenta)(`Data base connected succesfully`));
            if (enviromets_config_1.ENVIROMENT_APP.ENVIROMENT == "dev") {
                this._app.listen(enviromets_config_1.ENVIROMENT_APP.PORT, () => {
                    console.log((0, colors_1.magenta)(`Listen on port ${enviromets_config_1.ENVIROMENT_APP.PORT}`));
                });
            }
            else if (enviromets_config_1.ENVIROMENT_APP.ENVIROMENT == "prod") {
                const httpsOptions = {
                    key: (0, fs_1.readFileSync)(`${enviromets_config_1.ENVIROMENT_APP.PATH_SSL}/privkey.pem`),
                    cert: (0, fs_1.readFileSync)(`${enviromets_config_1.ENVIROMENT_APP.PATH_SSL}/cert.pem`),
                    ca: (0, fs_1.readFileSync)(`${enviromets_config_1.ENVIROMENT_APP.PATH_SSL}/chain.pem`),
                };
                https_1.default
                    .createServer(httpsOptions, this._app)
                    .listen(process.env.PORT, () => {
                    console.log((0, colors_1.magenta)(`Listen on port ${enviromets_config_1.ENVIROMENT_APP.PORT}`));
                });
            }
        })
            .catch((error) => { })
            .finally(() => console.log((0, colors_1.green)(`Enviroment: ${enviromets_config_1.ENVIROMENT_APP.ENVIROMENT}`)));
    }
}
exports.App = App;
