import { Application } from "presentation-application";
import Router from "../router/router.js";

const app = new Application({
  "name": APP_NAME,
  "router": new Router(),
  "title": APP_TITLE
});

export default app;
