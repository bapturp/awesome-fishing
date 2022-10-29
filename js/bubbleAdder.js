import Bubble from "./bubble.js";

const bubbleAdder = (canvas, ctx) => {
    let arrPositionY = [400, 500, 600, 700, 800, 900, 1000, 1100, 1200, 1300, 1400, 1500]

    return arrPositionY.map(e => new Bubble(canvas, ctx, e));
};

export default bubbleAdder;
