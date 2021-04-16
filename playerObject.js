module.exports = class Player {
    constructor() {
        this.hand = [];
        this.realId = 0;
        this.id = ++this.realId;
        this.name = "Player " + this.id;
    }
}
