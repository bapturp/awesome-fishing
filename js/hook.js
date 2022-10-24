import Graphic from "./graphic.js";

export default class Hook extends Graphic {
    constructor(canvas, ctx) {
        super(canvas, ctx);
        this.image = document.getElementById('hook');
        this.width = 50;
        this.height = 50;
        this.x = this.canvas.width / 2 - this.width / 2;
        this.y = this.canvas.height / 2 - this.height / 2;
    };

    draw() {
        this.ctx.drawImage(this.image, this.x, this, y, this.width, this.height);
    };
};

