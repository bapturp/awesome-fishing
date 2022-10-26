// Awesome Fishing
// (c) Baptiste Dromer 2022

import Depth from './depth.js';
import Fish from './fish.js';
import Hook from './hook.js';
import fishAdder from './fishAdder.js';

const startButton = document.getElementById('start-button');
const startScreen = document.getElementById('start-screen');
const gameBoard = document.getElementById('canvas1');
const scoreScreen = document.getElementById('score-screen');

const GAME_SPEED = 60;

class Game {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.createCanvas();
        this.lastRenderTime = 0;
        this.gameOver = false;
        this.maxDepth = 500;
        this.currentDepth = 0;
        this.gameDirection = 1 // 1 is going down, -1 up
        this.depth = new Depth(this.canvas, this.ctx, this.maxDepth);
        this.hook = new Hook(this.canvas, this.ctx);
        this.fishes = fishAdder(this.canvas, this.ctx, this.maxDepth, this.hook);
        this.createEventListers();
    };

    createCanvas() {
        this.canvas = document.getElementById('canvas1');
        this.canvas.width = 400;
        this.canvas.height = 900;
        this.ctx = this.canvas.getContext('2d');
    };

    createSmartphoneEvent() {
        window.addEventListener('devicemotion', event => {
            if (event.rotationRate.gamma > 5) {
                this.hook.moveRight()
            } else if (event.rotationRate.gamma < -5) {
                this.hook.moveLeft()
            };
        });
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

        if (typeof DeviceMotionEvent.requestPermission === 'function') {
            DeviceMotionEvent.requestPermission()
                .then(permissionState => {
                    if (permissionState === 'granted') {
                        this.createSmartphoneEvent();
                    };
                })
                .catch(console.error);
        } else {
            this.createSmartphoneEvent();
        };
    };

    startGame(currentTime) {
        if (this.gameOver) {
            this.endGame()
            return cancelAnimationFrame(currentTime);
        };

        // https://stackoverflow.com/questions/48816441/how-to-use-requestanimationframe-inside-a-class-object
        window.requestAnimationFrame(this.startGame.bind(this));

        let secondsSinceLastRender = (currentTime - this.lastRenderTime) / 1000;

        if (secondsSinceLastRender < 1 / GAME_SPEED) return;

        this.lastRenderTime = currentTime;

        this.update();
        this.draw();
    };

    checkCollision(fish, hook) {
        const isInX =
            fish.rightEdge() >= hook.leftEdge() &&
            fish.leftEdge() <= hook.rightEdge();
        const isInY =
            fish.topEdge() <= hook.bottomEdge() &&
            fish.bottomEdge() >= hook.topEdge();
        return isInX && isInY;
    };

    update() {
        this.fishes.forEach(fish => {
            if (this.checkCollision(fish, this.hook)) {
                this.gameDirection = -1;
                fish.isHooked = true;
            };
        });

        if (this.currentDepth === this.maxDepth) {
            this.gameDirection = -1; // revert game direction
        };

        switch (this.gameDirection) {
            case 1:
                this.currentDepth += 1;
                break;
            case -1:
                this.currentDepth -= 1;
                break;
        };

        if (this.gameDirection === -1 && this.currentDepth === 0) {
            this.gameOver = true;
        }
    };

    endGame() {
        gameBoard.hidden = true;
        scoreScreen.hidden = false;
    };

    draw() {
        this.depth.move(this.currentDepth);
        this.depth.draw();
        this.hook.draw();
        this.fishes.forEach(e => {
            e.move(this.gameDirection);
            e.draw();
        });
        return;
    };
};


// start the game
window.addEventListener('load', () => {
    const startButton = document.getElementById('start-button')
    startButton.addEventListener('click', () => {
        startScreen.hidden = true
        gameBoard.hidden = false
        const game = new Game();
        game.startGame();
    })
});
