import "createjs";
import TitleScreen from "./titlescreen/TitleScreen";

function runGame() {
    console.log("runGame()");
    var canvas = document.getElementById("demoCanvas");
    var stage = new createjs.Stage(canvas);
    var titleScreen = new TitleScreen(stage);
    titleScreen.setup();
    // var circle = new createjs.Shape();
    // circle.graphics.beginFill("DeepSkyBlue").drawCircle(0, 0, 50);
    // circle.x = 100;
    // circle.y = 100;
    // stage.addChild(circle);
    // stage.update();
}

export default runGame;