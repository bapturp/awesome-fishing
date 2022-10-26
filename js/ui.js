import Graphic from "./graphic.js";

export default class Ui extends Graphic {
    constructor(canvas, ctx) {
        super(canvas, ctx);
        this.x = 8;
        this.y = 24;
        this.font = '24px sans-serif';
        this.color = 'white'
    };

    draw(currentDepth) {
        this.ctx.font = this.font;
        this.ctx.fillStyle = this.color;
        this.ctx.fillText(Math.floor(currentDepth / 10 * -1), this.x, this.y);
    };
};
