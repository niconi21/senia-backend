"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectionDB = void 0;
const mongoose_1 = require("mongoose");
const enviromets_config_1 = require("./enviromets.config");
const connectionDB = () => {
    return (0, mongoose_1.connect)(enviromets_config_1.ENVIROMENT_DATABASE.URI_DB);
};
exports.connectionDB = connectionDB;
