import "createjs";
import GameContext from "../GameContext";
import {KeyCodes,Controls,ControlStates,ControlsHandler} from "../ControlsHandler";

class RoomScreen extends GameContext {
    constructor(controller) {
        super(controller);
        console.log("RoomScreen(controller)");
        let textColor = "#A0A0A0"
        this.upText = new createjs.Text("UP", "10px Arial", textColor);
        this.upText.x = 10
        this.upText.y = 40
        this.upText.visible = false;

        this.downText = new createjs.Text("DOWN", "10px Arial", textColor);
        this.downText.x = 10
        this.downText.y = 55
        this.downText.visible = false;

        this.leftText = new createjs.Text("LEFT", "10px Arial", textColor);
        this.leftText.x = 10
        this.leftText.y = 70
        this.leftText.visible = false;

        this.rightText = new createjs.Text("RIGHT", "10px Arial", textColor);
        this.rightText.x = 10
        this.rightText.y = 85
        this.rightText.visible = false;

        this.testSprite_0 = null;
        this.testSprite_1 = null;

        this.sky = null;

        this.ctrlCombos = [
            [Controls.UP,this.upText],
            [Controls.DOWN,this.downText],
            [Controls.LEFT,this.leftText],
            [Controls.RIGHT,this.rightText]
        ];
    }

    assetsLoaded() {
        console.log("assetsLoaded()");
        console.log("Asset Handler:")
        console.log(this.gameCore.assetHandler);
        console.log("Fountain Asset: ");
        console.log(this.gameCore.loader.getResult("ice_zombie"));
        // console.log("Sprite sheet:")
        // console.log(this.gameCore.assetHandler.getSpriteSheet("wall_fountain_mid_blue"));
        let debugSpriteSheet = new createjs.SpriteSheet({
            framerate: 30,
            "images": [this.gameCore.loader.getResult("grant")],
            "frames": {"regX": 82, "height": 292, "count": 64, "regY": 0, "width": 165},
            // define two animations, run (loops, 1.5x speed) and jump (returns to run):
            "animations": {
                "run": [0, 25, "run", 1.5],
                "jump": [26, 63, "run"]
            }
        });

        let manualSpriteSheet = new createjs.SpriteSheet({
            framerate: 30,
            "images": [this.gameCore.loader.getResult("zombie")],
            "frames": {"regX": 32, "height": 16, "regY": 8, "width": 16},
            //one redundant animation
            "animations": {
                "idle": [0,3,"idle"],
                "run": [4,7,"run"]
            }
        });
        
        this.testSprite_0 = new createjs.Sprite(debugSpriteSheet,"run");
        //this.testSprite_1 = new createjs.Sprite(manualSpriteSheet,"run");
        this.testSprite_1 = new createjs.Sprite(this.gameCore.assetHandler.getSpriteSheet("ice_zombie"),0);
        
        this.testSprite_0.x = 120;
        this.testSprite_0.y = 120;
        this.testSprite_1.x = 120;
        this.testSprite_1.y = 100;
        console.log("Test Sprite:");
        console.log(this.testSprite_0);


        //this.sky = new createjs.Shape();
		//this.sky.graphics.beginBitmapFill(this.gameCore.loader.getResult("sheet_DungeonTilesetII")).drawRect(0, 0, 100, 100);
		//By default swapping between Stage for StageGL will not allow for vector drawing operation such as BitmapFill, useless you cache your shape.
		//this.sky.cache(0, 0, 100, 100);
    }

    handleTick(event) {
        let ctrlState = this.gameCore.getNextControl();
        for(let i = 0; i < this.ctrlCombos.length;i++) {
            let ctrl = this.ctrlCombos[i][0];
            let textObj = this.ctrlCombos[i][1];
            if(ctrlState[ctrl] & (ControlStates.ISDOWN | ControlStates.RISE)) {
                textObj.visible = true;
            } else {
                textObj.visible = false;
            }
        }
        this.stage.update(event);
    }

    setup(args) {
        this.assetsLoaded();

        console.log("RoomScreen.setup()");
        this.stage.clear();
        var bg = new createjs.Shape();
        bg.graphics.beginFill("#000000").drawRect(0,0,this.stage.canvas.width,this.stage.canvas.height);
        this.stage.addChild(bg);
        this.stage.addChild(this.upText);
        this.stage.addChild(this.downText);
        this.stage.addChild(this.leftText);
        this.stage.addChild(this.rightText);
        this.stage.addChild(this.testSprite_0);
        this.testSprite_0.play();
        this.stage.addChild(this.testSprite_1);
        this.testSprite_1.play();
        //debugging
        //this.stage.addChild(this.sky);
        //this.testSprite.play();
        this.tickList = [this];
        this.stage.update();
        //directly add this class's tick handler instead of using the superclass handler
        createjs.Ticker.addEventListener("tick",this.handleTick.bind(this));
    }
}

export default RoomScreen;