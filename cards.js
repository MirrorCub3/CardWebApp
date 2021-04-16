module.exports = class Deck {
    constructor() {
        this.deck = [];
        this.deck.length = 0;
        this.discard = [];
        this.discard.length = 0;
        const suites = ['Hearts', 'Spades', 'Clubs', 'Diamonds'];
        const values = ['Ace', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'Jack', 'Queen', 'King'];

        for (let suite in suites) {
            for (let value in values) {
                this.deck.push(new Card(values[value],suites[suite])); // array of card objects
            }
        }
    }
    shuffle(){
        this.preShuffle = this.deck;
        this.shuffled = [];
        this.shuffled.length = this.preShuffle.length;
        for(let card in this.shuffled){ // turn all spaces to null first
            this.shuffled[card] = null;
        }
        for(let card in this.preShuffle){ // find a new spot for the given card in the new shuffled array
            let newIndex = NewSpot(this.shuffled); // find a random index
            while(this.shuffled[newIndex] != null){
                newIndex = NewSpot(this.shuffled); // if the spot is taken, find another
            }
            this.shuffled[newIndex] = this.preShuffle[card];// once the null index is found, point it to the card
        }
        this.deck = this.shuffled; // once shuffled, make this the new deck
    }
    Discard(card){
      this.discard[this.discard.length] = card;
      //////////////////!!!!!NEEDS TO BE TESTED
      // if(this.discard.length == 52){ // if the discard pile has all the cards, return to the main deck and reshuffle
      //     this.deck = this.discard;
      //     this.shuffle();
      // }
    }
    Draw(){
        this.returnCard = this.deck[0];
        this.deck.splice(0, 1); // draws from the beginning of the array and removes it afterwards
        console.log(this.deck.length);
        return(this.returnCard);
    }
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////
function Card (value,suite) {
    this.value = value;
    this.suite = suite;
}
function NewSpot(array){
    return Math.floor(Math.random() * array.length);
}
