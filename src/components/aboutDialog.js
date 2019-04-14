import { DialogView } from "presentation-components";
import { APP_NAME } from "../constants.js";

class AboutDialog extends DialogView {
  constructor() {
    super({
      "buttons": {
        "cancel": "cancel"
      },
      "style": "bigForm about",
      "name": "about",
      "body": `
        <h2></h2>
      `,
      "title": `About ${APP_NAME}`
    });
  };
};

export default AboutDialog;
