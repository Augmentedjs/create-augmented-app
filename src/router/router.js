import Logger from "../logger/logger.js";
import Application from "../application/application.js";
import { Router as BaseRouter } from "presentation-router";
import { PANEL } from "../messages.js";

// views
import HomeView from "../views/homeView.js";

const TRANSITION = {
  "in": 250,
  "out": 250
};

const loadViewAndObserve = async (router, view) => {
  await router.loadView(view);
  await Application.mediator.observeColleagueAndTrigger(view, PANEL, view.name);
};

class Router extends BaseRouter {
  constructor() {
    super({
      "transition": TRANSITION,
      "routes": {
        "": () => {
          const view = new HomeView();
          loadViewAndObserve(this, view);
          return this;
        },
        "home": () => {
          const view = new HomeView();
          loadViewAndObserve(this, view);
          return this;
        }
      }
    });
  };

  cleanup() {
    if (this.view) {
      Application.mediator.dismissColleagueTrigger(this.view, PANEL, this.view.name);
    }
    return super.cleanup();
  }
};

export default Router;
