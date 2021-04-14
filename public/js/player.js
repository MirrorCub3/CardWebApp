// client js
let pileNames = [];
let id = 1;
function SendMessage(){
    let chat = (document.getElementById("nameset").value + ": " + document.getElementById("sendMessage").value );
    $.post("/chat", {line:chat},function(data){
      document.getElementById("sendMessage").value = "";
    });
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////
function SendTo(element){
    let elementId = element.id;
    let name = element.value.substring(8,element.value.length); // solely the name of the pile not the whole send to line
    console.log(name);
    $.post("/sendto", {id:elementId, name:name},function(data){
      if(!data)
          return;
    });
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////
function sucessInfo(data){
    if(!data)
        return;
    id = data.id;
    pileNames.length = 0;
    for(let i = 0; i< data.pilenames.length; i++){
        pileNames[i] = data.pilenames[i];
    }
    document.getElementById("nameset").value = "Player " + id;
    document.getElementById("playerId").innerHTML = "PLAYER " + id;
    document.getElementById("gameName").innerHTML = data.gamename;
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////
$(document).ready(function(){
    console.log("player ready");
    $.get("/player2", {index:1,id:id},sucessInfo);
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////
window.addEventListener('beforeunload',function () {
    $.get("/checkplayer", {active:0,id:id},null);
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////
playerCheck();
function playerCheck() {
    $.get("/checkplayer", {active:1,id:id},function(data){
        document.getElementById("gameName").innerHTML = data.gamename;
        document.getElementById("chatbox").innerHTML = "";
        for(let i = 0; i < data.chat.length;i++){
            document.getElementById("chatbox").innerHTML +=  data.chat[i] + "\n";
        }
        ////////////////////////////////////////////////////
        $(".pileButton").remove(); // clears buttons
        pileNames.length = 0;
        for(let i = 0; i< data.pilenames.length; i++){
            pileNames[i] = data.pilenames[i];
            $('#pileButtons').append('<br class="pileButton"><input type ="button" class="pileButton" id = "" onClick = "SendTo(this)">');
        }
        let x = 0;
        $('.pileButton').each(function(){
            if($(this).is("input")){
                $(this).val("Send To " + pileNames[x]);
                $(this).attr( 'id',x.toString());
                x++;
            }
        });
        ////////////////////////////////////////////////////
    });
    let numMilliSeconds = 500;
    setTimeout(playerCheck, numMilliSeconds);
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////// canvas code
/*
let queenHearts = new Image()
        queenHearts.src = "https://th.bing.com/th/id/R15e43a712ac44407d23c437b0a5b43bc?rik=owXOaoa1K9k1hw&riu=http%3a%2f%2fwww.madore.org%2f%7edavid%2fimages%2fcards%2fenglish%2fqueen-hearts.png&ehk=ObI7ptH3rqsbSRCMH%2baABEIOJXiXCpxbYjPJ%2bfvyigs%3d&risl=&pid=ImgRaw"

   let queenSpades = new Image()
        queenSpades.src = "https://th.bing.com/th/id/R64fe3aaedd0cd7e7a89f15127bbcc3f4?rik=uHjybocezHLOsg&riu=http%3a%2f%2fwww.madore.org%2f%7edavid%2fimages%2fcards%2fenglish%2fqueen-spades.png&ehk=98N17z%2b9%2bJQjnFlxx%2fNp1451BP96G2RyebWPZ641fb4%3d&risl=&pid=ImgRaw"

        let queenDiamonds = new Image()
        queenDiamonds.src = "https://media.istockphoto.com/vectors/queen-of-diamonds-two-playing-card-vector-id165550320?k=6&m=165550320&s=170667a&w=0&h=Qs9vrg6z20th13aCt72gEsqY8PFq9JBH3eQAWAOEFv4="
      //  drawTriangle(triangleXpos,triangleYpos,0,-0.4,-0.4);
//     drawTriangle(triangle2Xpos,triangle2Ypos,0,0.4,0.4);

let xpos = 300
//let triangleXpos = 110
//let triangle2Xpos = 1230

//let triangleYpos = windowHeight-630
//let triangle2Ypos = windowHeight-630

window.addEventListener('load', eventWindowLoaded, false);


function eventWindowLoaded() {
   canvasApp();
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
 window.innerWidth = 1920
  window.innerHeight = 970
   let  windowWidth =  window.innerWidth
   let windowHeight =  window.innerHeight
theCanvas.width =  windowWidth-360
theCanvas.height = windowHeight-300
theCanvas.style.left =  windowHeight-(windowHeight-350) + "px"



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
//console.log(window.innerWidth) //1366
//console.log(window.innerHeight) //657
          //code for mouse location
// onmousemove = function(e){console.log("mouse location:",e.clientX , e.clientY)}
    if (e.clientX  < triangleXpos &&
             e.clientX  >triangleXpos-35 &&
             e.clientY < triangleYpos+35 &&
              e.clientY >  triangleYpos-35){
             console.log(" left arrow clicked")
              //change images
                var pic = "http://img.tesco.com/Groceries/pi/118/5000175411118/IDShot_90x90.jpg"
        queenHearts.src = pic.replace('90x90', '225x225');


          }

          if (e.clientX  < triangle2Xpos+35 &&
             e.clientX  >triangle2Xpos &&
             e.clientY < triangle2Ypos+35 &&
              e.clientY >  triangle2Ypos-35){
             console.log(" right arrow clicked")
              //change images


          }
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
    context.fillRect(0,0,theCanvas.width,theCanvas.height-340);
    context.strokeStyle = '#000000';
    context.strokeRect(0, 0,theCanvas.width,theCanvas.height-340);

     // draw players cards background
    context.fillStyle = '#305fb0';
        context.fillRect(0,theCanvas.height-320,theCanvas.width,theCanvas.height-260);
    context.strokeStyle = '#000000';
  context.strokeRect(0,theCanvas.height-320,theCanvas.width,theCanvas.height-260);



    {
//other player name display
     // context.fillStyle = '#000000';
   //   context.font = '30px sans-serif';
 //     context.textBaseline = 'top';
    //  context.fillText  ("playerName", 700, 125);
      // context.fillText  ("playerName", 350, 125);
       // context.fillText  ("playerName", 1130, 125);
        // context.fillText  ("playerName", 350, 375);
         //   context.fillText  ("playerName", 1130, 375);
    }

               drawTriangle(50,windowHeight-435,0,-0.4,-0.4); //leeft arrow
            drawTriangle(windowWidth-415,windowHeight-470,0,0.4,0.4); //right arrow


            //  context.drawImage(queenHearts,125,430, 150, 200)
             // context.drawImage(queenSpades,300,430, 150, 200)
              //  context.drawImage(queenDiamonds,475,430, 150, 200)




    context.restore();

   }

   function drawCircle(xpos,ypos,rot,xscale,yscale)
   {
        context.save(); //save current state in stack
        context.setTransform(1,0,0,1,0,0);

        context.translate(xpos,ypos);
        context.rotate(rot);
        context.scale(xscale,yscale);
        context.fillStyle = "rgb(0,0,0)";

         context.beginPath();
         context.arc(0,0,4,0,Math.PI*2,true);
         context.closePath();
         context.fill();


        context.restore(); //pop old state on to screen
   }


function drawTriangle( xpos, ypos,rot, xscale,yscale)
    {

        context.save(); //save current state in stack
        context.setTransform(1,0,0,1,0,0);

        context.translate(xpos,ypos);
        context.rotate(rot);
        context.scale(xscale,yscale);
        context.fillStyle = "rgb(0,0,0)";

         context.beginPath();
    context.moveTo(0, 0);
    context.lineTo(90,50);
    context.lineTo(0, 90);
         context.closePath();
         context.fill();


        context.restore();
    }


   function reset()
   {

   }
   function animate()
   {

   }
////////////////////////////////////////////////////////
}
*/
