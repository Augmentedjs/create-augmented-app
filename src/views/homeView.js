import { DirectiveView } from "presentation-decorator";

const MOUNT_POINT = "#main";

class HomeView extends DirectiveView {
  constructor() {
    super({
      "el": MOUNT_POINT,
      "name": "homeview",
      "style": "view",
      "template": "<p>Hello</p>"
    });
  };
};

export default HomeView;
