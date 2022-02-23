import { DirectiveView } from "presentation-decorator";
import Header from "../components/header.js";
import ProgressIndicator from "../components/indicator.js";
import HamburgerMenu from "../components/hamburger.js";
import { HEADER, SET_INDICATOR, DIALOG } from "../messages.js";

class MainView extends DirectiveView {
  constructor() {
    super({
      "tagName": "article",
      "id": "app",
      "name": "mainview"
    });

    this.template = /*html*/
     `<section id="header" class="header"></section>
      <section id="main" class="main panel"></section>
      <section id="dialogs" class="dialogs"></section>`;

    this._header = new Header();
    if (!this._header) {
      throw new Error("Error creating header!");
    }

    this._menu = new HamburgerMenu();
    if (!this._menu) {
      throw new Error("Error creating hamburger menu!");
    }

    this._indicator = new ProgressIndicator();
    if (!this._indicator) {
      throw new Error("Error creating indicator!");
    }

    this.on(HEADER, (message, data) => {
      // Logger.debug("Message", message, data);
      if (message === SET_INDICATOR) {
        // Logger.debug(`Setting progress - ${data}`);
        if (data === "true" || data === true) {
          this._indicator.setInProgress();
        } else {
          this._indicator.setComplete();
        }
      }
    });
  };

  async render() {
    await super.render();
    let view = await this._header.render();
    if (!view) {
      throw new Error("Error rendering header!");
    }

    view = this._indicator.render();
    if (!view) {
      throw new Error("Error rendering indicator!");
    }

    view = await this._menu.render();
    this.mediator.observeColleagueAndTrigger(view, DIALOG, view.name);
    if (!view) {
      throw new Error("Error rendering hamburger menu!");
    }
    return this;
  };
};

export default MainView;
