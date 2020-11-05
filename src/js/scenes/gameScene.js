import Phaser from "phaser";
import background from "../../images/background.png";

export class GameScene extends Phaser.Scene {
  constructor() {
    super({
      key: "GameScene"
    });
  }

  preload() {
    this.load.image("background", background);
  }

  create() {
    const {width, height} = this.sys.game.config;
    const bgImage = this.add.sprite(width / 2, height / 2, "background");
  }
}