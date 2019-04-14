import { AlertDialogView } from "presentation-components";

class ErrorDialog extends AlertDialogView {
  constructor(options) {
    if (!options) {
      options = {}
    };
    if (!options.buttons) {
      options.buttons = {};
    }
    options.buttons.cancel = "ok";
    options.style = "error alert";
    options.title = "An Error Occurred! 😞"
    super(options);
  }
};

export default ErrorDialog;
