class Sound {
    constructor(name, src) {
        this.name   = name;
        this.src    = src;
        this.sound  = null;
    }
    
    load(callBack) {
        this.sound       = document.createElement('audio');
        audio.oncanplay  = callBack;
        sound.src        = this.src;
    }
}