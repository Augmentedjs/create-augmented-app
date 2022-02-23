import { Notification, ErrorDialogView, MessageDialogView } from "presentation-dialogs";
import { AboutDialogView } from "presentation-dialogs";
import ConfirmationDialog from "../../components/confirmationDialog.js";
import { DIALOG_EL, ABOUT_CONFIG } from "../../constants.js";
import { DIALOG } from "../../messages.js";

const displayDialog = async (clazz, context) => {
  if (context.messageDialog) {
    await context.dismissColleagueTrigger(context.messageDialog, DIALOG, context.messageDialog.name);
    await context.messageDialog.remove();
    context.messageDialog = null;
  }
  context.messageDialog = clazz;
  await context.messageDialog.render();
  await context.observeColleagueAndTrigger(context.messageDialog, DIALOG, context.messageDialog.name);
  return true;
};

export const displayConfirmation = async (message, action, title, context) => {
  return await displayDialog(new ConfirmationDialog({ "body": message, "action": action, "title": title }), context);
};

export const displayAbout = async (context) => {
  return await displayDialog(new AboutDialogView(ABOUT_CONFIG), context);
};

export const displayErrorMessage = async (message, context) => {
  return await displayDialog(new ErrorDialogView({ "el": DIALOG_EL, "body": message }), context);
};

export const displayMessage = async (message, title, context) => {
  return await displayDialog(new MessageDialogView({ "el": DIALOG_EL, "body": message, "title": title }), context);
};

export const displayNotification = async (message, title, context) => {
  if (context.notify) {
    await context.notify.remove();
    context.notify = null;
  }
  context.notify = new Notification({
    "el": DIALOG_EL,
    "body": message,
    "title": title
  });
  return await context.notify.render();
};
