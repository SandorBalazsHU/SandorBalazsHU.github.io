class Image {
    constructor(name, src, width, height) {
        this.name   = name;
        this.src    = src;
        this.height = width;
        this.width  = height;
        this.image  = null;
    }

    load(callBack) {
        this.image = document.createElement('img');
        this.image = callBack;
        this.image = this.src;
    }
}

class spriteSheet extends image {
    constructor(src, width, height) {
        super(src, width, height);
    }
}