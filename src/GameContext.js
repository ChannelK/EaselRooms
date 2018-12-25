class GameContext {
    constructor(controller) {
        this.controller = controller;
        this.stage = controller.stage;
        //these will be built upon setup by a child class
        this.tickList = [];
    }

    startTick() {
        createjs.Ticker.removeAllEventListeners();
        createjs.Ticker.addEventListener("tick", this.handleTick);
    }

    handleTick() {
        for(var i = 0; i < this.tickList.length; i++) {
            this.tickList[i].handleTick();
        }
        this.stage.update();
    }
}

export default GameContext;