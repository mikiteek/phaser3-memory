import {GameObjects} from "phaser";

class Card extends GameObjects.Sprite {
  constructor(scene, value) {
    super(scene, 0, 0, "card");
    this.scene = scene;
    this.value = value;
    this.setOrigin(0, 0);
    this.scene.add.existing(this);

    // execute check for events for this object
    this.setInteractive();
    this.opened = false;
  }

  open() {
    this.opened = true;
    this.setTexture("card" + this.value);
  }
  close() {
    this.opened = false;
    this.setTexture("card");
  }
}

export default Card;