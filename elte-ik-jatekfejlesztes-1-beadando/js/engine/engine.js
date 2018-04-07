"use strict";
class Game {
    constructor(background, foreground, eventListener = new EventListener(this)) {
        this.background             = document.getElementById(background);
        this.backgroundContext      = background.getContext('2d');
        this.foreground             = document.getElementById(foreground);
        this.foregroundContext      = foreground.getContext('2d');
        this.staticEntitys          = new Set();
        this.diynamicEntitys        = new Set();
        this.keyListener            = new Map();
        this.mouseListener          = new Map();
        this.costumEventListener    = new Map();
        this.eventListener          = eventListener;
        this.collisionHandler       = new Collision(this);
        this.fileLoader             = new FileLoader(this);
        this.renderLoop             = null;
        this.fps                    = Math.floor(1000/60);
    }

    start() {
        this.fileLoader.load(this, loadFinished);
        if(!this.getSemafor()) {
            this.setSemafor();
            this.render();
        }else{
            new Error("An another engine instance alredy use this canvas!");
        }
    }

    stop() {
        clearInterval(this.renderLoop);
        this.clearSemafor();
    }

    render() {
        for(let entity of game.staticEntitys) entity.draw(this);
        this.renderLoop = setInterval(function() {
            this.eventListener.update();
            this.collisionHandler.update();
            for(let entity of game.diynamicEntitys) entity.draw(this);
        }, this.fps);
    }

    setSemafor() {
        this.background.classList.add("semafor");
        this.foreground.classList.add("semafor");
    }

    getSemafor() {
        return ((this.background.getAttribute("class") == "semafor") || (this.foreground.getAttribute("class") == "semafor"));
    }

    clearSemafor() {
        this.background.classList.remove("semafor");
        this.background.classList.remove("semafor");
    }

    addEntity(entity) {
        if(entity instanceof Entity){
            if(typeof Entity.move === 'function')
            {
                this.diynamicEntitys.add(entity);
            }else{
                this.staticEntitys.add(entity);
            }
            if(typeof Entity.event === 'function')
            {
                if(entity.events.get("key"))   this.keyListener.set(entity, entity.events.get("key"));
                if(entity.events.get("mouse")) this.mouseListener.set(entity, entity.events.get("mouse"));
                if(entity.events.get("event")) this.costumEventListener.set(entity, entity.events.get("event"));
            }
            if(typeof Entity.hit === 'function') collisionHandler.addEntity(entity);
        }else{
            new Error(typeof entity + " type is not Entity");
        }
    }

    removeEntity(entity) {
        if(entity instanceof Entity){
            if(typeof Entity.move === 'function')
            {
                this.diynamicEntitys.delete(entity);
            }else{
                this.staticEntitys.delete(entity);
            }
            if(typeof Entity.event === 'function')
            {
                this.keyListener.delete(entity);
                this.mouseListener.delete(entity);
                this.costumEventListener.delete(entity);
            }
            if(typeof Entity.hit === 'function') collisionHandler.removeEntity(entity);
        }else{
            new Error(typeof entity + " type is not Entity");
        }
    }
}

class EventListener {
    constructor(game) {
        this.game = game;
    }
    callEvent(event, value = null) {
    }
}

class Collision {
    constructor(game) {
        this.game = game;
    }
}

class FileLoader {
    constructor(game) {
        this.game = game;
        this.loadFinished = loadFinished;
        this.callBackRegister = new Map();
        this.checkLoadInterval = 35;
        this.vaitingElements = 0;
        this.allElements = 0;
    }

    load() {
        for(let entity of game.staticEntitys) {
            this.callBackRegister.set(entity, entity.load(this.callback));
        }

        for(let entity of game.diynamicEntitys) {
            this.callBackRegister.set(entity, entity.load(this.callback));
        }

        var firstCount = true;
        var checkLoad = setInterval(function(){
            for (let [entity, i] of this.callBackRegister) this.vaitingElements += i;

            if(firstCount) {
                this.allElements = this.vaitingElements;
                firstCount = false;
            }

            var progressInPercent = ((this.allElements - this.vaitingElements) / this.allElements) * 100;
            game.eventListener.callEvent("LoadInProgress", progressInPercent);

            if(this.vaitingElements == 0) {
                this.loadFinished();
                game.eventListener.callEvent("LoadFinished");
                clearInterval(checkLoad);
            }
        }, checkLoadInterval);
    }

    callback(entity) {
        this.callBackRegister.set(entity, this.callBackRegister.get(entity)-1); 
    }
}