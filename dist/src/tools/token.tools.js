"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeToken = exports.createToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const enviromets_config_1 = require("../configs/enviromets.config");
const createToken = (user) => {
    let { _id } = user;
    return (0, jsonwebtoken_1.sign)({ _id }, enviromets_config_1.ENVIROMENT_APP.SECRET_TOKEN, {
        expiresIn: enviromets_config_1.ENVIROMENT_APP.EXPIRES_IN,
    });
};
exports.createToken = createToken;
const decodeToken = (token) => {
    try {
        let decode = (0, jsonwebtoken_1.verify)(token, enviromets_config_1.ENVIROMENT_APP.SECRET_TOKEN);
        return decode._id;
    }
    catch (error) {
        return null;
    }
};
exports.decodeToken = decodeToken;
