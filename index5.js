const Deck = require("./cards.js");
let express = require('express');
let path = require("path");
let app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static("./public"));

let myDeck = new Deck();
 // settings variables
let playerCount = 0;
let playerSetNum = 1; // set this to the player num when game is created
let playerList = []; // boolean array
let playerName = []; // string array
let playerHands = []; // array of Card object arrays
let numActive = 0;
let handNum = 0;

const defaultName = "Virtual Cards";
let gameName = "Virtual Cards";
//let deckSize = 52;
let gameActive = false;
let chat = []; // string array

app.get("/",function(req,res) {
    numActive = 0;
    res.sendFile(__dirname + "/public/views/index.html");
    //res.json({gamename:gameName,handnum:handNum,playernum:playerSetNum});
});
app.get("/start",function(req,res) {
    res.json({gamename:gameName,handnum:handNum,playernum:playerSetNum});
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////
app.get("/player",function(req,res) {
    if(!gameActive){
        res.end(" 404 Game Not Found");
    }
    else if(numActive >= playerSetNum){
        res.end("Error! Player Count Exceeded");
    }
    else{
        res.sendFile(__dirname + "/public/views/player.html");
        let indexFound = false;
        for(let i = 0; i < playerList.length; i++){
            if(playerList[i] == false && indexFound == false){
                //playerList[i] = true;
                playerId = ++i;
                indexFound = true;
            }
        }
    }
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////
app.get("/player2",function(req,res) { // called when player doc loads
      numActive++;
      playerList[--playerId] = true;
      let ident = req.query.id;
      if(req.query.index == 1){ // index = 1 is a newly joined player
          ident = ++playerId;
          let hand = [];
          hand.length = 0;
          if(handNum !=0){
              if(playerHands[ident-1].length == 0){ // if the player has no existing hand - give them the amount for a starting hand
                  for(let i = 0; i < handNum;i++){
                      hand[i] = myDeck.Draw(); //calling a method in the cards.js class
                  }
                  for(let i = 0; i < hand.length;i++){
                      if(hand[i] == null){
                          hand.splice(i, 1); // removing null cards
                      }
                  }
                  playerHands[ident-1] = hand;
              }
              //////////////////////////////////////////////////// CODE THAT REMEMBER'S THE PLAYER'S HAND
              else if(playerHands[ident-1] != null){ // if they were already playing, this will send them back their existing hand
                hand = playerHands[ident-1];
              }
              ////////////////////////////////////////////////////
          }
          else{
              playerHands[ident-1] = hand;
          }
          res.json({id:ident,gamename:gameName,hand:hand});
      }
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////
app.get("/indexCheck",function(req,res) {
    let numTrue = 0;
    let maxHand = 1;
    for(let i = 0; i < playerList.length; i++){
        if(playerList[i] == true)
            numTrue++;
    }
    numActive = numTrue;
    //////////////////////////////////////////////////
    maxHand = parseInt(myDeck.deck.length/req.query.playernum);
    res.json({active:numActive,maxhand:maxHand, gameactive:gameActive});
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////
app.get("/checkplayer", function(req,res){
    if(req.query.active == 0){
      numActive--;
      playerList[req.query.id] = false; // player inactive
      playerName[req.query.id] = "empty";
      // ///////////////// CODE THAT REMOVES PLAYER'S CARDS WHEN THEY LEAVE
      // myDeck.ReturnHand(playerHands[req.query.id]);
      // playerHands[req.query.id].length = 0;
      // /////////////////
    }
    else if(req.query.active == 1){
      playerList[req.query.id] = true; // player is active
      playerName[req.query.id] = req.query.playername;
      let empty = myDeck.CheckEmpty();
      res.json({gamename:gameName,chat:chat,empty:empty});
    }
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////
app.get("/end", function(req,res){
    if(gameActive == false){
      res.json({error:2});
      return;
    }
    myDeck = new Deck();
    gameActive = false;
    chat.length = 0;
    for(let i = 0; i<playerHands.length; i++){
        playerHands[i].length = 0;
    }
    res.json({error:5});
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////
app.get("/drawcard",function(req,res) {
    let cards = [];
    for(let i = 0; i < req.query.num;i++){
        cards[cards.length] = myDeck.Draw(); //calling a method in the cards.js class
    }
    for(let i = 0; i < cards.length;i++){
        if(cards[i] == null){
            cards.splice(i, 1); // removing null cards
        }
        else{ // if not null, add it to the list
            playerHands[req.query.id][playerHands[req.query.id].length] = cards[i];
        }
    }
    //console.log(playerHands);
    res.json({cards:cards});
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////
app.post("/create",function(req,res) {
    if(req.body.playernum * req.body.handnum > myDeck.deck.length){
        res.json({error:1});
        return;
    }
    if(validString(req.body.name) == false){
        res.json({error:4});
        return;
    }
    if(gameActive == true){
      res.json({error:6});
      return;
    }
    //////////////////////////////////////
   gameActive = true;
    myDeck = new Deck();
    myDeck.shuffle();
    playerSetNum = req.body.playernum;
    playerName.length = playerSetNum;
    for(let i = 0; i<playerName.length; i++){
        playerName[i] = "empty";
    }

    playerList.length = playerSetNum;
    for(let i = 0; i<playerList.length; i++){
        playerList[i] = false;
    }
    handNum = req.body.handnum;
    playerHands.length = playerSetNum;
    for(let i = 0; i<playerHands.length; i++){
          let hand = [];
          hand.length = 0;
          if(handNum !=0){
              for(let i = 0; i < handNum;i++){
                  hand[i] = myDeck.Draw(); //calling a method in the cards.js class
              }
              for(let i = 0; i < hand.length;i++){
                  if(hand[i] == null){
                      hand.splice(i, 1); // removing null cards
                  }
              }
              playerHands[i] = hand;
          }
          else{
              playerHands[i] = hand;
          }
    }
    //clears chat
    chat.length = 0;
    if(/^[ ]*[ ]*$/.test(req.body.name) == true){
        gameName = defaultName;
    }
    else{
        gameName = req.body.name;
    }
    res.json({error:0});
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////
app.post("/update",function(req,res) {
    if(!gameActive){
        res.json({error:2});
        return;
    }
    if(validString(req.body.name) == false){
        res.json({error:4});
        return;
    }
    //////////////////////////////////////
    if(/^[ ]*[ ]*$/.test(req.body.name) == true){
        gameName = defaultName;
    }
    else{
        gameName = req.body.name;
    }
    res.json({error:3});
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////
app.post("/chat",function(req,res) {
    chat[chat.length] = req.body.line;
    res.json({chat:chat});
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////
app.post("/totable",function(req,res) {

});
/////////////////////////////////////////////////////////////////////////////////////////////////////////
app.post("/discard",function(req,res) {

});
/////////////////////////////////////////////////////////////////////////////////////////////////////////
function validString(string) {
    let regex =  /^[A-Za-z0-9 ]*[A-Za-z0-9 ]*$/;
    let  validString = regex.test(string);
    return (validString);
 }
/////////////////////////////////////////////////////////////////////////////////////////////////////////
app.listen(4005,function(){
    console.log("started on port 4005");
});
