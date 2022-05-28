"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ENVIROMENT_DATABASE = exports.ENVIROMENT_APP = void 0;
exports.ENVIROMENT_APP = {
    ENVIROMENT: process.env.ENVIROMENT || "dev",
    PORT: process.env.PORT || "3000",
    PATH_SSL: process.env.PATH_SSL || '/etc/letsencrypt/live/senia.ga',
    SECRET_TOKEN: process.env.SECRET_TOKEN || "SecretoDeAmor",
    EXPIRES_IN: process.env.EXPIRES_IN || "7d",
    COUNT_IMAGES: parseInt(process.env.COUNT_IMAGES) || 30,
};
exports.ENVIROMENT_DATABASE = {
    URI_DB: process.env.URI_DB || "mongodb://localhost:27017/lsm",
};
