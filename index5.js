let express = require('express');
let path = require("path");
let app = express();
var bodyParser = require('body-parser');
var routes = require("./routes");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static("./public"));

app.use(routes);
// let myDeck = new Deck();
//  // settings variables
// let playerCount = 0;
// let playerSetNum = 1; // set this to the player num when game is created
// let playerList = []; // Player object array
// let numActive = 0;
// let handNum = 0;
// let openIndex = 0;
//
// const defaultName = "Virtual Cards";
// let gameName = "Virtual Cards";
// //let deckSize = 52;
// let gameActive = false;
// let chat = []; // string array
//
// app.get("/",function(req,res) {
//     numActive = 0;
//     res.sendFile(__dirname + "/public/views/index.html");
// });
// app.get("/start",function(req,res) { // loads saved data into the page
//     res.json({gamename:gameName,handnum:handNum,playernum:playerSetNum});
// });
// /////////////////////////////////////////////////////////////////////////////////////////////////////////
// app.get("/player",function(req,res) {
//     if(!gameActive){
//         res.end(" 404 Game Not Found");
//     }
//     else if(numActive >= playerSetNum){
//         res.end("Error! Player Count Exceeded");
//     }
//     else{
//         res.sendFile(__dirname + "/public/views/player.html");
//     }
// });
// /////////////////////////////////////////////////////////////////////////////////////////////////////////
// app.get("/player2",function(req,res) { // called when player doc loads
//       if(openIndex >= playerList.length){
//         res.write('Error! Player Count Exceeded');
//         res.end();
//         return;
//       }
//       playerList[openIndex].setActive(true);
//       //console.log(playerList[openIndex].hand);
//       res.json({id:playerList[openIndex].id,realid:playerList[openIndex].realId,gamename:gameName,hand:playerList[openIndex].hand});
//       openIndex++;
//       //console.log(openIndex);
// });
// /////////////////////////////////////////////////////////////////////////////////////////////////////////
// app.get("/indexCheck",function(req,res) {
//     numActive = 0;
//     if(gameActive){
//         let numTrue = 0;
//         for(let player in playerList){
//             if(playerList[player].active){
//                 numTrue++;
//             }
//         }
//         //console.log(numTrue);
//         //console.log(playerList);
//         numActive = numTrue;
//     }
//     //////////////////////////////////////////////////
//     let maxHand = 1;
//     maxHand = parseInt(myDeck.deck.length/req.query.playernum);
//     res.json({active:numActive,maxhand:maxHand, gameactive:gameActive});
// });
// /////////////////////////////////////////////////////////////////////////////////////////////////////////
// app.get("/checkplayer", function(req,res){
//     if(!gameActive){
//       return;
//     }
//     let active = parseInt(req.query.active);
//     let id = parseInt(req.query.id);
//     if(active == 0){
//         playerList[id].setActive(false); // player inactive
//         numActive--;
//         //playerList[req.query.id].name = "empty";
//         if(id < openIndex){openIndex = id;}
//         // ///////////////// CODE THAT REMOVES PLAYER'S CARDS WHEN THEY LEAVE - UNTESTED
//         // myDeck.ReturnHand(playerList[req.query.id].hand);
//         // playerList[req.query.id].hand.length = 0;
//         // /////////////////
//     }
//     else if(active == 1){
//         //playerList[id].setActive(true); // player is active
//         let otherPlayers = [];
//         otherPlayers.length = 0;
//         for(let x in playerList){
//             if(x != id){
//                 otherPlayers[otherPlayers.length] = playerList[x];
//             }
//         }
//         playerList[id].name = req.query.playername;
//         res.json({gamename:gameName,chat:chat,empty:myDeck.CheckEmpty(),gameactive:gameActive,others:otherPlayers});
//     }
//     //console.log(req.query.id + " " + playerList[req.query.id].active);
// });
// /////////////////////////////////////////////////////////////////////////////////////////////////////////
// app.get("/end", function(req,res){
//     if(gameActive == false){
//       res.json({error:2});
//       return;
//     }
//     myDeck = new Deck();
//     gameActive = false;
//     numActive = 0;
//     chat.length = 0;
//     openIndex = 0;
//     console.log(playerList);
//     playerList.length = 0;
//     // for(let player in playerList){
//     //     playerList[player].defaultState(player);
//     // }
//     res.json({error:5});
// });
// /////////////////////////////////////////////////////////////////////////////////////////////////////////
// app.get("/drawcard",function(req,res) {
//     if(myDeck.CheckEmpty()){
//         res.json(null);
//         return;
//     }
//     let cards = [];
//     for(let x = 0; x < req.query.num;x++){
//         cards[cards.length] = myDeck.Draw(); //calling a method in the cards.js class
//     }
//     for(let card in cards){
//         if(cards[card] == null){
//             cards.splice(card, 1); // removing null cards
//         }
//         console.log(cards);
//         let myHand = playerList[req.query.id];
//         myHand.hand[myHand.hand.length] = cards[card];
//     }
//     res.json({cards:playerList[req.query.id].hand});
// });
// /////////////////////////////////////////////////////////////////////////////////////////////////////////
// app.post("/create",function(req,res) {
//     if(req.body.playernum * req.body.handnum > myDeck.deck.length){
//         res.json({error:1});
//         return;
//     }
//     if(validString(req.body.name) == false){
//         res.json({error:4});
//         return;
//     }
//     if(gameActive == true){
//       res.json({error:6});
//       return;
//     }
//     //////////////////////////////////////
//     openIndex = 0;
//     gameActive = true;
//     myDeck = new Deck();
//     myDeck.shuffle();
//     playerSetNum = req.body.playernum;
//     playerList.length = playerSetNum;
//     handNum = req.body.handnum;
//     for(let i = 0; i< playerSetNum; i++){
//         let hand = []; hand.length = 0;
//         playerList[i] = new Player(i);
//         playerList[i].name = "empty";
//         if(handNum !=0){
//             for(let x = 0; x < handNum ;x++){
//                 hand[x] = myDeck.Draw(); //calling a method in the cards.js class
//             }
//             for(let card in hand){
//                 if(hand[card] == null){
//                     hand.splice(card, 1); // removing null cards
//                 }
//             }
//             playerList[i].hand = hand;
//         }
//         else{
//             playerList[i].hand = hand;
//         }
//     }
//     //clears chat
//     chat.length = 0;
//     if(/^[ ]*[ ]*$/.test(req.body.name) == true){
//         gameName = defaultName;
//     }
//     else{
//         gameName = req.body.name;
//     }
//     res.json({error:0});
// });
// /////////////////////////////////////////////////////////////////////////////////////////////////////////
// app.post("/update",function(req,res) {
//     if(!gameActive){
//         res.json({error:2});
//         return;
//     }
//     if(validString(req.body.name) == false){
//         res.json({error:4});
//         return;
//     }
//     //////////////////////////////////////
//     if(/^[ ]*[ ]*$/.test(req.body.name) == true){
//         gameName = defaultName;
//     }
//     else{
//         gameName = req.body.name;
//     }
//     res.json({error:3});
// });
// /////////////////////////////////////////////////////////////////////////////////////////////////////////
// app.post("/chat",function(req,res) {
//     chat[chat.length] = req.body.line;
//     res.json({chat:chat});
// });
// /////////////////////////////////////////////////////////////////////////////////////////////////////////
// app.post("/totable",function(req,res) {
//
// });
// /////////////////////////////////////////////////////////////////////////////////////////////////////////
// app.post("/discard",function(req,res) {
//     if(!req.body.card)
//         return
//     let id = parseInt(req.body.id);
//     let card = req.body.card;
//     let index = myDeck.FindIndex(card,playerList[id].hand);
//     console.log(index);
//     if(index != -1){
//         playerList[id].hand.splice(index, 1);
//     }
//     res.json({hand:playerList[id].hand});
// });
// /////////////////////////////////////////////////////////////////////////////////////////////////////////
// function validString(string) {
//     let regex =  /^[A-Za-z0-9 ]*[A-Za-z0-9 ]*$/;
//     let  validString = regex.test(string);
//     return (validString);
//  }
/////////////////////////////////////////////////////////////////////////////////////////////////////////
let port = process.env.PORT || 4005;
app.listen(port,function(){
    console.log("started on port " + port);
});
