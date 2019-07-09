import { DirectiveView } from "presentation-decorator";

const MOUNT_POINT = "#main";

class HomeView extends DirectiveView {
  constructor() {
    super({
      "el": MOUNT_POINT,
      "name": "homeview",
      "style": "view",
      "template": "<p>Welcome to Augmented.js Next!</p>"
    });
  };
};

export default HomeView;
