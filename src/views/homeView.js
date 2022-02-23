import { DirectiveView } from "presentation-decorator";
const MOUNT_POINT = "#main";

class HomeView extends DirectiveView {
  constructor() {
    super({
      "el": MOUNT_POINT,
      "name": "homeview",
      "style": "view",
      "template": /*html*/`<h1>Welcome!</h1>`
    });
  };

  async render() {
    return await super.render();
  };
};

export default HomeView;
