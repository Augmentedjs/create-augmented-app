import { Mediator as BaseMediator } from "presentation-mediator";
import * as MESSAGES from "../messages.js";
import { displayErrorMessage, displayNotification, displayMessage, displayAbout } from "./functions/mediation.js";

class Mediator extends BaseMediator {
  constructor() {
    super({
      "name": "appmediator"
    });
    this.on(MESSAGES.DISPLAY_ABOUT, () => {
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

    this.on(MESSAGES.SET_IN_PROGRESS, (status) => {
      this.publish(MESSAGES.HEADER, MESSAGES.SET_INDICATOR, status);
    });
  };

  displayErrorMessage(message) {
    displayErrorMessage(message, this);
  };

  displayMessage(message, title) {
    displayMessage(message, title, this);
  };
};

const mediator = new Mediator();

export default mediator;
