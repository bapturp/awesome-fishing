import Fish from "./fish.js";

// const fishAdder = (canvas, ctx, number, minDepth, maxDepth) => {
//     let fishArr = []
//     let interval = []
//     let param = 1000;

//     for (let i = 0; i <= maxDepth - minDepth; i += 1000) {
//         interval.push(i)
//     }

//     interval = interval.map(e => Math.log(e / param + 1) / Math.log((maxDepth - minDepth) / param + 1) * (maxDepth - minDepth) + minDepth)

//     for (let i = 0; i < number; i++) {
//         fishArr.push(new Fish(canvas, ctx, maxDepth, yPosition));
//     };

//     return fishArr
// };

const fishAdder = (canvas, ctx, maxDepth, hook) => {
    let arrPositionY = [600, 700, 800, 850, 900, 1000, 1100, 1200, 1300, 1400]

    return arrPositionY.map(e => new Fish(canvas, ctx, maxDepth, e, hook));
};

export default fishAdder;
