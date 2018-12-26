//constants for receiving keyboard controls
var KeyCodes = {
    UP:    38,
	DOWN:  40,
	LEFT:  37,
	RIGHT: 39,
	W:     87,
    A:     65,
    S:     83,
    D:     68,
    COMMA: 188,
    PERIOD:190,
    Z:     90,
    X:     88,
    ESC:   27,
    SHIFT: 16
};

//constants for accessing the control buffer     
var Controls = {
    UP:    0,
    DOWN:  1,
    LEFT:  2,
    RIGHT: 3,
    ACTION:4,
    ALT:   5,
    MENU:  6,
    JACKIN:7,
    HELP:  8,
    bufferSize: 9
};

var ControlStates = {
    ISDOWN:0x01,
    RISE:  0x02,
    FALL:  0x04
};

class ControlsHandler {
    constructor() {
        //state is in bit 0, changes are in bit 1 and 2
        this.ctrlState = new Array(Controls.bufferSize).fill(0);
        this.outputBuffer = new Array(Controls.bufferSize);
    }

    handleKey(isDown,e) {
        if(e.repeat)
            return false;
        //console.log("ControlsHandler.handleKey(isDown:"+isDown+",keyCode:"+e.keyCode);
        //cross browser issues exist
		if (!e) {
			var e = window.event;
        }
        var updated = null;
		switch (e.keyCode) {
            case KeyCodes.W:
			case KeyCodes.UP:
                updated = Controls.UP;
				break;
            case KeyCodes.A:
			case KeyCodes.LEFT:
                updated = Controls.LEFT;
				break;
            case KeyCodes.S:
            case KeyCodes.DOWN:
                updated = Controls.DOWN;
                break;
			case KeyCodes.D:
			case KeyCodes.RIGHT:
                updated = Controls.RIGHT;
                break;
            case KeyCodes.X:
			case KeyCodes.PERIOD:
                updated = Controls.ACTION;
                break;
            case KeyCodes.Z:
			case KeyCodes.COMMA:
                updated = Controls.ALT;
                break;
            default:
            return false;
        }
        //console.log("Updated "+updated+", prevState: "+this.ctrlState[updated].toString(2));
        //set the fall/rise states
        if((this.ctrlState[updated] & ControlStates.ISDOWN) == 0) {
            //if was up but now is down
            if(isDown) {
                this.ctrlState[updated] |= ControlStates.RISE;
            }
        } else {
            //if was down but now is up
            if(!isDown) {
                this.ctrlState[updated] |= ControlStates.FALL;
            }
        }
        //set the isdown state
        if(isDown) {
            this.ctrlState[updated] |= ControlStates.ISDOWN;
        } else {
            this.ctrlState[updated] &= ~ControlStates.ISDOWN;
        }
        //console.log("newState: "+this.ctrlState[updated].toString(2));
        return false;
    }

    //returning the copied array isolates the internal state from changes
    getNextControl() {
        //update the output buffer before sending it out
        for(let i = 0;i < this.ctrlState.length;i++) {
            this.outputBuffer[i] = this.ctrlState[i];
        }
        //reset all control states' fall/rise states
        for(let i = 0;i < this.ctrlState.length; i++) {
            this.ctrlState[i] &= ControlStates.ISDOWN;
        }
        //console.log("getNextControl() = " + this.outputBuffer);
        return this.outputBuffer;
    }
}

export {KeyCodes,Controls,ControlStates,ControlsHandler};