// extends graphic and add depth properties

import Graphic from "./graphic.js";

export default class seaCreature extends Graphic {
    constructor(canvas, ctx, maxDepth) {
        super(canvas, ctx, maxDepth);
    };
};
