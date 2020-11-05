import Phaser from "phaser";
import config from "../config";
import Card from "../objects/card";
import background from "../../images/background.png";
import card from "../../images/card.png";
import card1 from "../../images/card1.png";
import card2 from "../../images/card2.png";
import card3 from "../../images/card3.png";
import card4 from "../../images/card4.png";
import card5 from "../../images/card5.png";

export class GameScene extends Phaser.Scene {
  constructor() {
    super({
      key: "GameScene"
    });
  }

  preload() {
    this.load.image("background", background);
    this.load.image("card", card);
    this.load.image("card1", card1);
    this.load.image("card2", card2);
    this.load.image("card3", card3);
    this.load.image("card4", card4);
    this.load.image("card5", card5);
  }

  create() {
    this.createBackground();
    this.createCards();
  }

  createBackground() {
    const {width, height} = this.sys.game.config;
    const bgImage = this.add.sprite(width / 2, height / 2, "background");
  }

  createCards() {
    this.cards = [];
    const positions = this.getCardsPositions();
    // shuffling cards
    Phaser.Utils.Array.Shuffle(positions);

    config.cards.forEach(value => {
      for (let i = 0; i < 2; i++) {
        this.cards.push(new Card(this, value, positions.pop()));
      }
    })
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
}