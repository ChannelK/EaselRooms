import "createjs";
import GameContext from "../GameContext";

class TitleScreen extends GameContext {
    constructor(controller) {
        super(controller);
        console.log("TitleScreen(controller)");
        this.titleText = new createjs.Text("Room Tester", "40px Arial", "#3010FF");
        this.titleText.textAlign = "center";

        let btnDim = [200,100];
        this.buttonBg = new createjs.Shape();
        this.buttonBg.graphics.beginFill("#80A080").drawRoundRect(
            btnDim[0]/-2,btnDim[1]/-2,
            btnDim[0],btnDim[1],10);
        this.buttonBg.cache(
            btnDim[0]/-2,btnDim[1]/-2,
            btnDim[0],btnDim[1]);
        this.buttonBg.addEventListener("click",((event) =>
            {
                console.log("Clicked at "+event.stageX+","+event.stageY);
                if(this.doneLoading) {
                    this.gameCore.switchContext("roomscreen");
                }
            }).bind(this));

        this.goButtonText = new createjs.Text("GO", "40px Arial", "#3010FF");
        this.goButtonText.textAlign = "center";
        let goBtnBound = this.goButtonText.getBounds();
        this.goButtonText.cache(goBtnBound.x,goBtnBound.y,
            goBtnBound.width,goBtnBound.height);

        this.loadButtonText = new createjs.Text("LOADING", "20px Arial", "#3010FF");
        this.loadButtonText.textAlign = "center";
        let loadBtnBound = this.loadButtonText.getBounds();
        this.loadButtonText.cache(loadBtnBound.x,loadBtnBound.y,
            loadBtnBound.width,loadBtnBound.height);
        
        this.doneLoading = false;
    }

    setup(args) {
        console.log("TitleScreen.setup()");
        this.stage.removeAllChildren();
		this.gameCore.loader.addEventListener("complete",this.doneLoadCallback.bind(this));
        //this.gameCore.loader.loadManifest(completeManifest,true,this.gameCore.assetRoot);
        this.gameCore.assetHandler.preloadAssets();

        this.stage.addChild(this.buttonBg);
        let btnCenter = [this.stage.canvas.width/2,200];
        this.buttonBg.x = btnCenter[0];
        this.buttonBg.y = btnCenter[1];

        this.stage.addChild(this.titleText);
        this.titleText.x = this.stage.canvas.width/2;
        this.titleText.y = 30;
        
        this.stage.addChild(this.goButtonText);
        this.goButtonText.x = btnCenter[0];
        this.goButtonText.y = btnCenter[1]-20;
        this.goButtonText.visible = false;

        this.stage.addChild(this.loadButtonText);
        this.loadButtonText.x = btnCenter[0];
        this.loadButtonText.y = btnCenter[1]-20;
        
        this.stage.update();
    }

    doneLoadCallback() {
        console.log("Done loading with loader ");
        this.gameCore.assetHandler.loadDungeonAssets();
        this.loadButtonText.visible = false;
        this.goButtonText.visible = true;
        this.stage.update();
        this.doneLoading = true;
    }
}

export default TitleScreen;