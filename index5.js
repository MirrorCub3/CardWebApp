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
    if(numActive >= playerSetNum){
        res.end("Error! Player Count Exceeded");
    }
    else{
        res.sendFile(__dirname + "/public/views/player.html");
        numActive++;
        let indexFound = false;
        for(let i = 0; i < playerList.length; i++){
            if(playerList[i] == false && indexFound == false){
                playerList[i] = true;
                playerId = ++i;
                indexFound = true;
            }
        }
    }
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////
app.get("/player2",function(req,res) { // called when player doc loads
      let ident = req.query.id;
      if(req.query.index == 1){ // index = 1 is a newly joined player
          ident = playerId;
          let hand = [];
          if(handNum !=0){
              if(playerHands[ident-1] == null){ // if the player has no existing hand - give them the amount for a starting hand
                  for(let i = 0; i < handNum;i++){
                      hand[i] = myDeck.Draw(); //calling a method in the cards.js class
                  }
                  playerHands[ident-1] = hand;
              }
              else if(playerHands[ident-1] != null){ // if they were already playing, this will send them back their existing hand
                hand =   playerHands[ident-1];
              }
          }
          else{
              playerHands[ident-1] = null;
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
    res.json({active:numActive,maxhand:maxHand});
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////
app.get("/checkplayer", function(req,res){
    if(req.query.active == 0){
      numActive--;
      playerList[req.query.id] = false; // player inactive
      playerName[req.query.id] = "empty";
    }
    else if(req.query.active == 1){
      playerList[req.query.id] = true; // player is active
      playerName[req.query.id] = req.query.playername;
      res.json({gamename:gameName,chat:chat});
    }
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////
app.get("/end", function(req,res){
    if(gameActive == false){
      res.json({error:2});
      return;
    }
   gameActive = false;
    chat.length = 0;
    res.json({error:5});
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////
app.get("/drawcard",function(req,res) {
    let cards = [];
    
    res.json({hand:hand});
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
        playerHands[i] = null;
    }
    //clears chat
    chat.length = 0;
    if(req.body.name != ""){
        gameName = req.body.name;
    }
    else{
        gameName = defaultName;
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
    if(req.body.name != ""){
        gameName = req.body.name;
    }
    else{
        gameName = defaultName;
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
