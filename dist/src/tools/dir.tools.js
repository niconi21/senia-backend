"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeDir = exports.createDir = void 0;
const fs_1 = require("fs");
const createDir = (path) => {
    try {
        if (!(0, fs_1.existsSync)(path))
            (0, fs_1.mkdirSync)(path, { recursive: true });
        return true;
    }
    catch (error) {
        console.log(error);
        return false;
    }
};
exports.createDir = createDir;
const removeDir = (path) => {
    try {
        if ((0, fs_1.existsSync)(path))
            (0, fs_1.rmSync)(path, { recursive: true });
        return true;
    }
    catch (error) {
        console.log(error);
        return false;
    }
};
exports.removeDir = removeDir;
