import { Mediator as BaseMediator } from "presentation-mediator";
import Application from "../application/application.js";
import Logger from "../logger/logger.js";
import * as MESSAGES from "../messages.js";
import { displayErrorMessage, displayNotification, displayMessage, displayAbout, displayConfirmation } from "./functions/mediation.js";

class Mediator extends BaseMediator {
  constructor() {
    super({
      "name": "appmediator"
    });

    this.user = null;

    this.on(MESSAGES.DISPLAY_ABOUT, () => {
      displayAbout(this);
    });

    this.on(MESSAGES.DISPLAY_ERROR_MESSAGE, (message) => {
      displayErrorMessage(message, this);
    });

    this.on(MESSAGES.DISPLAY_MESSAGE, (message, title) => {
      displayMessage(message, title, this);
    });

    this.on(MESSAGES.DISPLAY_CONFIRMATION, (data) => {
      displayConfirmation(data.message, data.action, data.title, this);
    });

    this.on(MESSAGES.DISPLAY_NOTIFICATION, (message, title) => {
      displayNotification(message, title, this);
    });

    this.on(MESSAGES.NAVIGATION, (where) => {
      this.navigate(where);
    });

    this.on(MESSAGES.SET_IN_PROGRESS, (status) => {
      this.publish(MESSAGES.HEADER, MESSAGES.SET_INDICATOR, status);
    });

    this.on(MESSAGES.SET_COMPLETE, () => {
      this.publish(MESSAGES.HEADER, MESSAGES.SET_INDICATOR, false);
    });

    this.on(MESSAGES.CONFIRMED, (action) => {
  
    });
  };

  navigate(where) {
    if (where) {
      Application.navigate(where);
    } else {
      Logger.warn("Can not navigate to nowhere.");
    }
    return this;
  };

  displayErrorMessage(message) {
    displayErrorMessage(message, this);
  };

  displayMessage(message, title) {
    displayMessage(message, title, this);
  };

  displayNotification(message, title) {
    displayNotification(message, title, this);
  };

  observePanel(panel) {
    return this.observeColleagueAndTrigger(panel, MESSAGES.PANEL, panel.name);
  };

  dismissPanel(panel) {
    return this.dismissColleagueTrigger(panel, MESSAGES.PANEL, panel.name);
  };
};

const mediator = new Mediator();

export default mediator;
