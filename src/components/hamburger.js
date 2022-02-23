import { HamburgerMenu as BaseHamburgerMenu } from "presentation-navigation";
import Application from "../application/application.js";
import { DISPLAY_ABOUT } from "../messages.js";
const MOUNT_POINT = "#menu";

class HamburgerMenu extends BaseHamburgerMenu {
  constructor() {
    super({
      "el": MOUNT_POINT,
      "name": "appmenu",
      "title": APP_TITLE
    });

    this.addItem(
      "home",
      "home",
      "home",
      "Home"
    );

    this.addItem(
      "about",
      "about",
      "info",
      "About"
    );
  };

  home() {
    Application.navigate("home");
    this.toggle();
  };

  about() {
    this.sendMessage(DISPLAY_ABOUT);
    this.toggle();
  };
};

export default HamburgerMenu;
