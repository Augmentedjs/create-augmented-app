import { HamburgerMenu as BaseHamburgerMenu } from "presentation-navigation";
import Application from "../application/application.js";
import { APP_NAME } from "../constants.js";

const MOUNT_POINT = "#menu";

class HamburgerMenu extends BaseHamburgerMenu {
  constructor() {
    super({
      "el": MOUNT_POINT,
      "name": "appmenu",
      "title": APP_NAME
    });

    this.addItem(
      "home",
      "home",
      "home",
      "Home"
    );

    this.addSpacer();

    this.addItem(
      "about",
      "about",
      "info",
      "About"
    );
  };

  about() {
    Application.about();
    this.toggle();
  };

  home() {
    Application.navigate("home");
    this.toggle();
  };
};

export default HamburgerMenu;
