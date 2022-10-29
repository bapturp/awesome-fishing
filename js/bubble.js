import Graphic from "./graphic.js";

export default class Bubble extends Graphic {
    constructor(canvas, ctx, positionY) {
        super(canvas, ctx);

        this.image = document.getElementById('bubble')
        this.x = null
        this.randomizePositionX();

        this.width = 30;
        this.height = 30;

        this.y = positionY;
    };

    randomizePositionX() {
        const min = Math.ceil(5);
        const max = Math.floor(this.canvas.width - 5);
        this.x = Math.floor(Math.random() * (max - min + 1)) + min;
    };

    move(gameDirection) {
        // Y move
        if (gameDirection == 1) {
            this.y -= 1;
        } else if (gameDirection == -1) {
            this.y += 1
        };
    };

    draw() {
        this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        console.log(`Bubble is at x: ${this.x}, y: ${this.y}`)
    };
};
