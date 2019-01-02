import "createjs";
import {ASSET_ROOT,getPreloadManifest} from "./DungeonAssetReader";
import DungeonManifest from "../../assets/DungeonTileAsset/SpriteManifest.json"

//get the dungeon description file
// var request = new XMLHttpRequest();
// var dungeonTilesDesc;
// request.open('GET', "assets/DungeonTileAsset/tiles_list_v1.1.txt", false);
// request.onreadystatechange = function() {
//     //alert(request.responseText);
//     dungeonTilesDesc = request.responseText
// }
// request.send();

//load the images
// let loader = new createjs.LoadQueue(true);
//         let manifest = [
// 			{src: "0x72_DungeonTilesetII_v1.2.png", id: "DungeonTilesetII"},
// 		];
// //loader.addEventListener("complete", handleComplete);
// loader.loadManifest(manifest, true, "../assets/DungeonTileAsset/");

function getDescDict(descFile) {
    //first extract the descriptions
    var lines = descFile.split('\n');
    // console.log("getDescDict(");
    // console.log(lines);
    // console.log(")");
    var descDict = {};
    for(let i = 0; i < lines.length; i++) {
        let line = lines[i];
        let tokens = line.split(/\s+/);
        // console.log("\t"+line+" => ");
        // console.log(tokens);
        let assetID = tokens[0];
        descDict[assetID] = {
            x: parseInt(tokens[1]),
            y: parseInt(tokens[2]),
            w: parseInt(tokens[3]),
            h: parseInt(tokens[4])};
        if(tokens.length == 6){
            descDict[assetID].animLen = tokens[5];
            descDict[assetID].isAnim = true;
        } else {
            descDict[assetID].isAnim = false;
        }

    }
    return descDict;
}

//NOTE THAT THE LOADER MUST BE PRIMED BEFORE USAGE
class AssetHandler {
    constructor(loader) {
        this.loader = loader;
        this.spriteSheetDict = {};
        this.dungeonManifest = DungeonManifest
        this.preloadManifest = getPreloadManifest();
        //this.preloadManifest = {"src":"spritesheet_grant.png","id":"grant"};
    }

    //converts the raw text into a well formatted object
    getTextDescDict(descFile) {
        //first extract the descriptions
        var lines = descFile.split('\n');
        var descDict = {};
        for(let i = 0; i < lines.length; i++) {
            let line = lines[i];
            let tokens = line.split(/\s+/);
            if(tokens.length < 5){
                continue;
            }
            let assetID = tokens[0];
            descDict[assetID] = {
                x: parseInt(tokens[1]),
                y: parseInt(tokens[2]),
                w: parseInt(tokens[3]),
                h: parseInt(tokens[4])};
            if(tokens.length == 6){
                descDict[assetID].animLen = parseInt(tokens[5]);
                descDict[assetID].isAnim = true;
            } else {
                descDict[assetID].isAnim = false;
            }
    
        }
        return descDict;
    }

    preloadAssets() {
        console.log("PRELOADING ")
        console.log(this.preloadManifest);
        console.log("____________________");
        this.loader.loadManifest(this.preloadManifest,true,ASSET_ROOT);
    }

    loadDungeonAssets() {
        for(var groupID in this.dungeonManifest) {
            console.log("Loading asset "+groupID);
            if(!this.dungeonManifest[groupID]["isAnim"]) {
                continue
            }
            let jsonData = this.dungeonManifest[groupID]["data"];
            var sheetData = {
				framerate: 30,
				"images": [this.loader.getResult(groupID)],
                "frames": {
                    "width":  jsonData["width"],
                    "height": jsonData["height"],
                    "regX":   jsonData["width"]/2, 
                    "regY":   jsonData["height"]/2
                },
				// define two animations, run (loops, 1.5x speed) and jump (returns to run):
				"animations": jsonData["animations"]
            }
            console.log("Creating with data ");
            console.log(sheetData);
            this.spriteSheetDict[groupID] = new createjs.SpriteSheet(sheetData);
            console.log("spriteSheetDict["+groupID+"] = ");
            console.log(this.spriteSheetDict[groupID]);
        }
    }

    getSpriteSheet(spriteID) {
        return this.spriteSheetDict[spriteID];
    }
}

export default AssetHandler;