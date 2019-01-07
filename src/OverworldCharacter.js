import "createjs";
class OverworldCharacter {
    /**
     * Thinly wraps a display object
     * @param {createjs.Sprite} spriteObj 
     */
    constructor(spriteObj) {
        this.spriteObj = spriteObj;
        this.absScaleX = 1.0;
        this.absScaleY = 1.0;
        this.wasRight = true;
        this.moveSpeed = 8;
        this.diagSpeed = Math.SQRT1_2 * this.moveSpeed;
        this.posX = 0;
        this.posY = 0;
        //used to resume animations, or to update anim after property change
        this.currentAnim = null;
    }

    moveBy(dX,dY) {
        this.spriteObj.x += dX;
        this.spriteObj.y += dY;
    }
    moveTo(x,y) {
        this.spriteObj.x = x;
        this.spriteObj.y = y;
    }

    animRun(isRight) {
        this.spriteObj.gotoAndPlay("run");
        if(isRight) {
            this.spriteObj.scaleX = absScaleX;
        } else {
            this.spriteObj.scaleX = absScaleX * -1;
        }
        this.wasRight = isRight;
        this.currentAnim = (()=>{this.animRun(isRight)}).bind(this);
    }

    animIdle() {
        this.spriteObj.gotoAndPlay("idle");
        this.currentAnim = this.animIdle.bind(this);
    }

    scaleTo(sX,sY) {
        this.absScaleX = sX;
        this.absScaleY = sY;
        this._reloadScale();
    }

    _reloadScale() {

        this.spriteObj.scaleX = this.absScaleX * (this.wasRight?1:-1);
        this.spriteObj.scaleY = this.absScaleY;
    }

    _reloadAnim() {
        this.currentAnim();
    }

    _reloadPos() {
        this.spriteObj.x = Math.round(this.posX);
        this.spriteObj.y = Math.round(this.posY);
    }
}

export default OverworldCharacter;