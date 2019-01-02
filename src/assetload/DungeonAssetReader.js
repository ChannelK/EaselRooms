import DungeonManifest from "../../assets/DungeonTileAsset/SpriteManifest.json"
var ASSET_ROOT = "assets/DungeonTileAsset/";

function getPreloadManifest() {
    //construct the preloadjs manifest from the sprite manifest
    var manifest = [];
    for(let groupID in DungeonManifest) {
        manifest.push({"src":DungeonManifest[groupID]["src"],"id":groupID});
    }
    return manifest;
}

export {ASSET_ROOT, getPreloadManifest};