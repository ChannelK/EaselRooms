import "createjs";
import GameContext from "../GameContext";
import {KeyCodes,Controls,ControlStates,ControlsHandler} from "../ControlsHandler";

class RoomScreen extends GameContext {
    constructor(controller) {
        super(controller);
        console.log("RoomScreen(controller)");
        this.upText = new createjs.Text("UP", "10px Arial", "#303030");
        this.upText.x = 10
        this.upText.y = 40
        this.upText.visible = false;

        this.downText = new createjs.Text("DOWN", "10px Arial", "#303030");
        this.downText.x = 10
        this.downText.y = 55
        this.downText.visible = false;

        this.leftText = new createjs.Text("LEFT", "10px Arial", "#303030");
        this.leftText.x = 10
        this.leftText.y = 70
        this.leftText.visible = false;

        this.rightText = new createjs.Text("RIGHT", "10px Arial", "#303030");
        this.rightText.x = 10
        this.rightText.y = 85
        this.rightText.visible = true;

        this.ctrlCombos = [
            [Controls.UP,this.upText],
            [Controls.DOWN,this.downText],
            [Controls.LEFT,this.leftText],
            [Controls.RIGHT,this.rightText]
        ];
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
        this.stage.update();
    }

    setup(args) {
        console.log("RoomScreen.setup()");
        this.stage.clear();
        this.stage.addChild(this.upText);
        this.stage.addChild(this.downText);
        this.stage.addChild(this.leftText);
        this.stage.addChild(this.rightText);
        this.tickList = [this];
        this.stage.update();
        //directly add this class's tick handler instead of using the superclass handler
        createjs.Ticker.addEventListener("tick",this.handleTick.bind(this));
    }
}

export default RoomScreen;