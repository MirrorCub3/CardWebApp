// client js
let myHand = [];
let id = 1;
let realId = 0;
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
        myHand.length = 0;
        myHand = data.cards;
        console.log("draw success");
        console.log(myHand);
    });
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////
function ToTable(){
    console.log("table");
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////
function Discard(){
    console.log("discard");
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

//queen cards
  let queenHearts =  "https://th.bing.com/th/id/R15e43a712ac44407d23c437b0a5b43bc?rik=owXOaoa1K9k1hw&riu=http%3a%2f%2fwww.madore.org%2f%7edavid%2fimages%2fcards%2fenglish%2fqueen-hearts.png&ehk=ObI7ptH3rqsbSRCMH%2baABEIOJXiXCpxbYjPJ%2bfvyigs%3d&risl=&pid=ImgRaw"

   let queenSpades =  "https://th.bing.com/th/id/R64fe3aaedd0cd7e7a89f15127bbcc3f4?rik=uHjybocezHLOsg&riu=http%3a%2f%2fwww.madore.org%2f%7edavid%2fimages%2fcards%2fenglish%2fqueen-spades.png&ehk=98N17z%2b9%2bJQjnFlxx%2fNp1451BP96G2RyebWPZ641fb4%3d&risl=&pid=ImgRaw"

        let queenDiamonds ="https://media.istockphoto.com/vectors/queen-of-diamonds-two-playing-card-vector-id165550320?k=6&m=165550320&s=170667a&w=0&h=Qs9vrg6z20th13aCt72gEsqY8PFq9JBH3eQAWAOEFv4="


        let queenClovers = "https://th.bing.com/th/id/OIP.kRVAc4rPj5Dq2HeRTsAiuQAAAA?pid=ImgDet&w=356&h=481&rs=1"


//king cards
         let kingHearts = "https://qph.fs.quoracdn.net/main-qimg-eab4b6397f96304924dee151db1d78a1"

   let kingSpades =  "https://th.bing.com/th/id/Rc08825396cc0a457adfe933afcd2b515?rik=VEmnORgCPTi5MA&riu=http%3a%2f%2fwww.madore.org%2f%7edavid%2fimages%2fcards%2fenglish%2fking-spades.png&ehk=nMaRQOyNn5V71Sc0qLYGxGiRWXi67KQrpvURsEUkQeU%3d&risl=&pid=ImgRaw"

        let kingDiamonds =  "https://th.bing.com/th/id/OIP._ChT7o4G-SsSV5zk5tJUygHaKA?pid=ImgDet&rs=1"


        let kingClovers = "https://upload.wikimedia.org/wikipedia/commons/3/39/Cardset1-ck.jpg"


        // jack cards

         let jackHearts = "https://allaboutcards.files.wordpress.com/2009/07/jack-hearts.png"

   let jackSpades = "https://th.bing.com/th/id/R5600c2f88cf8106a5d53b5ba5f6f0ca1?rik=P5sDGXK9WnzyLw&riu=http%3a%2f%2fallaboutcards.files.wordpress.com%2f2009%2f06%2fjack-spades.png&ehk=zvLTG6SkMke1i6a12zOJg2LFcKcyfkGrCjJMNkNQUMM%3d&risl=&pid=ImgRaw"

        let jackDiamonds = "https://th.bing.com/th/id/Rcd2d5407a68807233963c5fe6e87c2da?rik=mINesSveU0kxrQ&riu=http%3a%2f%2fwww.yourhandsucks.com%2fwp-content%2fuploads%2f2014%2f02%2fjack_of_diamonds2.png&ehk=i194EFY7k4QtwnFpTOvQelRl9E0g2sZQCLwljO9fa%2bA%3d&risl=&pid=ImgRaw"


        let jackClovers = "https://th.bing.com/th/id/R8d72b33a2f4a4e24ebe5eb41979a3ee1?rik=r8YSNp%2fDDRsPcA&riu=http%3a%2f%2fcdn.shopify.com%2fs%2ffiles%2f1%2f0011%2f1492%2ffiles%2fjack-clubs.png%3f1258321008&ehk=aS2OxBRrATo132UlmGaAjcwv0mO1cMw2%2fWout2n390Q%3d&risl=&pid=ImgRaw"

//Ace  cards
  let aceHearts =  "https://th.bing.com/th/id/R9ab1021cc4d3ae8b2d5bbdf65c924019?rik=diJyadqQvqRgtQ&riu=http%3a%2f%2fsweetclipart.com%2fmultisite%2fsweetclipart%2ffiles%2face_of_hearts.png&ehk=YS4UctL5mLoA6C3237TXuxrgVkZQfhN80idD0SS6510%3d&risl=&pid=ImgRaw"

   let aceSpades =  "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/01_of_spades_A.svg/1200px-01_of_spades_A.svg.png"

        let aceDiamonds = "https://th.bing.com/th/id/R877d6169a2cef1039254d86c250dc30f?rik=yCrhR6SMZL3%2fSQ&riu=http%3a%2f%2flauraewest.com%2fwp-content%2fuploads%2f2015%2f01%2fAce-Diamonds.jpg&ehk=uRDsTVxbuuMxdyoYtnpToISFAsmnrmT9zD9Kcqxgk88%3d&risl=&pid=ImgRaw"


        let aceClovers = "https://th.bing.com/th/id/Rc37d0aba07fd69eed1ca081d4f21efce?rik=BOcTHvfOcgJTGw&riu=http%3a%2f%2fwww.clipartbest.com%2fcliparts%2f9T4%2feaR%2f9T4eaRnrc.png&ehk=32aOXL31Fz0GKxnVimTBn337IzpCPuvtMmTVU8cpg%2fo%3d&risl=&pid=ImgRaw"

//2 cards
  let twoHearts = "https://cdn.pixabay.com/photo/2015/08/11/11/55/hearts-884150_960_720.png"

   let twoSpades  = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/2_of_spades.svg/530px-2_of_spades.svg.png"

        let twoDiamonds = "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/2_of_diamonds.svg/530px-2_of_diamonds.svg.png"


        let twoClover = "https://th.bing.com/th/id/Rbf40443285ae3387bf9968e8ea3eef40?rik=fJc%2fAwEDY%2f9wLQ&riu=http%3a%2f%2fusercontent2.hubimg.com%2f718461_f260.jpg&ehk=oK9o7%2fo3KHCLIVG4idg6aLD9fSdELZKKZQaqgQKIyY0%3d&risl=&pid=ImgRaw"

//3 cards
  let threeHearts =  "https://media.istockphoto.com/photos/three-of-hearts-playing-card-picture-id93429074?k=6&m=93429074&s=612x612&w=0&h=xykvZIJZ09XaXYDbw26mEyveJ9G6eukwJeSy9KpuuUM="

   let threeSpades =  "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Atlas_deck_3_of_spades.svg/682px-Atlas_deck_3_of_spades.svg.png"

        let threeDiamonds =  "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/3_of_diamonds.svg/706px-3_of_diamonds.svg.png"


        let threeClover = "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Playing_card_club_3.svg/819px-Playing_card_club_3.svg.png"

//4 cards
 let fourHearts =  "https://opengameart.org/sites/default/files/oga-textures/92832/hearts_4.png"

   let fourSpades =  "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/4_of_spades.svg/706px-4_of_spades.svg.png"

        let fourDiamonds = "https://th.bing.com/th/id/R84f8f1be745bbd9e25936a9b25bef44e?rik=aOZuQdpJQFTK3g&riu=http%3a%2f%2fi.dailymail.co.uk%2fi%2fpix%2f2013%2f08%2f23%2farticle-2400790-1B6C684D000005DC-307_306x423.jpg&ehk=8Qn4j1BRxoUa5HXH4ICih39Dqhv28h0hnmNgbm3%2fXBg%3d&risl=&pid=ImgRaw"


        let fourClover = "https://openclipart.org/image/2400px/svg_to_png/192923/1397958273.png"

//5 cards
 let fiveHearts =  "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/5_of_hearts.svg/706px-5_of_hearts.svg.png"

   let fiveSpades = "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/5_of_spades.svg/1200px-5_of_spades.svg.png"

        let fiveDiamonds = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Atlas_deck_5_of_diamonds.svg/682px-Atlas_deck_5_of_diamonds.svg.png"


        let fiveClover = "https://images.saymedia-content.com/.image/t_share/MTc2MjY4MzcwMzU3ODU1NDIy/playing-cards-clip-art.jpg"

//6 cards
let sixHearts =  "https://th.bing.com/th/id/R7a2e3f644a98b304abe29c1ed7a9cb51?rik=YL4AeOu%2fb%2fFxvA&riu=http%3a%2f%2fs2.hubimg.com%2fu%2f718491_f260.jpg&ehk=H9HCuAuiwZhWjuQQD%2bpqO2x9h0d9Gui2MlLbXho7IUs%3d&risl=&pid=ImgRaw"

   let sixSpades =  "https://th.bing.com/th/id/R2d2e504c8323abb9c032b6e919643614?rik=ZYcuDnptKjxS9Q&riu=http%3a%2f%2flauraewest.com%2fwp-content%2fuploads%2f2015%2f01%2fSave0007.jpg&ehk=lJf0uKCL9DD2kdOdV%2fYtv%2fjRmG6djvfgupvwqrhelvU%3d&risl=&pid=ImgRaw"

        let sixDiamonds =  "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/6D.svg/548px-6D.svg.png"


        let sixClover = "https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/6C.svg/428px-6C.svg.png"


//7 cards
let sevenHearts = "https://opengameart.org/sites/default/files/oga-textures/92832/hearts_7.png"

   let sevenSpades =  "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/7_of_spades.svg/1200px-7_of_spades.svg.png"

        let sevenDiamonds = "https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/7_of_diamonds.svg/706px-7_of_diamonds.svg.png"


        let sevenClover =  "https://th.bing.com/th/id/OIP.sy6fc4oHwOx42bIurAXuMQAAAA?pid=ImgDet&rs=1"

//8 cards
let eightHearts =  "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/8_of_hearts.svg/706px-8_of_hearts.svg.png"

   let eightSpades =  "https://th.bing.com/th/id/OIP.EVeEuFohZaxfOLyKVsfftQHaKv?pid=ImgDet&rs=1"

        let eightDiamonds = "https://th.bing.com/th/id/R8afee604213ca296067245ce18458af2?rik=MrIs8Up%2buv659Q&riu=http%3a%2f%2flivingwithcards.com%2fwp-content%2fuploads%2f2015%2f11%2f8_of_diamonds.png&ehk=htFU6W7YlpwxM5emDgGz0TTYislxaqDzg6uCG%2bQaReA%3d&risl=&pid=ImgRawg"


        let eightClover =  "https://th.bing.com/th/id/R126f2af5c775676a8d623d8e8c372c54?rik=t1nidW1U1DW2AQ&riu=http%3a%2f%2fwww.bjinsider.com%2fnewsletter_200_hands_Image183.gif&ehk=7Hm1EFDJQPc04oiLjO%2b%2bEfDyMZc2alzBANrGhtOaC8U%3d&risl=&pid=ImgRaw"

//9 cards
let nineHearts =  "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/9_of_hearts.svg/530px-9_of_hearts.svg.png"

   let nineSpades =  "https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/9_of_spades.svg/1200px-9_of_spades.svg.png"

        let nineDiamonds = "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/9_of_diamonds.svg/1200px-9_of_diamonds.svg.png"


        let nineClover = "https://i.pinimg.com/originals/85/87/33/858733c06bbad34fd862da7a3e7495a0.jpg"

        //10 cards
let tenHearts =  "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/10_of_hearts.svg/706px-10_of_hearts.svg.png"

   let tenSpades = "https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/10_of_spades.svg/1200px-10_of_spades.svg.png"

        let tenDiamonds =  "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/10_of_diamonds.svg/331px-10_of_diamonds.svg.png"


        let tenClover = "https://i.pinimg.com/736x/19/63/50/1963502749c024e1590789bab3632bc9.jpg"


//clear box that is replaced by cards whgen window is loaded so that i change the holding place image link instead of changing the acutal card's src/image

//these card holders are for the players hand (not on the table that shows others players card placements)
  let tempCard1 = new Image()
  tempCard1.src  =  "https://www.clker.com/cliparts/x/u/9/2/j/G/transparent-square-th.png"

    let tempCard2 = new Image()
  tempCard2.src  =  "https://www.clker.com/cliparts/x/u/9/2/j/G/transparent-square-th.png"

    let tempCard3 = new Image()
  tempCard3.src  =  "https://www.clker.com/cliparts/x/u/9/2/j/G/transparent-square-th.png"

    let tempCard4 = new Image()
  tempCard4.src  =  "https://www.clker.com/cliparts/x/u/9/2/j/G/transparent-square-th.png"

    let tempCard5 = new Image()
  tempCard5.src  =  "https://www.clker.com/cliparts/x/u/9/2/j/G/transparent-square-th.png"

    let tempCard6 = new Image()
  tempCard6.src  =  "https://www.clker.com/cliparts/x/u/9/2/j/G/transparent-square-th.png"

    let tempCard7 = new Image()
  tempCard7.src  =  "https://www.clker.com/cliparts/x/u/9/2/j/G/transparent-square-th.png"

    let tempCard8 = new Image()
  tempCard8.src  =  "https://www.clker.com/cliparts/x/u/9/2/j/G/transparent-square-th.png"


//card holders for other players  table (turn into arrays that are made in loops for sake of space??)
//left of table
    let tempCard9 = new Image()
  tempCard9.src  =  "https://www.clker.com/cliparts/x/u/9/2/j/G/transparent-square-th.png"

    let tempCard10 = new Image()
  tempCard10.src  =  "https://www.clker.com/cliparts/x/u/9/2/j/G/transparent-square-th.png"

    let tempCard11 = new Image()
  tempCard11.src  =  "https://www.clker.com/cliparts/x/u/9/2/j/G/transparent-square-th.png"

//middle of table
    let tempCard12 = new Image()
  tempCard12.src  =  "https://www.clker.com/cliparts/x/u/9/2/j/G/transparent-square-th.png"

    let tempCard13 = new Image()
  tempCard13.src  =  "https://www.clker.com/cliparts/x/u/9/2/j/G/transparent-square-th.png"

    let tempCard14 = new Image()
  tempCard14.src  =  "https://www.clker.com/cliparts/x/u/9/2/j/G/transparent-square-th.png"

//right of table
    let tempCard15 = new Image()
  tempCard15.src  =  "https://www.clker.com/cliparts/x/u/9/2/j/G/transparent-square-th.png"

    let tempCard16 = new Image()
  tempCard16.src  =  "https://www.clker.com/cliparts/x/u/9/2/j/G/transparent-square-th.png"

    let tempCard17 = new Image()
  tempCard17.src  =  "https://www.clker.com/cliparts/x/u/9/2/j/G/transparent-square-th.png"

  //players table
 let tempCard18 = new Image()
  tempCard18.src  =  "https://www.clker.com/cliparts/x/u/9/2/j/G/transparent-square-th.png"

    let tempCard19 = new Image()
  tempCard19.src  =  "https://www.clker.com/cliparts/x/u/9/2/j/G/transparent-square-th.png"

    let tempCard20 = new Image()
  tempCard20.src  =  "https://www.clker.com/cliparts/x/u/9/2/j/G/transparent-square-th.png"

//setting window width and height
 window.innerWidth = 1920
  window.innerHeight = 1015



window.addEventListener('load', eventWindowLoaded, false);
function eventWindowLoaded() {
   canvasApp();
   //change card holder to acutal card
   //players hand cards
        tempCard1.src = queenHearts.replace('90x90', '225x225');
        tempCard2.src = queenSpades.replace('90x90', '225x225');
        tempCard3.src = queenDiamonds.replace('90x90', '225x225')
        tempCard4.src = queenClovers.replace('90x90', '225x225');
        tempCard5.src = kingHearts.replace('90x90', '225x225');
        tempCard6.src = kingSpades.replace('90x90', '225x225')
        tempCard7.src = kingDiamonds.replace('90x90', '225x225');
        tempCard8.src = kingClovers.replace('90x90', '225x225');

//table cards (other players)
        tempCard9.src = jackHearts.replace('90x90', '225x225');
        tempCard10.src = jackSpades.replace('90x90', '225x225');
        tempCard11.src = jackDiamonds.replace('90x90', '225x225')
        tempCard12.src = jackClovers.replace('90x90', '225x225')
        tempCard13.src = aceHearts.replace('90x90', '225x225');
        tempCard14.src = aceSpades.replace('90x90', '225x225')
        tempCard15.src = aceDiamonds.replace('90x90', '225x225');
        tempCard16.src = aceClovers.replace('90x90', '225x225');
        tempCard17.src = twoHearts.replace('90x90', '225x225');

//table for player (not other players)
        tempCard18.src = twoClover.replace('90x90', '225x225');
        tempCard19.src = twoDiamonds.replace('90x90', '225x225');
        tempCard20.src = twoSpades.replace('90x90', '225x225');


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
      context.fillText  ("playerName", 10, 10);
      context.fillText  ("playerName", theCanvas.width/3+20, 10);
      context.fillText  ("playerName", theCanvas.width/3*2+30, 10);
      context.fillText  ("Table", 10, 280);

    }



//175 px difference for cards x pos //card holder for players hand

      context.drawImage(tempCard1,75,510,150,200)
      context.drawImage(tempCard2,250,510,150,200)
      context.drawImage(tempCard3,425,510,150,200)
      context.drawImage(tempCard4,600,510,150,200)
      context.drawImage(tempCard5,775,510,150,200)
      context.drawImage(tempCard6,950,510,150,200)
      context.drawImage(tempCard7,1125,510,150,200)
      context.drawImage(tempCard8,1300,510,150,200)

//other player card placements (left on table)
         context.drawImage(tempCard9,10,50,150,  200)
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

    context.restore();

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
