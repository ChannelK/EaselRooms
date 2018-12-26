class GameContext {
    constructor(gameCore) {
        this.gameCore = gameCore;
        this.stage = gameCore.stage;
        //these will be built upon setup by a child class
        this.tickList = [];
    }

    startTick() {
        createjs.Ticker.removeAllEventListeners();
        createjs.Ticker.addEventListener("tick", this.handleTick);
    }

    tick(event) {
        for(var i = 0; i < this.tickList.length; i++) {
            this.tickList[i].handleTick(event);
        }
        this.stage.update();
    }

    teardown(args) {
        this.stage.removeAllEventListeners();
        this.stage.removeAllChildren();
        createjs.Ticker.removeAllEventListeners();
    }
}

export default GameContext;