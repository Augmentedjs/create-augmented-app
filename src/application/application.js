import { Application as BaseApplication } from "presentation-application";
import Router from "../router/router.js";
import { APP_NAME } from "../constants.js";
import AboutDialog from "../components/aboutDialog.js";

class Application extends BaseApplication {
  constructor(options) {
    if (!options) {
      options = {};
    }
    options.name = APP_NAME;
    options.router = new Router();
    super(options);
    this.title = APP_NAME;
  };

  about() {
    if (!this._about) {
      this._about = new AboutDialog();
    }
    this._about.render();
  };
};

const app = new Application();

export default app;
