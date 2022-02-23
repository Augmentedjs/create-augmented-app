import Application from "../application/application.js";
import Mediator from "../views/mediator.js";
import { HEADER } from "../messages.js";
import { RenderError } from "presentation-exceptions";
import MainView from "../views/mainView.js";

const initializeApp = async () => {
  try {
    if (!Mediator) {
      throw new RenderError("Error creating mediator!");
    }

    const main = new MainView();
    await Mediator.observeColleagueAndTrigger(main, HEADER, main.name);
    const view = await main.render();
    if (!view) {
      throw new RenderError("Error rendering main!");
    }

    const p = await Application.start();
    if (!p) {
      throw new RenderError("Error starting application!");
    }
  } catch(e) {
    throw e;
  }
};

export default initializeApp;
