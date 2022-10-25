// Awesome Fishing
// (c) Baptiste Dromer 2022

import Depth from './depth.js';
import Fish from './fish.js';
import Hook from './hook.js'

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
        this.gameDirection = 1 // 1 in going down, -1 up
        this.depth = new Depth(this.canvas, this.ctx, this.maxDepth);
        this.hook = new Hook(this.canvas, this.ctx);
        this.fishes = []
        this.createFishes();
        this.orientation = [[null, null, null], [null, null, null]];
        this.createEventListers();
    };

    createFishes() {
        for (let i = 0; i < 10; i++) {
            this.fishes.push(new Fish(this.canvas, this.ctx, this.maxDepth));
        }
    }

    createCanvas() {
        this.canvas = document.getElementById('canvas1');
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.ctx = this.canvas.getContext('2d');
    };

    createSmartphoneEvent() {
        window.addEventListener('deviceorientation', event => {
            if (this.orientation[0][0] == null) {
                this.orientation[0][0] = event.alpha;
                this.orientation[0][1] = event.beta;
                this.orientation[0][2] = event.gamma;
            };

            this.orientation[1][0] = event.alpha;
            this.orientation[1][1] = event.beta;
            this.orientation[1][0] = event.gamma;


            if (this.orientation[0][0] < this.orientation[1][0]) {
                this.hook.moveRight();
            } else if (this.orientation[0][0] > this.orientation[1][0]) {
                this.hook.moveLeft();
            };
            this.orientation.shift();
            this.orientation.push([null, null, null]);
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

        if (typeof DeviceOrientationEvent.requestPermission === 'function') {
            DeviceOrientationEvent.requestPermission()
                .then(permissionState => {
                    if (permissionState === 'granted') {
                        this.createSmartphoneEvent()
                    }
                })
                .catch(console.error)
        } else {
            this.createSmartphoneEvent()
        };
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
        if (this.currentDepth === this.maxDepth) {
            this.gameDirection = -1; // revert game direction
        }

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

    }

    draw() {
        this.depth.move(this.currentDepth)
        this.depth.draw();
        this.hook.draw();
        this.fishes.forEach(e => {
            e.move(this.gameDirection);
            e.draw();
        })
        return;
    };

};


// start the game
window.addEventListener('load', () => {
    const game = new Game();
    game.startGame();
});

