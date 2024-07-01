class Feed {
  constructor(game) {
    this.game = game;
    this.feedWidth = $(".feed").width();
    this.feedHeight = $(".feed").height();
  }

  getRandomCoordinate(max, size) {
    return Math.floor(Math.random() * (max - size));
  }

  update() {
    this.randomX = this.getRandomCoordinate(
      this.game.gameAreaX,
      this.feedWidth
    );
    this.randomY = this.getRandomCoordinate(
      this.game.gameAreaY,
      this.feedHeight
    );
  }
  getPosition() {
    this.feedX = this.randomX;
    this.feedY = this.randomY;
    return { x: this.feedX, y: this.feedY };
  }
  draw() {
    $(".feed").css({
      left: this.randomX + "px",
      top: this.randomY + "px",
      position: "absolute",
      display: "block",
    });
  }
}

export default Feed;
