import "createjs";
import TitleScreen from "./titlescreen/TitleScreen";
import RoomScreen from "./roomscreen/RoomScreen";
import ControlsHandler from "./ControlsHandler";

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
        var roomScreen = new RoomScreen(this);
        this.contexts = {
            "titlescreen":titleScreen,
            "roomscreen":roomScreen
        };
        this.controls = new ControlsHandler();
        document.onkeydown = ((evt) => {return this.controls.handleKey(true,evt);}).bind(this);
        document.onkeyup = ((evt) => {return this.controls.handleKey(false,evt);}).bind(this);
        //debugging for the key presses
        // document.onkeypress = (evt) => {console.log("PRESS "+evt.keyCode);return false;};
        // document.onkeydown = (evt) => {console.log("DOWN "+evt.keyCode);return false;};
        // document.onkeyup = (evt) => {console.log("UP "+evt.keyCode);return false;};
    }

    getNextControl() {
        return this.controls.getNextControl();
    }

    switchContext(contextName,args) {
        console.log("GameController.switchContext("+contextName+",args)");
        if(contextName in this.contexts) {
            //console.log("GameController.switchContext("+contextName+",args)");
            console.log("Switching to "+contextName);
            if(this.currentContext != null) {
                this.currentContext.teardown();
            }
            this.currentContext = this.contexts[contextName];
            this.currentContext.setup(args);
        } else {
            throw new Error("Tried to switch to non-existent context '"+contextName+"'!");
        }
    }
}

export default runGame;