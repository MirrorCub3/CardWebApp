const Deck = require("./cards.js");
const Player = require("./playerObject.js");
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
let playerList = []; // Player object array
let numActive = 0;
let handNum = 0;
let openIndex = 0;

const defaultName = "Virtual Cards";
let gameName = "Virtual Cards";
//let deckSize = 52;
let gameActive = false;
let chat = []; // string array

app.get("/",function(req,res) {
    numActive = 0;
    res.sendFile(__dirname + "/public/views/index.html");
});
app.get("/start",function(req,res) { // loads saved data into the page
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
    }
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////
app.get("/player2",function(req,res) { // called when player doc loads
      if(openIndex >= playerList.length)
          return;
      playerList[openIndex].active = true;
      //console.log(playerList[openIndex].hand);
      res.json({id:playerList[openIndex].id,realid:playerList[openIndex].realId,gamename:gameName,hand:playerList[openIndex].hand});
      openIndex++;
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////
app.get("/indexCheck",function(req,res) {
    if(gameActive){
        let numTrue = 0;
        for(let player in playerList){
            if(playerList[player].active == true)
                numTrue += 1;
        }
        numActive = numTrue;
    }
    //////////////////////////////////////////////////
    let maxHand = 1;
    maxHand = parseInt(myDeck.deck.length/req.query.playernum);
    res.json({active:numActive,maxhand:maxHand, gameactive:gameActive});
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////
app.get("/checkplayer", function(req,res){
    if(!gameActive)
      return;
    if(req.query.active == 0){
      playerList[req.query.id].active = false; // player inactive
      playerList[req.query.id].name = "empty";
      if(req.query.id < openIndex)
          openIndex = req.query.id;
      // ///////////////// CODE THAT REMOVES PLAYER'S CARDS WHEN THEY LEAVE - UNTESTED
      // myDeck.ReturnHand(playerList[req.query.id].hand);
      // playerList[req.query.id].hand.length = 0;
      // /////////////////
    }
    else if(req.query.active == 1){
      playerList[req.query.id].active = true; // player is active
      playerList[req.query.id].name = req.query.playername;
      res.json({gamename:gameName,chat:chat,empty:myDeck.CheckEmpty(),gameactive:gameActive});
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
    numActive = 0;
    chat.length = 0;
    for(let player in playerList){
        playerList[player].defaultState(player);
    }
    res.json({error:5});
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////
app.get("/drawcard",function(req,res) {
    let cards = [];
    for(let x = 0; x < req.query.num;x++){
        cards[cards.length] = myDeck.Draw(); //calling a method in the cards.js class
    }
    for(let card in cards){
        if(cards[card] == null){
            cards.splice(card, 1); // removing null cards
        }
        let myHand = playerList[req.query.id];
        myHand.hand[myHand.hand.length] = cards[card];
    }
    res.json({cards:playerList[req.query.id].hand});
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
    playerList.length = playerSetNum;
    handNum = req.body.handnum;
    for(let i = 0; i< playerSetNum; i++){
        let hand = []; hand.length = 0;
        playerList[i] = new Player(i);
        playerList[i].name = "empty";
        if(handNum !=0){
            for(let x = 0; x < handNum ;x++){
                hand[x] = myDeck.Draw(); //calling a method in the cards.js class
            }
            for(let card in hand){
                if(hand[card] == null){
                    hand.splice(card, 1); // removing null cards
                }
            }
            playerList[i].hand = hand;
        }
        else{
            playerList[i].hand = hand;
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
