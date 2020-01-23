import { Header as BaseHeader } from "presentation-components";
import { APP_NAME } from "../constants.js";

const MENU = "menu";
const PROGRESS = "progress";

class Header extends BaseHeader {
  constructor(options) {
    if (!options) {
      options = {};
    }
    options.el = "#header";
    options.name = "header";
    super(options);
    this.template = /*HTML*/`
      <nav id="${MENU}"></nav>
      <h1 class="appname">${APP_NAME}</h1>
      <div class="user" id="user"></div>
      <div id="${PROGRESS}" class="progress"></div>
    `;
  };
};

export default Header;
