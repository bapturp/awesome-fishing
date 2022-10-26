let depth = 10000
let min = 1000
let param = 1000

let interval = []

for (let i = 0; i <= depth - min; i += 1000) {
    interval.push(i);
}

interval = interval.map(e => Math.log(e / param + 1) / Math.log((depth - min) / param + 1) * (depth - min) + min)

console.log(interval)