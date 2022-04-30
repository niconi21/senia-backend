export const ENVIROMENT_APP = {
  PORT: process.env.PORT || "3000",
  SECRET_TOKEN: process.env.SECRET_TOKEN || 'SecretoDeAmor',
  EXPIRES_IN: process.env.EXPIRES_IN || '7d',
  COUNT_IMAGES: parseInt(process.env.COUNT_IMAGES as string) || 30
};


export const ENVIROMENT_DATABASE = {
  URI_DB: process.env.URI_DB || "mongodb://localhost:27017/lsm",
};
