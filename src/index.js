import material from "presentation-css";
import sass from "./styles/main.scss";

import Logger from "./logger/logger.js";
import initializeApp from "./setup/initializeApp.js";

Logger.info("initalizing...");
initializeApp();
