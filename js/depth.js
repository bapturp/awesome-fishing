import Graphic from "./graphic.js";

export default class Depth extends Graphic {
    constructor(canvas, ctx, frame) {
        super(canvas, ctx);
        this.frame = frame;
        this.blue = 255
        this.counter = 1000
    };

    draw() {
        if (this.blue > 0) {
            this.blue = Math.round(this.counter * 200 / 1000)
        };
        const gradiant = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);
        gradiant.addColorStop(0, `rgb(0 160 ${this.blue})`);
        gradiant.addColorStop(1, `rgb(0 160 ${this.blue + 55})`);
        this.ctx.fillStyle = gradiant;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.counter--;
    };
};