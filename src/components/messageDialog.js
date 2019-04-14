import { AlertDialogView } from "presentation-components";

class MessageDialog extends AlertDialogView {
  constructor(options) {
    if (!options) {
      options = {}
    };
    if (!options.buttons) {
      options.buttons = {};
    }
    options.buttons.cancel = "ok";
    options.style = "alert";
    super(options);
  }
};

export default MessageDialog;
