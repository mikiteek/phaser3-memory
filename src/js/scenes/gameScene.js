import Phaser from "phaser";
import config from "../config";
import background from "../../images/background.png";
import card from "../../images/card.png";

export class GameScene extends Phaser.Scene {
  constructor() {
    super({
      key: "GameScene"
    });
  }

  preload() {
    this.load.image("background", background);
    this.load.image("card", card);
  }

  getCardsPositions() {
    const positions = [];
    // get card's texture (size)
    const cardTexture = this.textures.get("card").getSourceImage();
    const cardWidth = cardTexture.width + 4; // with gap 4px
    const cardHeight = cardTexture.height + 4;
    // gap for centering cards
    const offsetX = (config.width - cardWidth * config.cols) / 2;
    const offsetY = (config.height - cardHeight * config.rows) / 2;

    for (let row = 0; row < config.rows; row++) {
      for (let col = 0; col < config.cols; col++) {
        positions.push({
          x: offsetX + col * cardWidth,
          y: offsetY + row * cardHeight,
        });
      }
    }
    return positions;
  }

  create() {
    const {width, height} = this.sys.game.config;
    const bgImage = this.add.sprite(width / 2, height / 2, "background");

    const positions = this.getCardsPositions();
    positions.forEach(({x, y}) => {
      this.add.sprite(x, y, "card").setOrigin(0,0);
    })
  }
}