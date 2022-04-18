import { mkdirSync, existsSync,rmSync } from "fs";

export const createDir = (path: string): boolean => {
  try {
    if (!existsSync(path)) mkdirSync(path, { recursive: true });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const removeDir = (path: string): boolean => {
  try {
    if (existsSync(path)) rmSync(path, { recursive: true });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
