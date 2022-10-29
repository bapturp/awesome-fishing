import Graphic from "./graphic.js";

export default class Fish extends Graphic {
    constructor(canvas, ctx, maxDepth, positionY, hook) {
        super(canvas, ctx, maxDepth);

        this.imageRight = document.getElementById('fish1-right');
        this.imageLeft = document.getElementById('fish1-left');
        this.imageUprightRight = document.getElementById('fish1-upright-right');
        this.imageUprightLeft = document.getElementById('fish1-upright-left');
        this.directionPositive = null;
        this.x = null;
        this.randomizeDirection();
        this.randomizePositionX();
        this.width = 30;
        this.height = 30;
        this.y = positionY;
        this.hook = hook;
        this.isHooked = false;
        this.collisionCoefReducer = .2
        this.hookOffset = null;
        this.getHookOffset()
    };

    getHookOffset() {
        this.hookOffset = Math.random() * 20 - 10
    }

    randomizeDirection() {
        if (Math.random() > .5) {
            this.directionPositive = true;
        } else {
            this.directionPositive = false;
        };
    };

    randomizePositionX() {
        const min = Math.ceil(5);
        const max = Math.floor(this.canvas.width - 5);
        this.x = Math.floor(Math.random() * (max - min + 1)) + min;
    };

    randomizePositionY() {
        // not in use
        const min = this.canvas.height / (1 / 3) + this.height
        const max = this.maxDepth / 2;
        this.y = Math.floor(Math.random() * (max - min + 1)) + min;
    };

    draw() {
        let image = null;

        if (this.directionPositive && this.isHooked) {
            image = this.imageUprightRight
        } else if (!this.directionPositive && this.isHooked) {
            image = this.imageUprightLeft
        } else if (this.directionPositive) {
            image = this.imageRight
        } else {
            image = this.imageLeft
        };
        console.log(`Fish is at x: ${this.x}, y: ${this.y}`)
        this.ctx.drawImage(image, this.x, this.y, this.width, this.height);
    };

    move(gameDirection) {
        if (this.isHooked) {
            this.moveWithHook();
            return;
        };

        // X move
        if (this.directionPositive) {
            if (this.x < this.canvas.width - this.width - 20) {
                this.x += 4;
            } else {
                this.directionPositive = false; // flip the image
            };
        } else {
            if (this.x > 0 + this.width - 20) {
                this.x -= 4;
            } else (
                this.directionPositive = true
            );
        };

        // Y move
        if (gameDirection == 1) {
            this.y -= 2;
        } else if (gameDirection == -1) {
            this.y += 2
        };
    };

    moveWithHook() {
        this.y = this.hook.y + this.hook.height
        this.x = this.hook.x + (this.hook.width / 2) + this.hookOffset
    };

    topEdge() {
        return this.y + this.collisionCoefReducer * this.height;
    };

    leftEdge() {
        return this.x + this.collisionCoefReducer * this.width;
    };

    bottomEdge() {
        return this.y + this.height - this.collisionCoefReducer * this.height;
    };

    rightEdge() {
        return this.x + this.width - this.collisionCoefReducer * this.width;
    };
};
