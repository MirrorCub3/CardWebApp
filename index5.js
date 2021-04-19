let express = require('express');
let path = require("path");
let app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static("./public"));

 // settings variables
let playerCount = 0;
let playerSetNum = 0; // set this to the player num when game is created
let playerList = [];
let numActive = 0;
let handNum = 1;

let gameName = "Virtual Cards";
let deckSize = 52;

let pileNames = [];

let newGame = false;
let chat = [];

app.get("/",function(req,res) {
    newGame = false;
    numActive = 0;
    chat.length = 0;
    pileNames.length = 0;
    res.sendFile(__dirname + "/public/views/index.html");
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////
app.get("/player",function(req,res) {
    if(!newGame){
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
      if(req.query.index == 1){
          ident = playerId;
          res.json({id:ident,gamename:gameName,pilenames:pileNames});
      }
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////
app.get("/indexCheck",function(req,res) {
    let numTrue = 0;
    for(let i = 0; i < playerList.length; i++){
        // console.log("player " + i + " " + playerList[i]);
        if(playerList[i] == true)
            numTrue++;
    }
    numActive = numTrue;
    //console.log("numActive " + numActive);
    res.json({active:numActive});
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////
app.get("/checkplayer", function(req,res){
    if(req.query.active == 0){
      numActive--;
      playerList[req.query.id - 1] = false; // player inactive
    }
    else if(req.query.active == 1){
      playerList[req.query.id - 1] = true; // player is active
      res.json({gamename:gameName,chat:chat,pilenames:pileNames});
    }
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////
app.post("/create",function(req,res) {
    if(req.body.playernum * req.body.handnum > deckSize){
        res.json({error:1});
        return;
    }
    if(validString(req.body.name) == false){
        res.json({error:4});
        return;
    }
    //////////////////////////////////////
    newGame = true;
    playerSetNum = req.body.playernum;

    playerList.length = playerSetNum;
<<<<<<< Updated upstream
    for(let i = 0; i<playerList.length; i++){
        playerList[i] = false;
=======
    handNum = req.body.handnum;
    for(let i = 0; i< playerSetNum; i++){
        let hand = []; hand.length = 0;
        playerList[i] = new Player(i);
        playerList[i].name = "";
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
>>>>>>> Stashed changes
    }
    handNum = req.body.handnum;
    //clears chat
    chat.length = 0;
    if(req.body.pilenum !=0){
        pileNames.length = 0;
        for(let i = 0; i< req.body.pilenames.length; i++){
            if(validString(req.body.pilenames[i]) == false){
                res.json({error:4});
                return;
            }
            pileNames[i] = req.body.pilenames[i];
        }
    }
    gameName = req.body.name;
    res.json({error:0});
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////
app.post("/update",function(req,res) {
    if(req.body.playernum * req.body.handnum > deckSize){
        res.json({error:1});
        return;
    }
    if(!newGame){
        res.json({error:2});
        return;
    }
    if(validString(req.body.name) == false){
        res.json({error:4});
        return;
    }
    //////////////////////////////////////
    playerSetNum = req.body.playernum;

    playerList.length = playerSetNum;
    for(let i = 0; i<playerList.length; i++){
        playerList[i] = false;
    }
    handNum = req.body.handnum;

    if(req.body.pilenum !=0){
        pileNames.length = 0;
        for(let i = 0; i< req.body.pilenames.length; i++){
            if(validString(req.body.pilenames[i]) == false){
                res.json({error:4});
                return;
            }
            pileNames[i] = req.body.pilenames[i];
        }
    }

    gameName = req.body.name;
    res.json({error:3});
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////
app.post("/chat",function(req,res) {
    chat[chat.length] = req.body.line;
    res.json({chat:chat});
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////
<<<<<<< Updated upstream
=======
app.post("/totable",function(req,res) {

});
/////////////////////////////////////////////////////////////////////////////////////////////////////////
app.post("/discard",function(req,res) {
    if(!req.body.card)
        return
    let id = parseInt(req.body.id);
    let card = req.body.card;
    let index = playerList[id].hand.FindIndex(card,playerList[id].hand);
    console.log(index);
    if(index != -1){
        playerList[id].hand.splice(index, 1);
    }
    res.json({hand:playerList[id].hand});
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////
>>>>>>> Stashed changes
function validString(string) {
    let regex =  /^[A-Za-z0-9 ]*[A-Za-z0-9 ]*$/;
    let  validString = regex.test(string);
    return (validString);
 }
/////////////////////////////////////////////////////////////////////////////////////////////////////////
app.listen(4005,function(){
    console.log("started on port 4005");
});
