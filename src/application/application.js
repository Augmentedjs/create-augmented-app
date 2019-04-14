import { Application as BaseApplication } from "presentation-application";
import Router from "../router/router.js";
import Logger from "../logger/logger.js";
import * as CONSTANTS from "../constants.js";
import serialize from "presentation-router";
import AboutDialog from "../components/aboutDialog.js";

const getPlace = (where, options) => {
  return (options) ? `${where}?${serialize(options)}` : where;
};

class Application extends BaseApplication {
  constructor(storage) {
    super(CONSTANTS.APP_NAME);
    this.router = new Router();
  };

  navigate(where, options) {
    if (this.router && where) {
      this.router.navigate(getPlace(where, options), { "trigger": true });
    }
  };

  launch(where, options) {
    if (this.router && where) {
      this.router.navigate(getPlace(where, options), { "trigger": false });
    }
  };

  about() {
    const view = new AboutDialog();
    view.render();
  };
};

const app = new Application();

export default app;
