import {GameScene} from "./scenes/gameScene";

export default {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: 1920,
  height: 1080,
  rows: 2,
  cols: 5,
  scene: [GameScene]
};