import Graphic from "./graphic.js";

export default class Depth extends Graphic {
    constructor(canvas, ctx, maxDepth) {
        super(canvas, ctx);
        this.maxDepth = maxDepth
        this.lightnessMax = 60;
        this.lightnessMin = 15;
        this.lightnessDelta = 5;
        this.lightnessTop = null;
        this.lightnessBottom = null
    };

    draw() {

        const gradiant = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height)

        gradiant.addColorStop(0, `hsl(244, 56%, ${this.lightnessTop}%)`);

        gradiant.addColorStop(1, `hsl(244, 56%, ${this.lightnessBottom}%)`);

        this.ctx.fillStyle = gradiant;

        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    };

    move(currentDepth) {
        this.lightnessTop = Math.floor(currentDepth / this.maxDepth * - (this.lightnessMax - this.lightnessMin) + this.lightnessMax);
        this.lightnessBottom = this.lightnessTop - this.lightnessDelta;
    };
};
