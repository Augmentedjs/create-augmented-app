import "material-icons";
import "presentation-css";
import "./styles/main.scss";
import initializeApp from "./setup/initializeApp.js";

initializeApp();
window.addEventListener("load", (event) => {
  console.debug("DOM fully loaded and parsed, and painted, swapping fonts");
  /* fonts */
  import("typeface-libre-franklin");
  import("typeface-roboto");
});
