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
let handNum = 1;

let gameName = "Virtual Cards";
let deckSize = 52;

app.get("/",function(req,res) {
    playerCount = 0;
    res.sendFile(__dirname + "/public/views/index.html");
});
app.get("/player",function(req,res) {
    if(playerCount >= playerSetNum){
        res.end("Error! Player Count Exceeded");}
    else{
        res.sendFile(__dirname + "/public/views/player.html");
        playerCount += 1;
    }
});
app.post("/create",function(req,res) {
    if(req.body.playernum * req.body.handnum > deckSize){
        alert("Invalid Starting Hand: Not Enough Cards");
        return;
    }
    playerSetNum = req.body.playernum;
    handNum = req.body.handnum;

    gameName = req.body.name;
    res.json(null);
});

app.listen(3000,function(){
    console.log("started on port 3000");
});
