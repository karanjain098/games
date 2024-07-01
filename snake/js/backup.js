class Snake {
    constructor(game) {
        this.game = game
        this.initialize()
    }

    initialize() {
        this.gameWidth = this.game.gameAreaX;
        this.gameHeight = this.game.gameAreaY;
        this.snakeWidth = $('.snake').width();
        this.snakeHeight = $('.snake').height();
        this.snakeX = 150;
        this.snakeY = 400;
        this.gameOver = false;
        this.snakeSpeed = 20;
        this.direction = 'right';
    }

    checkGameOver() {
        if (
            this.snakeX < 0 ||
            this.snakeX + this.snakeWidth > this.gameWidth ||
            this.snakeY < 0 ||
            this.snakeY + this.snakeHeight > this.gameHeight
        ) {
            this.gameOver = true;
            return true;
        }
        return false;
    }

    moveSnake() {
        if (this.gameOver) {
            return;
        }

        let newX = this.snakeX;
        let newY = this.snakeY;

        switch (this.direction) {
            case 'up':
                newY -= this.snakeSpeed;
                break;
            case 'down':
                newY += this.snakeSpeed;
                break;
            case 'right':
                newX += this.snakeSpeed;
                break;
            case 'left':
                newX -= this.snakeSpeed;
                break;
            default:
                break;
        }

        if (
            newX < 0 ||
            newX > this.gameWidth ||
            newY < 0 ||
            newY > this.gameHeight
        ) {
            this.gameOver = true;
          
            return;
        }

        this.snakeX = newX;
        this.snakeY = newY;

        $('.snake').css({
            left: this.snakeX + 'px',
            top: this.snakeY + 'px',
            position: 'absolute'
        });
    }


    resetGame() {
        if (this.gameOver) {
            this.score = 0

            this.game.draw()
            setInterval(() => {
                this.run();
            }, 100);
        }
    }
    run(code) {

        switch (code) {
            case 'ArrowUp':
                this.direction = 'up';
                break;
            case 'ArrowDown':
                this.direction = 'down';
                break;
            case 'ArrowRight':
                this.direction = 'right';
                break;
            case 'ArrowLeft':
                this.direction = 'left';
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
