import { Notification, ErrorDialogView, MessageDialogView } from "presentation-dialogs";
import AboutDialog from "../../components/aboutDialog.js";
import { DIALOG_EL } from "../../constants.js";

const displayDialog = async (clazz, context) => {
  if (context.messageDialog) {
    await context.messageDialog.remove();
    context.messageDialog = null;
  }
  context.messageDialog = clazz;
  await context.messageDialog.render();
  return true;
};

export const displayAbout = async (context) => {
  return displayDialog(new AboutDialog(), context);
};

export const displayErrorMessage = async (message, context) => {
  return displayDialog(new ErrorDialogView({"el": DIALOG_EL, "body": message }), context);
};

export const displayMessage = async (message, title, context) => {
  return displayDialog(new MessageDialogView({ "el": DIALOG_EL, "body": message, "title": title }), context);
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
  await context.notify.render();
};
