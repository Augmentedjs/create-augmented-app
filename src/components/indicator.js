import { ProgressIndicator as BaseProgressIndicator } from "presentation-indicators";
import { SET_IN_PROGRESS } from "../messages.js";

const MOUNT_POINT = "#progress";

class ProgressIndicator extends BaseProgressIndicator {
  constructor() {
    super({
      "el": MOUNT_POINT
    });

    this.on(SET_IN_PROGRESS, (status) => {
      if (status === true) {
        this.setInProgress();
      } else {
        this.setComplete();
      }
    });
  };
};

export default ProgressIndicator;
