import {config} from 'dotenv'
config();
import { App } from "./src/configs/app.config";
let app = new App();
app.listen();

/// a comment
