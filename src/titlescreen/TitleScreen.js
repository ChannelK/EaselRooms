import "createjs";
class TitleScreen {
    constructor(stage) {
        console.log("TitleScreen()");
        this.stage = stage;
    }

    setup() {
        console.log("TitleScreen.setup()");
        var circle = new createjs.Shape();
        circle.graphics.beginFill("DeepSkyBlue").drawCircle(0, 0, 50);
        circle.x = 200;
        circle.y = 100;
        this.stage.addChild(circle);
        this.stage.update();
    }
}

export default TitleScreen;