export const ENVIROMENT_APP = {
  ENV: process.env.ENVIROMENT || "dev",
  PORT: process.env.PORT || "3000",
  PATH_SSL: process.env.PATH_SSL || '/etc/letsencrypt/live/senia.ga',
  SECRET_TOKEN: process.env.SECRET_TOKEN || "SecretoDeAmor",
  EXPIRES_IN: process.env.EXPIRES_IN || "7d",
  COUNT_IMAGES: parseInt(process.env.COUNT_IMAGES as string) || 30,
};

export const ENVIROMENT_DATABASE = {
  URI_DB: process.env.URI_DB || "mongodb://localhost:27017/lsm",
};
