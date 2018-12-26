class ControlsHandler {
    constructor() {
        //constants for receiving keyboard controls
        this.KEYCODE_UP = 38;
	    this.KEYCODE_DOWN = 40;
	    this.KEYCODE_LEFT = 37;
	    this.KEYCODE_RIGHT = 39;
	    this.KEYCODE_W = 87;
        this.KEYCODE_A = 65;
        this.KEYCODE_S = 83;
        this.KEYCODE_D = 68;
        this.KEYCODE_COMMA = 188;
        this.KEYCODE_PERIOD = 190;
        this.KEYCODE_Z = 90;
        this.KEYCODE_X = 88;
        this.KEYCODE_ESC = 27;
        this.KEYCODE_SHIFT = 16;

        //constants for accessing the control buffer
        this.CTRL_UP = 0;
        this.CTRL_DOWN = 1;
        this.CTRL_LEFT = 2;
        this.CTRL_RIGHT = 3;
        this.CTRL_ACTION = 4;
        this.CTRL_ALT = 5;
        this.CTRL_MENU = 6;
        this.CTRL_JACKIN = 7;
        this.CTRL_HELP = 8;
        this.ctrlList = [this.CTRL_UP,this.CTRL_DOWN,this.CTRL_LEFT,this.CTRL_RIGHT,
            this.CTRL_ACTION,this.CTRL_ALT,this.CTRL_MENU,this.CTRL_JACKIN,this.CTRL_HELP];

        this.STATE_ISDOWN = 0x01;
        this.STATE_RISE = 0x02;
        this.STATE_FALL = 0x04;
        //state is in bit 0, changes are in bit 1 and 2
        this.ctrlState = new Array(this.ctrlList.length).fill(0);
        this.outputBuffer = new Array(this.ctrlList.length);
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
            case this.KEYCODE_W:
			case this.KEYCODE_UP:
                updated = this.CTRL_UP;
				break;
            case this.KEYCODE_A:
			case this.KEYCODE_LEFT:
                updated = this.CTRL_LEFT;
				break;
            case this.KEYCODE_S:
            case this.KEYCODE_DOWN:
                updated = this.CTRL_DOWN;
                break;
			case this.KEYCODE_D:
			case this.KEYCODE_RIGHT:
                updated = this.CTRL_RIGHT;
                break;
            case this.KEYCODE_X:
			case this.KEYCODE_PERIOD:
                updated = this.CTRL_ACTION;
                break;
            case this.KEYCODE_Z:
			case this.KEYCODE_COMMA:
                updated = this.CTRL_ALT;
                break;
            default:
            return false;
        }
        //console.log("Updated "+updated+", prevState: "+this.ctrlState[updated].toString(2));
        //set the fall/rise states
        if((this.ctrlState[updated] & this.STATE_ISDOWN) == 0) {
            //if was up but now is down
            if(isDown) {
                this.ctrlState[updated] |= this.STATE_RISE;
            }
        } else {
            //if was down but now is up
            if(!isDown) {
                this.ctrlState[updated] |= this.STATE_FALL;
            }
        }
        //set the isdown state
        if(isDown) {
            this.ctrlState[updated] |= this.STATE_ISDOWN;
        } else {
            this.ctrlState[updated] &= ~this.STATE_ISDOWN;
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
        for(let i = 0;i < this.ctrlList.length; i++) {
            this.ctrlState[i] &= this.STATE_ISDOWN;
        }
        //console.log("getNextControl() = " + this.outputBuffer);
        return this.outputBuffer;
    }
}

export default ControlsHandler;