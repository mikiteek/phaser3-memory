import {GameScene} from "./scenes/gameScene";

export default {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: 1280,
  height: 720,
  rows: 2,
  cols: 5,
  cards: [1, 2, 3, 4, 5],
  scene: [GameScene]
};