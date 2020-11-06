import Phaser from "phaser";
import config from "../config";
import Card from "../objects/card";
import background from "../../images/background.png";
import cardImg from "../../images/card.png";
import cardImg1 from "../../images/card1.png";
import cardImg2 from "../../images/card2.png";
import cardImg3 from "../../images/card3.png";
import cardImg4 from "../../images/card4.png";
import cardImg5 from "../../images/card5.png";

export class GameScene extends Phaser.Scene {
  constructor() {
    super({
      key: "GameScene"
    });
  }

  preload() {
    this.load.image("background", background);
    this.load.image("card", cardImg);
    this.load.image("card1", cardImg1);
    this.load.image("card2", cardImg2);
    this.load.image("card3", cardImg3);
    this.load.image("card4", cardImg4);
    this.load.image("card5", cardImg5);
  }

  create() {
    this.createBackground();
    this.createCards();
    this.start();
  }

  start() {
    this.openedCard = null;
    this.openedCardsCount = 0;
    this.initCards();
  }

  initCards() {
    const positions = this.getCardsPositions();

    this.cards.forEach(card => {
      const position = positions.pop();
      card.close();
      card.setPosition(position.x, position.y);
    });
  }

  createBackground() {
    const {width, height} = this.sys.game.config;
    const bgImage = this.add.sprite(width / 2, height / 2, "background");
  }

  createCards() {
    this.cards = [];

    config.cards.forEach(value => {
      for (let i = 0; i < 2; i++) {
        this.cards.push(new Card(this, value));
      }
    });
    // handle event click
    this.input.on("gameobjectdown", this.onCardClicked, this);
  }

  onCardClicked(pointer, card) {
    if (card.opened) {
      return false;
    }
    if (this.openedCard) {
      // have opened card
      if (this.openedCard.value === card.value) {
        // remember card
        this.openedCard = null;
        ++this.openedCardsCount;
      }
      else {
        // hidden prev
        this.openedCard.close();
        this.openedCard = card;
      }
    }
     else {
       // do not exist opened card
      this.openedCard = card;
    }
    card.open();
     if (this.openedCardsCount === this.cards.length / 2) {
       this.start();
     }
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
    return Phaser.Utils.Array.Shuffle(positions); // shuffling cards
  }
}