import Graphic from "./graphic.js";

export default class Hook extends Graphic {
    constructor(canvas, ctx) {
        super(canvas, ctx);
        this.image = document.getElementById('hook');
        this.width = 50;
        this.height = 50;
        this.x = this.canvas.width / 2 - this.width / 2;
        this.y = this.canvas.height / 2 - this.height / 2;
        this.collisionCoefReducer = 0.2;
        this.moveSpeed = 10;
    };

    drawLine() {
        this.ctx.setLineDash([5, 15]);
        this.ctx.lineWidth = 2;
        this.ctx.strokeStyle = 'white'
        this.ctx.beginPath();
        this.ctx.moveTo(this.x + this.width / 2, 0);
        this.ctx.lineTo(this.x + this.width / 2, this.y)
        this.ctx.closePath();
        this.ctx.stroke();
    }

    draw() {
        this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        this.drawLine()
    };

    moveRight() {
        if (this.x >= this.canvas.width - this.width - 5) return;

        this.x += this.moveSpeed;
    };

    moveLeft() {
        if (this.x <= 5) return;

        this.x -= this.moveSpeed;
    };

    topEdge() {
        return this.y + this.collisionCoefReducer * this.height;
    };

    leftEdge() {
        return this.x + this.collisionCoefReducer * this.width;
    };

    bottomEdge() {
        return this.y + this.height - this.collisionCoefReducer * this.height;
    };

    rightEdge() {
        return this.x + this.width - this.collisionCoefReducer * this.width;
    };
};
