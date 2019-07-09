import { Application as BaseApplication } from "presentation-application";
import Router from "../router/router.js";
import { APP_NAME } from "../constants.js";

class Application extends BaseApplication {
  constructor() {
    super({
      "name": APP_NAME,
      "router": new Router()
    });
    this.title = APP_NAME;
  };
};

const app = new Application();

export default app;
