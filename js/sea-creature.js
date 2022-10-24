import Graphic from "./graphic";


export default class seaCreature extends Graphic {
    constructor(canvas, ctx) {
        super(canvas, ctx);

    };

    draw() {
        this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    };

    move() {

    };
};
