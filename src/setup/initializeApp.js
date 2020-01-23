import Mediator from "../views/mediator.js";
import MainView from "../views/mainView.js";
import Application from "../application/application.js";
import { HEADER } from "../messages.js";
import Logger from "../logger/logger.js";

import setupTheme from "./setupTheme.js";

const initializeApp = async () => {
  try {
    const theme = await setupTheme();
    if (theme.isDarkMode) {
      import("../styles/darkmode.scss")
      .catch(e => {
        Logger.error(e);
      });
    } else {
      import("../styles/lightmode.scss")
      .catch(e => {
        Logger.error(e);
      });
    }

    if (!Mediator) {
      throw new Error("Error creating mediator!");
    }

    const main = new MainView();
    Mediator.observeColleagueAndTrigger(main, HEADER, "main");
    const view = await main.render();
    if (!view) {
      throw new Error("Error rendering main!");
    }

    const p = await Application.start();
    if (!p) {
      throw new Error("Error starting application!");
    }
  } catch(e) {
    Logger.error(e);
    throw e;
  }
};

export default initializeApp;
