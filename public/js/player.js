// client js
let pileNames = [];
let id = 1;
function SendMessage(){
    let chat = (document.getElementById("nameset").value + ": " + document.getElementById("sendMessage").value );
    $.post("/chat", {line:chat},function(data){
      document.getElementById("sendMessage").value = "";
    });
}
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
$(document).ready(function(){
    console.log("player ready");
    $.get("/player2", {index:1,id:id},sucessInfo);
});
window.addEventListener('beforeunload',function () {
    $.get("/checkplayer", {active:0,id:id},null);
});
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
            $('#pileButtons').append('<br class="pileButton"><input type ="button" class="pileButton" id = "">');
        }
        let x = 0;
        $('.pileButton').each(function(){
            if($(this).is("input")){
                $(this).val(pileNames[x]);
                $(this).attr( 'id',x.toString());
                //console.log($(this).attr("id"));
                x++;
            }
        });
        ////////////////////////////////////////////////////
    });
    let numMilliSeconds = 500;
    setTimeout(playerCheck, numMilliSeconds);
}
