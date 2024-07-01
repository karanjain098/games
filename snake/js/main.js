import Feed from "./Feed.js";
import Snake from "./Snake.js";

class Game {
  constructor() {
    this.initialize();
  }

  initialize() {
    this.gameAreaX = $(".game-area").width();
    this.gameAreaY = $(".game-area").height();
    this.feed = new Feed(this);
    this.snake = new Snake(this);
    this.score = 0;
    this.time = "00:00:00";
    this.gameOver = false;
  }

  checkCollision(snake, feed) {
    const head = snake.body[0];
    return (
      head.x < feed.feedX + feed.feedWidth &&
      head.x + snake.snakeWidth > feed.feedX &&
      head.y < feed.feedY + feed.feedHeight &&
      head.y + snake.snakeHeight > feed.feedY
    );
  }

  update() {
    if (!this.snake.gameOver) {
      this.snake.update();
      this.feed.draw();
      this.feed.getPosition();

      if (this.checkCollision(this.snake, this.feed)) {
        this.score++;
        this.snake.grow();
        $("#scoreValue").text(this.score);
        this.feed.update();
      }
    } else {
      alert("Game Over!");
      if (confirm("restart game")) {
        this.resetGame();
        clearInterval(this.gameInterval);
      }
    }
  }

  draw() {
    this.feed.draw();
    this.feed.update();
  }

  resetGame() {
    this.initialize();
    this.score = 0;
    var startTime = Date.now();
    $("#scoreValue").text(this.score);
    $("#timeValue").text(this.time);
    this.draw();
    this.gameInterval = setInterval(() => {
      this.time = Date.now() - startTime;
      let totalSeconds = Math.floor(this.time / 1000);
      let hours = Math.floor(totalSeconds / 3600);
      let minutes = Math.floor((totalSeconds % 3600) / 60);
      let seconds = totalSeconds % 60;
      let formattedHours = hours.toString().padStart(2, "0");
      let formattedMinutes = minutes.toString().padStart(2, "0");
      let formattedSeconds = seconds.toString().padStart(2, "0");

      $("#timeValue").text(
        `${formattedHours}:${formattedMinutes}:${formattedSeconds}`
      );
      this.update();
    }, 100);

    $(document).keydown((event) => {
      this.snake.run(event.key);
    });
  }

  startGame() {
    this.resetGame();
  }
}

$(document).ready(function () {
  const game = new Game();
  game.startGame();
});
