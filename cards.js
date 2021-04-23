module.exports = class Deck {
    constructor() {
        this.deck = [];
        this.deck.length = 0;
        this.discard = [];
        this.discard.length = 0;
        this.imageId = 0;
        this.shuffleOnReplace = false;
        this.drawActive = false;
        this.drawDiscardActive = false;
        const suites = ['Hearts', 'Spades', 'Clubs', 'Diamonds'];
        const values = ['Ace', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'Jack', 'Queen', 'King'];
        const images = [
         /// aces
          "/views/aceHearts.png", //aceHearts
          "/views/aceSpades.png", //aceSpades
          "/views/aceClubs.png", //aceClubs
          "/views/aceDiamonds.jpeg", //aceDiamonds
          ///2s
          "/views/twoHearts.webp", //twoHearts
          "/views/twoSpades.png", //twoSpades
          "/views/twoClubs.jpeg", //twoclub
          "/views/twoDiamonds.png", //twoDiamonds
          ///3s
          "/views/threeHearts.jpg",
          "/views/threeSpades.png",
          "/views/threeClubs.png",
          "/views/threeDiamonds.png",
          //4s
          "/views/fourHearts.png",
          "/views/fourSpades.png",
          "/views/fourClubs.png",
          "/views/fourDiamonds.jpeg",
          ///5s
          "/views/fiveHearts.png ",
          "/views/fiveSpades.png",
          "/views/fiveClubs.jpg",
          "/views/fiveDiamonds.png",
          //6s
          "/views/sixHearts.jpeg",
          "/views/sixSpades.jpeg",
          "/views/sixClubs.png",
          "/views/sixDiamonds.png",
          //7s
          "/views/sevenHearts.png",
          "/views/sevenSpades.png",
          "/views/sevenClubs.jpeg",
          "/views/sevenDiamonds.png",
          //8s
          "/views/eightHearts.png",
          "/views/eightSpades.jpeg",
          "/views/eightClubs.gif",
          "/views/eightDiamonds.png",
          //9s
          "/views/nineHearts.png",
          "/views/nineSpades.png",
          "/views/nineClubs.png",
          "/views/nineDiamonds.png",
          //10
          "/views/tenHearts.png",
          "/views/tenSpades.png",
          "/views/tenClubs.jpg",
          "/views/tenDiamonds.png",
          //jack
          "/views/jackHearts.png",
          "/views/jackSpades.png",
          "/views/jackClubs.png",
          "/views/jackDiamonds.png",
          //queen
          "/views/queenHearts.png",
          "/views/queenSpades.png",
          "/views/queenClubs.jpeg",
          "/views/queenDiamonds.jpg",
          //king
          "/views/kingHearts.jpg",
          "/views/kingSpades.png",
          "/views/kingClubs.jpg",
          "/views/kingDiamonds.jpeg"
        ];
        for (let value in values) {
            for (let suite in suites) {
                this.deck.push(new Card(values[value],suites[suite],images[this.imageId])); // array of card objects
                this.imageId++;
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
    }
    DiscardToMain(){
        if(this.discard.length <= 0){
            return;
        }
        for(let id1 = 0; id1 < this.discard.length; id1++){
            for(let id2 = id1 + 1; id2 < this.discard.length; id2++){
                if(this.discard[id1] != null && this.discard[id2] != null && this.discard[id1].value == this.discard[id2].value &&
                   this.discard[id1].suite == this.discard[id2].suite){
                      console.log(this.discard[id1]);
                      this.discard[id1] = null;
                      console.log(this.discard[id1]);
                }
            }
        }
        for(let cur in this.discard){
            if(this.discard[cur] === null){
                this.discard.splice(cur, 1);
            }
        }
        for(let card in this.discard){
            this.deck[this.deck.length] = this.discard[card];
        }
        if(this.shuffleOnReplace){ this.shuffle(); }
        this.discard.length = 0;
    }
    Draw(){
      if(this.drawActive == true){
          return;
      }
        this.drawActive = true;
        if(this.deck.length > 0){
            this.returnCard = this.deck[0];
            this.deck.splice(0, 1); // draws from the beginning of the array and removes it afterwards
            this.drawActive = false;
            return(this.returnCard);
        }
        else{
            this.drawActive = false;
            return(null);
        }
    }
    DrawDiscard(){
      if(this.drawDiscardActive == true){
          return;
      }
        this.drawDiscardActive = true;
        if(this.discard.length > 0){
            this.returnCard = this.discard[this.discard.length-1];
            this.discard.splice(this.discard.length-1, 1);
            this.drawDiscardActive = false;
            return(this.returnCard);
        }
        else{
            this.drawDiscardActive = false;
            return(null);
        }
    }
    ReturnHand(hand){
        for (let card in hand){
            this.deck[this.deck.length] = hand[card];
        }
    }
    CheckEmpty(){
        if(this.deck.length < 1){
            return(true);
        }
        else {
          return(false);
        }
        //$('input').prop('readonly',true);
    }
    FindIndex(targetCard,hand){
     for (let card in hand){
         if(targetCard.value == hand[card].value && targetCard.suite == hand[card].suite){
             return(card);
         }
     }
     return(-1);
   }
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////
function Card (value,suite,image) {
    this.value = value;
    this.suite = suite;
    this.image = image;
}
function NewSpot(array){
    return Math.floor(Math.random() * array.length);
}
