module.exports = class Player {
    constructor(id) {
        this.active = false;
        this.hand = [];
        this.realId = id;
        this.id = this.realId + 1;
        this.name = "Player " + this.id;
    }
    defaultState(id){
        this.active = false;
        this.hand = [];
        this.realId = id;
        this.id = this.realId + 1;
        this.name = "Player " + this.id;
    }
    setHand(arr){

    }
}
