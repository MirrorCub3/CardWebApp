module.exports = class Deck {
    constructor() {
        this.deck = [];
        this.deck.length = 0;
        this.discard = [];
        this.discard.length = 0;
        this.imageId = 0;
        const suites = ['Hearts', 'Spades', 'Clubs', 'Diamonds'];
        const values = ['Ace', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'Jack', 'Queen', 'King'];
        const images = [
          /// aces
          "https://th.bing.com/th/id/R9ab1021cc4d3ae8b2d5bbdf65c924019?rik=diJyadqQvqRgtQ&riu=http%3a%2f%2fsweetclipart.com%2fmultisite%2fsweetclipart%2ffiles%2face_of_hearts.png&ehk=YS4UctL5mLoA6C3237TXuxrgVkZQfhN80idD0SS6510%3d&risl=&pid=ImgRaw", //aceHearts
          "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/01_of_spades_A.svg/1200px-01_of_spades_A.svg.png", //aceSpades
          "https://th.bing.com/th/id/Rc37d0aba07fd69eed1ca081d4f21efce?rik=BOcTHvfOcgJTGw&riu=http%3a%2f%2fwww.clipartbest.com%2fcliparts%2f9T4%2feaR%2f9T4eaRnrc.png&ehk=32aOXL31Fz0GKxnVimTBn337IzpCPuvtMmTVU8cpg%2fo%3d&risl=&pid=ImgRaw", //aceClubs
          "https://th.bing.com/th/id/R877d6169a2cef1039254d86c250dc30f?rik=yCrhR6SMZL3%2fSQ&riu=http%3a%2f%2flauraewest.com%2fwp-content%2fuploads%2f2015%2f01%2fAce-Diamonds.jpg&ehk=uRDsTVxbuuMxdyoYtnpToISFAsmnrmT9zD9Kcqxgk88%3d&risl=&pid=ImgRaw", //aceDiamonds
          ///2s
          "https://cdn.pixabay.com/photo/2015/08/11/11/55/hearts-884150_960_720.png", //twoHearts
          "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/2_of_spades.svg/530px-2_of_spades.svg.png", //twoSpades
          "https://th.bing.com/th/id/Rbf40443285ae3387bf9968e8ea3eef40?rik=fJc%2fAwEDY%2f9wLQ&riu=http%3a%2f%2fusercontent2.hubimg.com%2f718461_f260.jpg&ehk=oK9o7%2fo3KHCLIVG4idg6aLD9fSdELZKKZQaqgQKIyY0%3d&risl=&pid=ImgRaw", //twoclub
          "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/2_of_diamonds.svg/530px-2_of_diamonds.svg.png", //twoDiamonds
          ///3s
          "https://media.istockphoto.com/photos/three-of-hearts-playing-card-picture-id93429074?k=6&m=93429074&s=612x612&w=0&h=xykvZIJZ09XaXYDbw26mEyveJ9G6eukwJeSy9KpuuUM=",
          "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Atlas_deck_3_of_spades.svg/682px-Atlas_deck_3_of_spades.svg.png",
          "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Playing_card_club_3.svg/819px-Playing_card_club_3.svg.png",
          "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/3_of_diamonds.svg/706px-3_of_diamonds.svg.png",
          //4s
          "https://opengameart.org/sites/default/files/oga-textures/92832/hearts_4.png",
          "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/4_of_spades.svg/706px-4_of_spades.svg.png",
          "https://openclipart.org/image/2400px/svg_to_png/192923/1397958273.png",
          "https://th.bing.com/th/id/R84f8f1be745bbd9e25936a9b25bef44e?rik=aOZuQdpJQFTK3g&riu=http%3a%2f%2fi.dailymail.co.uk%2fi%2fpix%2f2013%2f08%2f23%2farticle-2400790-1B6C684D000005DC-307_306x423.jpg&ehk=8Qn4j1BRxoUa5HXH4ICih39Dqhv28h0hnmNgbm3%2fXBg%3d&risl=&pid=ImgRaw",
          ///5s
          "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/5_of_hearts.svg/706px-5_of_hearts.svg.png",
          "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/5_of_spades.svg/1200px-5_of_spades.svg.png",
          "https://images.saymedia-content.com/.image/t_share/MTc2MjY4MzcwMzU3ODU1NDIy/playing-cards-clip-art.jpg",
          "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Atlas_deck_5_of_diamonds.svg/682px-Atlas_deck_5_of_diamonds.svg.png",
          //6s
          "https://th.bing.com/th/id/R7a2e3f644a98b304abe29c1ed7a9cb51?rik=YL4AeOu%2fb%2fFxvA&riu=http%3a%2f%2fs2.hubimg.com%2fu%2f718491_f260.jpg&ehk=H9HCuAuiwZhWjuQQD%2bpqO2x9h0d9Gui2MlLbXho7IUs%3d&risl=&pid=ImgRaw",
          "https://th.bing.com/th/id/R2d2e504c8323abb9c032b6e919643614?rik=ZYcuDnptKjxS9Q&riu=http%3a%2f%2flauraewest.com%2fwp-content%2fuploads%2f2015%2f01%2fSave0007.jpg&ehk=lJf0uKCL9DD2kdOdV%2fYtv%2fjRmG6djvfgupvwqrhelvU%3d&risl=&pid=ImgRaw",
          "https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/6C.svg/428px-6C.svg.png",
          "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/6D.svg/548px-6D.svg.png",
          //7s
          "https://opengameart.org/sites/default/files/oga-textures/92832/hearts_7.png",
          "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/7_of_spades.svg/1200px-7_of_spades.svg.png",
          "https://th.bing.com/th/id/OIP.sy6fc4oHwOx42bIurAXuMQAAAA?pid=ImgDet&rs=1",
          "https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/7_of_diamonds.svg/706px-7_of_diamonds.svg.png",
          //8s
          "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/8_of_hearts.svg/706px-8_of_hearts.svg.png",
          "https://th.bing.com/th/id/OIP.EVeEuFohZaxfOLyKVsfftQHaKv?pid=ImgDet&rs=1",
          "https://th.bing.com/th/id/R8afee604213ca296067245ce18458af2?rik=MrIs8Up%2buv659Q&riu=http%3a%2f%2flivingwithcards.com%2fwp-content%2fuploads%2f2015%2f11%2f8_of_diamonds.png&ehk=htFU6W7YlpwxM5emDgGz0TTYislxaqDzg6uCG%2bQaReA%3d&risl=&pid=ImgRawg",
          "https://th.bing.com/th/id/R126f2af5c775676a8d623d8e8c372c54?rik=t1nidW1U1DW2AQ&riu=http%3a%2f%2fwww.bjinsider.com%2fnewsletter_200_hands_Image183.gif&ehk=7Hm1EFDJQPc04oiLjO%2b%2bEfDyMZc2alzBANrGhtOaC8U%3d&risl=&pid=ImgRaw",
          //9s
          "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/9_of_hearts.svg/530px-9_of_hearts.svg.png",
          "https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/9_of_spades.svg/1200px-9_of_spades.svg.png",
          "https://i.pinimg.com/originals/85/87/33/858733c06bbad34fd862da7a3e7495a0.jpg",
          "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/9_of_diamonds.svg/1200px-9_of_diamonds.svg.png",
          //10
          "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/10_of_hearts.svg/706px-10_of_hearts.svg.png",
          "https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/10_of_spades.svg/1200px-10_of_spades.svg.png",
          "https://i.pinimg.com/736x/19/63/50/1963502749c024e1590789bab3632bc9.jpg",
          "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/10_of_diamonds.svg/331px-10_of_diamonds.svg.png",
          //jack
          "https://allaboutcards.files.wordpress.com/2009/07/jack-hearts.png",
          "https://th.bing.com/th/id/R5600c2f88cf8106a5d53b5ba5f6f0ca1?rik=P5sDGXK9WnzyLw&riu=http%3a%2f%2fallaboutcards.files.wordpress.com%2f2009%2f06%2fjack-spades.png&ehk=zvLTG6SkMke1i6a12zOJg2LFcKcyfkGrCjJMNkNQUMM%3d&risl=&pid=ImgRaw",
          "https://th.bing.com/th/id/R8d72b33a2f4a4e24ebe5eb41979a3ee1?rik=r8YSNp%2fDDRsPcA&riu=http%3a%2f%2fcdn.shopify.com%2fs%2ffiles%2f1%2f0011%2f1492%2ffiles%2fjack-clubs.png%3f1258321008&ehk=aS2OxBRrATo132UlmGaAjcwv0mO1cMw2%2fWout2n390Q%3d&risl=&pid=ImgRaw",
          "https://th.bing.com/th/id/Rcd2d5407a68807233963c5fe6e87c2da?rik=mINesSveU0kxrQ&riu=http%3a%2f%2fwww.yourhandsucks.com%2fwp-content%2fuploads%2f2014%2f02%2fjack_of_diamonds2.png&ehk=i194EFY7k4QtwnFpTOvQelRl9E0g2sZQCLwljO9fa%2bA%3d&risl=&pid=ImgRaw",
          //queen
          "https://th.bing.com/th/id/R15e43a712ac44407d23c437b0a5b43bc?rik=owXOaoa1K9k1hw&riu=http%3a%2f%2fwww.madore.org%2f%7edavid%2fimages%2fcards%2fenglish%2fqueen-hearts.png&ehk=ObI7ptH3rqsbSRCMH%2baABEIOJXiXCpxbYjPJ%2bfvyigs%3d&risl=&pid=ImgRaw",
          "https://th.bing.com/th/id/R64fe3aaedd0cd7e7a89f15127bbcc3f4?rik=uHjybocezHLOsg&riu=http%3a%2f%2fwww.madore.org%2f%7edavid%2fimages%2fcards%2fenglish%2fqueen-spades.png&ehk=98N17z%2b9%2bJQjnFlxx%2fNp1451BP96G2RyebWPZ641fb4%3d&risl=&pid=ImgRaw",
          "https://th.bing.com/th/id/OIP.kRVAc4rPj5Dq2HeRTsAiuQAAAA?pid=ImgDet&w=356&h=481&rs=1",
          "https://media.istockphoto.com/vectors/queen-of-diamonds-two-playing-card-vector-id165550320?k=6&m=165550320&s=170667a&w=0&h=Qs9vrg6z20th13aCt72gEsqY8PFq9JBH3eQAWAOEFv4=",
          //king
          "https://qph.fs.quoracdn.net/main-qimg-eab4b6397f96304924dee151db1d78a1",
          "https://th.bing.com/th/id/Rc08825396cc0a457adfe933afcd2b515?rik=VEmnORgCPTi5MA&riu=http%3a%2f%2fwww.madore.org%2f%7edavid%2fimages%2fcards%2fenglish%2fking-spades.png&ehk=nMaRQOyNn5V71Sc0qLYGxGiRWXi67KQrpvURsEUkQeU%3d&risl=&pid=ImgRaw",
          "https://upload.wikimedia.org/wikipedia/commons/3/39/Cardset1-ck.jpg",
          "https://th.bing.com/th/id/OIP._ChT7o4G-SsSV5zk5tJUygHaKA?pid=ImgDet&rs=1"
        ];
        for (let suite in suites) {
            for (let value in values) {
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
      console.log("==============================");
      console.log(this.discard);
      //////////////////!!!!!NEEDS TO BE TESTED
      if(this.CheckEmpty()){ // f main is empty, shuffle discard back to main
          for(let id1 = 0; id1 < this.discard.length; id1++){
              for(let id2 = id1 + 1; id2 < this.discard.length; id2++){
                  if(this.discard[id1].value == this.discard[id2].value &&
                     this.discard[id1].suite == this.discard[id2].suite){
                        this.discard[id1] == null;
                  }
              }
          }
          for(let cur in this.discard){
              if(this.discard[cur] == null){
                  this.deck.splice(cur, 1);
              }
          }
          this.deck = this.discard;
          this.discard.length = 0;
          this.shuffle();
      }
    }
    Draw(){
        if(this.deck.length > 0){
            this.returnCard = this.deck[0];
            this.deck.splice(0, 1); // draws from the beginning of the array and removes it afterwards
            return(this.returnCard);
        }
        else{
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
