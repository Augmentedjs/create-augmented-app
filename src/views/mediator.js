import { Mediator as BaseMediator } from "presentation-mediator";
import ErrorDialog from "../components/errorDialog.js";
import MessageDialog from "../components/messageDialog.js";
import ConfirmDialog from  "../components/confirmDialog.js";
import Application from "../application/application.js";
import Logger from "../logger/logger.js";
import {
  DISPLAY_ERROR_MESSAGE,
  DISPLAY_MESSAGE,
  DISPLAY_NOTIFICATION,
  NAVIGATION
} from "../messages.js";

const displayErrorMessage = async (message, context) => {
  if (context.messageDialog) {
    await context.messageDialog.remove();
    context.messageDialog = null;
  }
  //Logger.debug(`Message ${message}`);
  context.messageDialog = new ErrorDialog({ "body": message });
  await context.messageDialog.render();
};

const displayNotification = async (message, title, context) => {
  if (context.notify) {
    await context.notify.remove();
    context.notify = null;
  }
  //Logger.debug(`Message ${message}`);
  context.notify = new Notification({
    "body": message,
    "title": title
  });
  await context.notify.render();
};

const displayMessage = async (message, title, context) => {
  if (context.messageDialog) {
    await context.messageDialog.remove();
    context.messageDialog = null;
  }
  //Logger.debug(`Message ${message}`);
  context.messageDialog = new MessageDialog({
    "body": message,
    "title": title
  });
  await context.messageDialog.render();
};

class Mediator extends BaseMediator {
  constructor() {
    super({
      "name": "appmediator"
    });

    this.on(DISPLAY_ERROR_MESSAGE, (message) => {
      displayErrorMessage(message, this);
    });

    this.on(DISPLAY_MESSAGE, (message, title) => {
      displayMessage(message, title, this);
    });

    this.on(DISPLAY_NOTIFICATION, (message, title) => {
      displayNotification(message, title, this);
    });

    this.on(NAVIGATION, (where) => {
      if (where) {
        Application.navigate(where);
      } else {
        Logger.warn("Can not navigate to nowhere.");
      }
    });
  };
};

export default Mediator;
