import { ConfirmationDialogView } from "presentation-components";

class ConfirmDialog extends ConfirmationDialogView {
  constructor(options) {
    super(options);
  };

  yes(event) {
    this.close(event);
  };

  no(event) {
    this.close(event);
  };
};

export default ConfirmDialog;
