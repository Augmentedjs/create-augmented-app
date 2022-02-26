import { Header as BaseHeader } from "presentation-components";

const AVATAR_IMAGE = "avatar",
      MENU = "menu",
      PROGRESS = "progress",
      NAME = "header",
      MOUNT_POINT = `#${NAME}`,
      LOGO = "logo",
      USER = "user";

class Header extends BaseHeader {
  constructor(options = {}) {
    options.el = MOUNT_POINT;
    options.name = NAME;
    super(options);
    this.template = /*html*/
     `<div class="username" id="${USER}"></div>
      <figure data-${this.name}="${LOGO}" data-click="${LOGO}" class="${LOGO}" id="${AVATAR_IMAGE}"></figure>
      <h1 class="appname">${APP_TITLE}</h1>
      <nav id="${MENU}"></nav>
      <div id="${PROGRESS}" class="${PROGRESS}"></div>`;
  };

  async render() {
    await super.render();
    return this;
  };

  async logo(e) {
    e.preventDefault();


    return this;
  };
};

export default Header;