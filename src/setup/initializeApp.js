import Mediator from "../views/mediator.js";
import Article from "../components/article.js";
import Header from "../components/header.js";
import Application from "../application/application.js";
import { FONT } from "../constants.js";

const initializeApp = async () => {
  try {
    Application.registerStylesheet(FONT.FONTS);

    Application.mediator = new Mediator();
    if (!Application.mediator) {
      throw new Error("Error creating mediator!");
    }

    Application.mediator.article = new Article();
    if (!Application.mediator.article) {
      throw new Error("Error creating mediator!");
    }

    Application.mediator.header = new Header();
    if (!Application.mediator.header) {
      throw new Error("Error creating header!");
    }

    let view = await Application.mediator.article.render();
    if (!view) {
      throw new Error("Error creating mediator!");
    }

    view = await Application.mediator.header.render();
    if (!view) {
      throw new Error("Error creating header!");
    }

    Application.mediator.observeColleagueAndTrigger(Application.mediator.article, "article", "header");
    Application.mediator.observeColleagueAndTrigger(Application.mediator.header, "header", "header");
    if (!Application.mediator.channels) {
      throw new Error("Error observing views!");
    }

    const p = await Application.start();
    if (!p) {
      throw new Error("Error starting application!");
    }
  } catch(e) {
    const err = `Error initializing Application - ${e}`;
    throw new Error(err);
  }
};

export default initializeApp;
