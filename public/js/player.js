// client js
function SendMessage(){
let chat = (document.getElementById("nameset").value + ": " + document.getElementById("sendMessage").value )
document.getElementById("chatbox").innerHTML +=  chat + "\n"
document.getElementById("sendMessage").value = ""
}
