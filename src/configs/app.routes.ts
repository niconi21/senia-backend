import { Router } from "express";
import { ROUTES_USER } from "../routes/user.routes";
import { ROUTES_AUTH } from "../routes/auth.routes";
import { getToken, isUser } from "../middlewares/token.middleware";
import { ROUTES_LETTER } from '../routes/letter.routes';

export const APP_ROUTES = Router();

APP_ROUTES.use("/auth", ROUTES_AUTH);

APP_ROUTES.use(getToken);
APP_ROUTES.use(isUser);
APP_ROUTES.use("/user", ROUTES_USER);
APP_ROUTES.use("/letter", ROUTES_LETTER);
