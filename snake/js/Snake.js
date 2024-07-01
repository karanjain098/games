class Snake {
  constructor(game) {
    this.game = game;
    this.initialize();
  }

  initialize() {
    this.gameWidth = this.game.gameAreaX;
    this.gameHeight = this.game.gameAreaY;
    this.snakeWidth = $(".snake").width();
    this.snakeHeight = $(".snake").height();
    this.snakeX = 150;
    this.snakeY = 400;
    this.snakeSpeed = 20;
    this.direction = "right";
    this.gameOver = false;
    this.body = [{ x: this.snakeX, y: this.snakeY }];
  }

  checkGameOver() {
    const head = this.body[0];
    console.log(head.y + this.snakeHeight);
    if (
      head.x < 0 ||
      head.x + this.snakeWidth > this.gameWidth ||
      head.y < 0 ||
      head.y + this.snakeHeight > this.gameHeight
    ) {
      this.gameOver = true;
      return true;
    }
    return false;
  }

  moveSnake() {
    if (this.checkGameOver()) return;
    const head = { ...this.body[0] };
    switch (this.direction) {
      case "up":
        head.y -= this.snakeSpeed;
        break;
      case "down":
        head.y += this.snakeSpeed;
        break;
      case "right":
        head.x += this.snakeSpeed;
        break;
      case "left":
        head.x -= this.snakeSpeed;
        break;
      default:
        break;
    }
    this.body.unshift(head);

    this.body.pop();
    this.updateSnakePosition();
  }
  getRandomColor() {
    let randomNumber = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += randomNumber[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  updateSnakePosition() {
    $(".snake").remove();
    var color = this.getRandomColor();
    this.body.forEach((segment, index) => {
      let style = "";
      if (index == 0) {
        style = "background-color:rebeccapurple;width:30px;height:30px";
      } else {
        style = `background-color:${color};width:20px;height:20px`;
      }
      const segmentDiv = $(`<div class="snake" style=${style}></div>`).css({
        left: segment.x + "px",
        top: segment.y + "px",
        position: "absolute",
      });

      $(".game-area").append(segmentDiv);
    });
  }

  grow() {
    const tail = { ...this.body[this.body.length - 1] };
    this.body.push(tail);
    this.updateSnakePosition();
  }

  run(code) {
    switch (code) {
      case "ArrowUp" || "onmouseup":
        if (this.direction !== "down") this.direction = "up";
        break;
      case "ArrowDown":
        if (this.direction !== "up") this.direction = "down";
        break;
      case "ArrowRight":
        if (this.direction !== "left") this.direction = "right";
        break;
      case "ArrowLeft":
        if (this.direction !== "right") this.direction = "left";
        break;
      default:
        break;
    }
  }

  update() {
    this.moveSnake();
  }
}

export default Snake;
