import {Game} from "./js/game";
import config from "./js/config";

window.addEventListener("load", () => {
  const game = new Game(config);
});