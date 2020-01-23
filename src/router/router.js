import Mediator from "../views/mediator.js";
import { Router as BaseRouter } from "presentation-router";
import { PANEL } from "../messages.js";

// views
import HomeView from "../views/homeView.js";

const TRANSITION = {
  "in": 250,
  "out": 250
};

const loadViewAndObserve = async (router, view) => {
  await Mediator.observeColleagueAndTrigger(view, PANEL, view.name);
  await router.loadView(view);
  return router;
};

class Router extends BaseRouter {
  constructor() {
    super({
      "transition": TRANSITION,
      "routes": {
        "": () => {
          return loadViewAndObserve(this, new HomeView());
        },
        "home": () => {
          return loadViewAndObserve(this, new HomeView());
        }
      }
    });
  };

  async cleanup() {
    if (this.view) {
      await Mediator.dismissColleagueTrigger(this.view, PANEL, this.view.name);
    }
    return await super.cleanup();
  };
};

export default Router;
