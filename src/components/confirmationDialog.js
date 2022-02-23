import { ConfirmationDialogView } from "presentation-dialogs";
import { DIALOG_EL } from "../constants.js";
import { CONFIRMED } from "../messages.js";

class ConfirmationDialog extends ConfirmationDialogView {
  constructor(options = {}) {
    options.el = DIALOG_EL;
    options.style = "confirm";
    options.name = "confirm";
    super(options);

    this.action = (options.action) ? options.action : "Unknown";
  };

  yes(e) {
    e.preventDefault();
    this.sendMessage(CONFIRMED, this.action);
    return this.close();
  };

  no(e) {
    e.preventDefault();
    return this.close();
  };
};

export default ConfirmationDialog;
