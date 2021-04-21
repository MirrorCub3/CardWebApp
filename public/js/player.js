// client js
let myHand = [];
let id = 1;
let realId = 0;
let others = [];

let shownHand = [];
let showId = -3;
let tableHand = [];
function SendMessage(){
    let chat = (document.getElementById("nameset").value + ": " + document.getElementById("sendMessage").value );
    $.post("/chat", {line:chat},function(data){
      document.getElementById("sendMessage").value = "";
    });
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////
function DrawCard(){
    $.get("/drawcard", {num:1,id:realId},function(data){
        if(!data)
          return;
        myHand = data.cards;
        console.log("draw success");
        console.log(myHand);

        let x = showId;
        shownHand.length = 0;
        while(shownHand.length < 7){
            if(x < 0){
                shownHand[shownHand.length] = null;
                x++;
            }
            else{
                if(x < myHand.length){
                    shownHand[shownHand.length] = myHand[x];
                    x++;
                }
                else{
                    shownHand[shownHand.length] = null;
                }
            }
        }
        console.log(shownHand);
    });
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////
function ToTable(){
    console.log("table");
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////
function Discard(){
    //////////////code here to determine card selected
    if(myHand.length ==0)
        return;
    let card = null;
    card = shownHand[3];
    if(shownHand[3] == null)
        return;
    $.post("/discard", {id:realId,card:card},function(data){
        if(!data)
          return;
        myHand = data.hand;
        console.log("discard success");
        console.log(myHand);

        let x = showId;
        shownHand.length = 0;
        while(shownHand.length < 7){
            if(x < 0){
                shownHand[shownHand.length] = null;
                x++;
            }
            else{
                if(x < myHand.length){
                    shownHand[shownHand.length] = myHand[x];
                    x++;
                }
                else{
                    shownHand[shownHand.length] = null;
                }
            }
        }
        console.log(shownHand);
    });
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////
function sucessInfo(data){
    if(!data)
        return;
    id = parseInt(data.id);
    realId = parseInt(data.realid);
    console.log(id + " " + realId);
    document.getElementById("nameset").value = "Player " + id;
    document.getElementById("playerId").innerHTML = "PLAYER " + id;
    document.getElementById("gameName").innerHTML = data.gamename;
    myHand = data.hand;
    console.log(myHand);

    let x = showId;
    shownHand.length = 0;
    while(shownHand.length < 7){
        if(x < 0){
            shownHand[shownHand.length] = null;
            x++;
        }
        else{
            if(x < myHand.length){
                shownHand[shownHand.length] = myHand[x];
                x++;
            }
            else{
                shownHand[shownHand.length] = null;
            }
        }
    }
    console.log(shownHand);
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////
$(document).ready(function(){
    console.log("player ready");
    //$.get("/player2", {index:1,id:id},sucessInfo);
    $.get("/player2",sucessInfo);
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////
window.addEventListener('beforeunload',function () {
    $.get("/checkplayer", {active:0,id:realId});
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////
playerCheck();
function playerCheck() {
    $.get("/checkplayer", {active:1,id:realId,playername:$("#nameset").val()},function(data){
        others = data.others;
        //if(data.gameActive == false){  window.location.reload(true);}
        document.getElementById("gameName").innerHTML = data.gamename;
        document.getElementById("chatbox").innerHTML = "";
        for(let i = 0; i < data.chat.length;i++){
            document.getElementById("chatbox").innerHTML +=  data.chat[i] + "\n";
        }
        if(data.empty == true){
          $("#main").val("Empty");
          $('#main').attr("disabled", true);
          $('#main').attr( 'title',"There are 0 cards in the Main Deck");
        }
        else if(data.empty == false){
          $("#main").val("Draw Card");
          $('#main').removeAttr("disabled");
          $('#main').attr( 'title',"Draw one card");
        }
        // update opponesnt card hand here
    });
    let numMilliSeconds = 500;
    setTimeout(playerCheck, numMilliSeconds);
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////
//clear box that is replaced by cards whgen window is loaded so that i change the holding place image link instead of changing the acutal card's src/image

//these card holders are for the players hand (not on the table that shows others players card placements)
  let tempCard1 = new Image()
  tempCard1.src  =  "/views/clear.png"

    let tempCard2 = new Image()
  tempCard2.src  =  "/views/clear.png"

    let tempCard3 = new Image()
  tempCard3.src  =  "/views/clear.png"

    let tempCard4 = new Image()
  tempCard4.src  =  "/views/clear.png"

    let tempCard5 = new Image()
  tempCard5.src  =  "/views/clear.png"

    let tempCard6 = new Image()
  tempCard6.src  =  "/views/clear.png"

    let tempCard7 = new Image()
  tempCard7.src  =  "/views/clear.png"

    let tempCard8 = new Image()
  tempCard8.src  =  "/views/clear.png"


//card holders for other players  table (turn into arrays that are made in loops for sake of space??)
//left of table
    let tempCard9 = new Image()
  tempCard9.src  =  "/views/clear.png"

    let tempCard10 = new Image()
  tempCard10.src  =  "/views/clear.png"

    let tempCard11 = new Image()
  tempCard11.src  =  "/views/clear.png"

//middle of table
    let tempCard12 = new Image()
  tempCard12.src  =  "/views/clear.png"

    let tempCard13 = new Image()
  tempCard13.src  =  "/views/clear.png"

    let tempCard14 = new Image()
  tempCard14.src  =  "/views/clear.png"

//right of table
    let tempCard15 = new Image()
  tempCard15.src  =  "/views/clear.png"

    let tempCard16 = new Image()
  tempCard16.src  =  "/views/clear.png"

    let tempCard17 = new Image()
  tempCard17.src  =  "/views/clear.png"

  //players table
 let tempCard18 = new Image()
  tempCard18.src  =  "/views/clear.png"

    let tempCard19 = new Image()
  tempCard19.src  =  "/views/clear.png"

    let tempCard20 = new Image()
  tempCard20.src  =  "/views/clear.png"

//setting window width and height
 window.innerWidth = 1920
  window.innerHeight = 1015



window.addEventListener('load', eventWindowLoaded, false);
function eventWindowLoaded() {
   canvasApp();
   //change card holder to acutal card
   //players hand cards
        // if(shownHand[0]!=null)
        //     tempCard1.src = shownHand[0].image.replace('90x90', '225x225');
        // if(shownHand[1]!=null)
        //     tempCard2.src = shownHand[1].image.replace('90x90', '225x225');
        // if(shownHand[2]!=null)
        //     tempCard3.src = shownHand[2].image.replace('90x90', '225x225')
        // if(shownHand[3]!=null)
        //     tempCard4.src = shownHand[3].image.replace('90x90', '225x225');
        // if(shownHand[4]!=null)
        //     tempCard6.src = shownHand[4].image.replace('90x90', '225x225')
        // if(shownHand[5]!=null)
        //     tempCard7.src = shownHand[5].image.replace('90x90', '225x225');
        // if(shownHand[6]!=null)
        //     tempCard8.src = shownHand[6].image.replace('90x90', '225x225');

//table cards (other players)
//         tempCard9.src = jackHearts.replace('90x90', '225x225');
//         tempCard10.src = jackSpades.replace('90x90', '225x225');
//         tempCard11.src = jackDiamonds.replace('90x90', '225x225')
//         tempCard12.src = jackClovers.replace('90x90', '225x225')
//         tempCard13.src = aceHearts.replace('90x90', '225x225');
//         tempCard14.src = aceSpades.replace('90x90', '225x225')
//         tempCard15.src = aceDiamonds.replace('90x90', '225x225');
//         tempCard16.src = aceClovers.replace('90x90', '225x225');
//         tempCard17.src = twoHearts.replace('90x90', '225x225');
//
// //table for player (not other players)
//         tempCard18.src = twoClover.replace('90x90', '225x225');
//         tempCard19.src = twoDiamonds.replace('90x90', '225x225');
//         tempCard20.src = twoSpades.replace('90x90', '225x225');


}

function Create2DArray(rows) {
  var arr = [];

  for (var i=0;i<rows;i++) {
     arr[i] = [];
  }

  return arr;
}


function canvasApp(){


   var theCanvas = document.getElementById("canvas");
theCanvas.addEventListener("mousemove",onMouseMove,false);
theCanvas.addEventListener("click",onMouseClick,false);


   if (!theCanvas || !theCanvas.getContext) {
      return;
   }


   var context = theCanvas.getContext("2d");
theCanvas.width =   window.innerWidth-360
theCanvas.height = window.innerHeight-300
theCanvas.style.left =  window.innerHeight-(window.innerHeight-430) + "px"
theCanvas.style.top = "20px"


   if (!context) {
      return;
   }

   //canvasApp level variables
   var keyPressList = [];
  // var windowWidth = 400;
 //  var windowHeight = 400;
   var mouseX = 0;
   var mouseY = 0;



   reset();

   gameLoop();

///////////////////////////////////////////////////////
   function gameLoop()
   {
        var FRAME_RATE = 10;
        var intervalTime = 1000/FRAME_RATE;

        input();
        paint();
        animate();
        window.setTimeout(gameLoop, intervalTime);
   }

   document.onkeydown = function(e){
      e = e?e:window.event;
      keyPressList[e.keyCode] = true;
   }

   document.onkeyup = function(e){
      e = e?e:window.event;
      keyPressList[e.keyCode] = false;
   };

///////////////////////////////////////////////////////
   function onMouseMove(e)
   {

   }
   function onMouseClick(e)
   {
          //code for mouse location
 //onmousemove = function(e){console.log("mouse location:",e.clientX , e.clientY)}
 const x = e.clientX -  (window.innerHeight-(window.innerHeight-430))
    const y = e.clientY - 20
    console.log("x: " + x + " y: " + y)
  //  drawSquare(35,575,95,1,1)
//drawSquare(1525,575,95,1,1)
if((x > 5 && x < 60 || x > -28 && x < -5) &&
  (y > window.innerHeight-441 && y <  window.innerHeight-380 || y > 550 && y < 605 || y > 475 && y < 540 ||  y > 550 && y < 605) ){
  console.log("left button clicked")
}
if((x > 1005 && x < 1060 || x > 1220 && x < 1265 || x > 1325 && x < 1380 || x > 1500 && x < 1545 || x > 855 && x < 910 ||  x > 1425 &&
   x < 1480 ||  x > 1250 && x < 1305  ||  x > 1045 && x < 1100)
 && (y > window.innerHeight-441 && y <  window.innerHeight-380 || y > 550 && y < 605 || y > 475 && y < 540 ||  y > 550 && y < 605) ){
  console.log("right button clicked")
}
//click to find mouse x and y pos (doesnt spam like onmouesmove variable)
//console.log(e.clientX + " " + e.clientY)
//



        }

   function input()
   {
// Tab:9 Enter:13 Space:32 0:48 A:65 a:97 Delete:127
       if (keyPressList[27]==true){
       //Escape
           reset();
       }

       if (keyPressList[37]==true) {
       //Left arrow
       }

       if (keyPressList[38]==true) {
       //Up arrow
       }

       if (keyPressList[39]==true) {
       //Right arrow
       }
       if (keyPressList[40]==true) {
       //Down arrow

       }
}

   function paint()
 {

 // draw table background
 context.fillStyle = '#186110';
 context.fillRect(0,0,theCanvas.width,260);
 context.strokeStyle = '#000000';
 context.strokeRect(0,0,theCanvas.width,260);
 //player and other players card placements (table)
 context.strokeRect(5,5,theCanvas.width/3,250);
 context.strokeRect(theCanvas.width/3+15,5,theCanvas.width/3,250);
 context.strokeRect(theCanvas.width/3*2+25,5,theCanvas.width/3,250);


 // draw players cards background
 context.fillStyle = '#305fb0';
 context.fillRect(0,505,theCanvas.width,220);

//players table placements
 context.fillStyle = '#ff0000';
 context.fillRect(0,275,theCanvas.width,220);

 //outline tables
 context.strokeStyle = '#000000';
 context.strokeRect(0,505,theCanvas.width,220);

 context.strokeRect(0,275,theCanvas.width,220);



 {
// player name display
 context.fillStyle = '#000000';
 context.font = '30px sans-serif';
 context.textBaseline = 'top';
 if(others.length>0)
 context.fillText (others[0].name, 10, 10);
 if(others.length>1)
 context.fillText (others[1].name, theCanvas.width/3+20, 10);
 if(others.length>2)
 context.fillText (others[2].name, theCanvas.width/3*2+30, 10);
 context.fillText ($("#nameset").val(), 10, 280);

 }




//175 px difference for cards x pos //card holder for players hand

 context.drawImage(tempCard1,110,510,150,200)
 context.drawImage(tempCard2,285,510,150,200)
 context.drawImage(tempCard3,460,510,150,200)

 //yellow outline
 context.lineWidth = 10
 context.strokeStyle = '#f5e342';
 context.strokeRect(720,510,150,200)
 //this postision is the wit the yellow box
 context.drawImage(tempCard4,720,510,150,200)


// context.drawImage(tempCard5,775,510,150,200)
 context.drawImage(tempCard6,950,510,150,200)
 context.drawImage(tempCard7,1125,510,150,200)
 context.drawImage(tempCard8,1300,510,150,200)

//other player card placements (left on table)
 context.lineWidth = 1
 context.drawImage(tempCard9,10,50,150, 200)
 context.drawImage(tempCard10,185,50, 150, 200)
 context.drawImage(tempCard11,360,50, 150,200)

//other player card placement (middle on table)
 context.drawImage(tempCard12,545,50, 150, 200)
 context.drawImage(tempCard13,720,50, 150, 200)
 context.drawImage(tempCard14,895,50, 150, 200)

 //other player card placement (right on table)
 context.drawImage(tempCard15,1080,50, 150, 200)
 context.drawImage(tempCard16,1240,50, 150, 200)
 context.drawImage(tempCard17,1400,50, 150, 200)

//players own placements table
 context.drawImage(tempCard18,545,285, 150, 200)
 context.drawImage(tempCard19,720,285, 150, 200)
 context.drawImage(tempCard20,895,285, 150, 200)

context.fillStyle = 'rgb(0,0,0,0.5)'
 context.fillRect(0,500,75,220)
  context.fillRect(1485,500,75,220)



drawSquare(35,575,95,1,1)
drawSquare(1525,575,95,1,1)

 context.restore();

 }
function drawSquare(xpos,ypos,rot,xscale,yscale){
 context.save();

context.translate(xpos, ypos);
context.rotate(rot);
context.beginPath();
      context.fillStyle = 'rgb(204,0,0,0.5)'
      context.strokeStyle = '#000000';
    context.rect(0,0,45,45);
    context.fill();
context.stroke();
context.restore();
}
   function reset()
   {

   }
   function animate()
   {
     if(shownHand[0]!=null)
         tempCard1.src = shownHand[0].image.replace('90x90', '225x225');
     else tempCard1.src = "/views/clear.png";
     if(shownHand[1]!=null)
         tempCard2.src = shownHand[1].image.replace('90x90', '225x225');
     else tempCard2.src = "/views/clear.png";
     if(shownHand[2]!=null)
         tempCard3.src = shownHand[2].image.replace('90x90', '225x225')
     else tempCard3.src = "/views/clear.png";
     if(shownHand[3]!=null)
         tempCard4.src = shownHand[3].image.replace('90x90', '225x225');
     else tempCard4.src = "/views/clear.png";
     if(shownHand[4]!=null)
         tempCard6.src = shownHand[4].image.replace('90x90', '225x225')
     else tempCard6.src = "/views/clear.png";
     if(shownHand[5]!=null)
         tempCard7.src = shownHand[5].image.replace('90x90', '225x225');
     else tempCard7.src = "/views/clear.png";
     if(shownHand[6]!=null)
         tempCard8.src = shownHand[6].image.replace('90x90', '225x225');
     else tempCard8.src = "/views/clear.png";
   }
////////////////////////////////////////////////////////
}
