import "createjs";
import TitleScreen from "./titlescreen/TitleScreen";

function runGame() {
    console.log("runGame()");
    var canvas = document.getElementById("demoCanvas");
    var gameController = new GameController(canvas);
    gameController.switchContext("titlescreen",null);
}

class GameController {
    constructor(canvas) {
        this.stage = new createjs.Stage(canvas);
        this.currentContext = null;
        //init for titlescreen
        var titleScreen = new TitleScreen(this);

        this.contexts = {
            "titlescreen":titleScreen
        };
    }

    switchContext(contextName,args) {
        console.log("GameController.switchContext("+contextName+",args)");
        if(contextName in this.contexts) {
            //console.log("GameController.switchContext("+contextName+",args)");
            console.log("Switching to "+contextName);
            if(this.currentContext != null) {
                this.currentContext.tearDown();
            }
            this.currentContext = this.contexts[contextName];
            this.currentContext.setup(args);
        } else {
            throw new Error("Tried to switch to non-existent context '"+contextName+"'!");
        }
    }
}

export default runGame;