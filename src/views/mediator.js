import { Mediator as BaseMediator } from "presentation-mediator";
import Application from "../application/application.js";
import Logger from "../logger/logger.js";
import * as MESSAGES from "../messages.js";
import * as CONSTANTS from "../constants.js";
import { displayErrorMessage, displayNotification, displayMessage, displayAbout } from "./functions/mediation.js";

class Mediator extends BaseMediator {
  constructor() {
    super({
      "name": "appmediator"
    });
    this.on(MESSAGES.DISPLAY_ABOUT, (message) => {
      displayAbout(this);
    });

    this.on(MESSAGES.DISPLAY_ERROR_MESSAGE, (message) => {
      displayErrorMessage(message, this);
    });

    this.on(MESSAGES.DISPLAY_MESSAGE, (message, title) => {
      displayMessage(message, title, this);
    });

    this.on(MESSAGES.DISPLAY_NOTIFICATION, (message, title) => {
      displayNotification(message, title, this);
    });

    this.on(MESSAGES.NAVIGATION, (where) => {
      if (where) {
        Application.navigate(where);
      } else {
        Logger.warn("Can not navigate to nowhere.");
      }
    });
  };

  displayErrorMessage(message) {
    displayErrorMessage(message, this);
  };

  displayMessage(message, title) {
    displayMessage(message, title, this);
  };
};

export default Mediator;
