import "createjs";
import GameContext from "../GameContext";

class TitleScreen extends GameContext {
    constructor(controller) {
        super(controller);
        console.log("TitleScreen(controller)");
        this.titleText = new createjs.Text("Room Tester", "40px Arial", "#3010FF");
        this.titleText.x = this.stage.canvas.width/2;
        this.titleText.y = 30;
        this.titleText.textAlign = "center";

        let btnCenter = [this.stage.canvas.width/2,200];
        let btnDim = [200,100];
        this.buttonBg = new createjs.Shape();
        this.buttonBg.graphics.beginFill("#80A080").drawRoundRect(
            btnCenter[0] - btnDim[0]/2,btnCenter[1] - btnDim[1]/2,
            btnDim[0],btnDim[1],10);
        this.buttonBg.addEventListener("click",(event) =>
            {
                console.log("Clicked at "+event.stageX+","+event.stageY);
                this.gameCore.switchContext("roomscreen");
            });

        this.buttonText = new createjs.Text("GO", "40px Arial", "#3010FF");
        this.buttonText.x = btnCenter[0];
        this.buttonText.y = btnCenter[1]-20;
        this.buttonText.textAlign = "center";
    }

    setup(args) {
        console.log("TitleScreen.setup()");
        this.stage.removeAllChildren();

        this.stage.addChild(this.buttonBg);
        this.stage.addChild(this.titleText);
        this.stage.addChild(this.buttonText);
        this.stage.update();
    }
}

export default TitleScreen;