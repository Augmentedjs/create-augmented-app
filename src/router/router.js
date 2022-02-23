import { Router as BaseRouter } from "presentation-router";

// helpers
import { home, cleanup } from "./helpers.js";

class Router extends BaseRouter {
  constructor() {
    super({
      "transition": {
        "in": 250,
        "out": 250
      },
      "routes": {
        "": () => {
          return home(this);
        },
        "home": () => {
          return home(this);
        }
      }
    });
  };

  async cleanup() {
    const ret = await super.cleanup();
    await cleanup(this);
    return ret;
  };
};

export default Router;
