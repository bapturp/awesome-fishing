import Graphic from "./graphic.js";

export default class Fish extends Graphic {
    constructor(canvas, ctx) {
        super(canvas, ctx);
        this.imageRight = document.getElementById('fish1-right');
        this.imageLeft = document.getElementById('fish1-left');
        this.directionPositive = null;
        this.randomizeDirection();
        this.x = null;
        this.randomizePosition()
        this.width = 30;
        this.height = 30;
        this.y = this.canvas.height + this.height;
    };

    randomizeDirection() {
        if (Math.random() > .5) {
            this.directionPositive = true;
        } else {
            this.directionPositive = false;
        };
    };

    randomizePosition() {
        const min = Math.ceil(5);
        const max = Math.floor(this.canvas.width - 5);
        this.x = Math.floor(Math.random() * (max - min + 1)) + min;
    };

    draw() {
        let image = ""
        if (this.directionPositive) {
            image = this.imageRight
        } else {
            image = this.imageLeft
        };

        this.ctx.drawImage(image, this.x, this.y, this.width, this.height);
    };

    move() {
        if (this.directionPositive) {
            if (this.x < this.canvas.width - this.width - 20) {
                this.x += 4;
            } else {
                this.directionPositive = false; // flip the image
            };
        } else {
            if (this.x > 0 + this.width - 20) {
                this.x -= 4;
            } else (
                this.directionPositive = true
            );
        };
        this.y -= 2;
        console.log(this.x, this.y)
    };
};
