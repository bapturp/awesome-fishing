// Awesome Fishing
// (c) Baptiste Dromer 2022

// import inputHandler from "./input-handler";

import Hook from './hook.js'

const GAME_SPEED = 60;

class Game {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.createCanvas();
        this.createEventListers();
        this.lastRenderTime = 0;
        this.gameOver = false;
    };

    createCanvas() {
        this.canvas = document.getElementById('canvas1');
        this.canvas.width = 720;
        this.canvas.height = 1300;
        this.ctx = this.canvas.getContext('2d');
    };

    createEventListers() {
        return;
    };

    run(currentTime) {
        if (this.gameOver) {
            window.location = '/';
        };

        window.requestAnimationFrame(this.run);

        let secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;

        if (secondsSinceLastRender < 1 / GAME_SPEED) return;

        lastRenderTime = currentTime;

        this.update();
        this.draw();
    };

    update() {
        return;
    };

    draw() {
        return;
    };

};


// start the game
window.addEventListener('load', () => {
    const game = new Game();
    game.run();
});

window.requestAnimationFrame(main);
