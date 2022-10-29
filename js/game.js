// Awesome Fishing
// (c) Baptiste Dromer 2022

import Depth from './depth.js';
import Hook from './hook.js';
import fishAdder from './fishAdder.js';
import bubbleAdder from './bubbleAdder.js';
import Ui from './ui.js';

const startButton = document.getElementById('start-button');
const startScreen = document.getElementById('start-screen');
const gameBoard = document.getElementById('game-board');
const scoreScreen = document.getElementById('score-screen');
const restartButton = document.getElementById('restart-button')
const reachedDepthEl = document.querySelector('#reached-depth span')
const caughtFishesEl = document.querySelector('#caught-fishes span')

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
        this.reachedDepth = 0
        this.gameDirection = 1 // 1 is going down, -1 up
        this.depth = new Depth(this.canvas, this.ctx, this.maxDepth);
        this.hook = new Hook(this.canvas, this.ctx);
        this.bubbles = bubbleAdder(this.canvas, this.ctx);
        this.ui = new Ui(this.canvas, this.ctx);
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
                this.hook.moveRight();
            } else if (event.rotationRate.gamma < 5) {
                this.hook.moveLeft();
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

        if (typeof DeviceMotionEvent === 'undefined') {
            this.startGame();
            return
        };

        if (typeof DeviceMotionEvent.requestPermission === 'function') {
            DeviceMotionEvent.requestPermission()
                .then(permissionState => {
                    if (permissionState === 'granted') {
                        this.createSmartphoneEvent();

                    };
                })
                .catch(console.error)
                .finally(this.startGame)

        } else {
            this.createSmartphoneEvent();
            this.startGame();
        };
    };

    startGame(timeStamp) {
        if (this.gameOver) {
            this.endGame()
            return cancelAnimationFrame(timeStamp);
        };
        // https://stackoverflow.com/questions/48816441/how-to-use-requestanimationframe-inside-a-class-object

        requestAnimationFrame(this.startGame.bind(this));

        // requestAnimationFrame((timeStamp) => this.startGame(timeStamp));

        let secondsSinceLastRender = (timeStamp - this.lastRenderTime) / 1000;

        if (secondsSinceLastRender < 1 / GAME_SPEED) return;

        this.lastRenderTime = timeStamp;

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

        if (this.currentDepth > this.reachedDepth) {
            this.reachedDepth = this.currentDepth;
        }

        if (this.gameDirection === -1 && this.currentDepth === 0) {
            this.gameOver = true;
        }
    };

    endGame() {
        gameBoard.classList.add('hidden');
        scoreScreen.classList.remove('hidden');
        reachedDepthEl.textContent = Math.floor(this.reachedDepth / 10 * -1);
        caughtFishesEl.textContent = this.fishes.reduce((acc, fish) => {
            if (fish.isHooked) {
                return acc + 1;
            };
            return acc;
        }, 0)
    };

    draw() {
        this.depth.move(this.currentDepth);
        this.depth.draw();
        this.bubbles.forEach(e => {
            e.move(this.gameDirection);
            e.draw();
        });
        this.fishes.forEach(e => {
            e.move(this.gameDirection);
            e.draw();
        });
        this.hook.draw();
        this.ui.draw(this.currentDepth);
        return;
    };
};

const start = () => {

    startScreen.classList.add('hidden');
    gameBoard.classList.remove('hidden');
    scoreScreen.classList.add('hidden')
    const game = new Game();

}

// start the game
startButton.addEventListener('click', start);
restartButton.addEventListener('click', start);
