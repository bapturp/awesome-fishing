// Base class for all graphic that need to be rendered;

export default class Graphic {
    constructor(canvas, ctx, maxDepth) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.maxDepth = maxDepth;
    };
};