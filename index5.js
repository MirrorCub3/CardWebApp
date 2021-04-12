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

let chat = [];

app.get("/",function(req,res) {
    numActive = 0;
    chat.length = 0;
    res.sendFile(__dirname + "/public/views/index.html");
});
app.get("/player",function(req,res) {
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
                console.log(playerId)
                indexFound = true;
            }
        }
    }
});
app.get("/player2",function(req,res) {
      let ident = req.query.id;
      if(req.query.index == 1){
          res.json({id:ident,gamename:gameName});
      }
});
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
app.get("/checkplayer", function(req,res){
    if(req.query.active == 0){
      numActive--;
      playerList[req.query.id - 1] = false; // player inactive
    }
    else if(req.query.active == 1){
      playerList[req.query.id - 1] = true; // player is active
      res.json({gamename:gameName,chat:chat});
    }
});
app.post("/create",function(req,res) {
    if(req.body.playernum * req.body.handnum > deckSize){
        res.json({error:1});
        return;
    }
    playerSetNum = req.body.playernum;

    playerList.length = playerSetNum;
    for(let i = 0; i<playerList.length; i++){
        playerList[i] = false;
    }
    handNum = req.body.handnum;
    //clears chat
    chat.length = 0;
    gameName = req.body.name;
    res.json({error:0});
});
app.post("/chat",function(req,res) {
    chat[chat.length] = req.body.line;
    res.json({chat:chat});
});
app.listen(4005,function(){
    console.log("started on port 4005");
});
