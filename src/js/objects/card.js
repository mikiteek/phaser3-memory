import {GameObjects} from "phaser";

class Card extends GameObjects.Sprite {
  constructor(scene, value) {
    super(scene, 0, 0, "card");
    this.scene = scene;
    this.value = value;
    // this.setOrigin(0.5, 0.5);
    this.scene.add.existing(this);

    // execute check for events for this object
    this.setInteractive();
    this.opened = false;
  }

  open() {
    this.opened = true;
    this.flip("card" + this.value);
  }
  close() {
    this.opened = false;
    this.setTexture("card");
  }
  flip(texture) {
    // for tween animation
    this.scene.tweens.add({
      targets: this,
      scaleX: 0,
      ease: "Linear",
      duration: 150,
      onComplete: () => {
        this.show(texture);
      }
    });
  }
  show(texture) {
    this.setTexture(texture);
    this.scene.tweens.add({
      targets: this,
      scaleX: 1,
      ease: "Linear",
      duration: 150,
    });
  }
}

export default Card;