class MovementEngine {
    constructor() {
        this.barrierObjs = [];
    }

    addBarrier(barrier) {
        this.barrierObjs.push(barrier);
    }

    moveWithVector(displayObj,moveVector) {
        //try to detect a collision
        for(let barrierObj in this.barrierObjs) {
            
        }
    }
}