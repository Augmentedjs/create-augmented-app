import { Header as BaseHeader } from "presentation-components";
import Logger from "../logger/logger.js";
import { APP_NAME } from "../constants.js";

const PROFILE = "profile";
const AVATAR_IMAGE = "avatar";

class Header extends BaseHeader {
  constructor(options) {
    super({
      "el": "#header",
      "name": "header"
    });
    this.template = `
      <figure class="logo" id="${AVATAR_IMAGE}">
      </figure>
      <h1>${APP_NAME}</h1>
    `;
  };
};

export default Header;
