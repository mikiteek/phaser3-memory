import {Game} from "./js/game";
import config from "./js/config";
import "./styles/index.scss";

window.addEventListener("load", () => {
  const game = new Game(config);
});