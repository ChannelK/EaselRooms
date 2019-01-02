import "createjs";
import TitleScreen from "./titlescreen/TitleScreen";
import RoomScreen from "./roomscreen/RoomScreen";
import {KeyCodes,Controls,ControlStates,ControlsHandler} from "./ControlsHandler";
import AssetHandler from "./assetload/AssetHandler";
import {ASSET_ROOT,getPreloadManifest} from "./assetload/DungeonAssetReader";

function runGame() {
    console.log("runGame()");
    var canvas = document.getElementById("demoCanvas");
    var gameCore = new GameCore(canvas);
    gameCore.switchContext("titlescreen",null);
}

class GameCore {
    constructor(canvas) {
        this.stage = new createjs.Stage(canvas);
        //set up load queue and asset handler for storing usages
        this.loader = new createjs.LoadQueue(true,ASSET_ROOT);
        this.assetHandler = new AssetHandler(this.loader);

        //set up the control handler
        this.ctrlHandler = new ControlsHandler();
        document.onkeydown = ((evt) => {return this.ctrlHandler.handleKey(true,evt);}).bind(this);
        document.onkeyup = ((evt) => {return this.ctrlHandler.handleKey(false,evt);}).bind(this);

        this.currentContext = null;

        //init for titlescreen
        var titleScreen = new TitleScreen(this);
        var roomScreen = new RoomScreen(this);
        this.contexts = {
            "titlescreen":titleScreen,
            "roomscreen":roomScreen
        };
    }

    getNextControl() {
        return this.ctrlHandler.getNextControl();
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