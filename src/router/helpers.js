import Mediator from "../views/mediator.js";
import { PANEL } from "../messages.js";
import HomeView from "../views/homeView.js";

const loadViewAndObserve = async (router, view) => {
  await Mediator.observeColleagueAndTrigger(view, PANEL, view.name);
  await router.loadView(view);
  return router;
};

const cleanup = async (context) => {
  if (context.view) {
    await Mediator.dismissColleagueTrigger(context.view, PANEL, context.view.name);
  }
  return context;
};

const home = (context) => {
  return loadViewAndObserve(context, new HomeView());
};

export { loadViewAndObserve, cleanup, home };
