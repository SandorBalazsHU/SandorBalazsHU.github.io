class Entity {
    constructor(x, y) {
        this.x              = x;
        this.y              = y;
        this.images         = new Map();
        this.sounds         = new Set();
        this.events         = new Map();
        this.animation      = new Map();
        this.animationState = 0;
    }

    load(callBack) {
        for (let [name, magei] of this.images) {
            image.load(callBack(this));
        }
        for (let [name, sound] of this.sounds) {
            sound.load(callBack(this));
        }
        return this.images.size + this.sounds.size;
    }

    draw(game) {
        var spriteSheet = this.animation.get("spriteSheet");
        game.drawImage(this.images.get(spriteSheet),
        spriteSheet[this.animation]["x"], spriteSheet[this.animation]["y"],
        spriteSheet[this.animation]["w"], spriteSheet[this.animation]["h"], 
        this.x, this.y, 90, 124);
    }
    move() {

    }
    event(event) {

    }
    animate() {

    }
    hit() {

    }
    getImgX() {
    }
    getImgY() {
    }
    getWidth() {
    }
    getHeight() {
    }
}

class diynamicEntity {

}

class AnimatedEventDrivenDynamicEntity {
    
}