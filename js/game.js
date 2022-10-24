// Awesome Fishing
// (c) Baptiste Dromer 2022

import Depth from './depth.js';
import Hook from './hook.js'

const GAME_SPEED = 60;

class Game {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.createCanvas();
        this.lastRenderTime = 0;
        this.gameOver = false;
        this.lastRenderTime = 0;
        this.depth = new Depth(this.canvas, this.ctx);
        this.hook = new Hook(this.canvas, this.ctx);
        this.createEventListers();
    };

    createCanvas() {
        this.canvas = document.getElementById('canvas1');
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.ctx = this.canvas.getContext('2d');
    };

    createEventListers() {
        document.addEventListener('keydown', event => {
            switch (event.key) {
                case 'ArrowLeft':
                    this.hook.moveLeft();
                    break;
                case 'ArrowRight':
                    this.hook.moveRight();
                    break;
            };
        });
        return;
    };

    startGame(currentTime) {
        if (this.gameOver) {
            window.location = '/';
        };

        // https://stackoverflow.com/questions/48816441/how-to-use-requestanimationframe-inside-a-class-object
        window.requestAnimationFrame(this.startGame.bind(this));

        let secondsSinceLastRender = (currentTime - this.lastRenderTime) / 1000;

        if (secondsSinceLastRender < 1 / GAME_SPEED) return;

        this.lastRenderTime = currentTime;

        this.update();
        this.draw();
    };

    update() {

        return;
    };

    draw() {
        this.depth.draw();
        this.hook.draw();

        return;
    };

};


// start the game
window.addEventListener('load', () => {
    const game = new Game();
    game.startGame();
});

