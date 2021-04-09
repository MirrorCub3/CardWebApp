let express = require('express');
let path = require("path");
let app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static("./public"));

let playerCount = 0;
let playerSetNum = 1; // set this to the player num when game is created

app.get("/",function(req,res) {
    res.sendFile(path.resolve(__dirname,"index.html"));
});
app.get("/player",function(req,res) {
    if(playerCount >= playerSetNum){
        res.end("Error! Player Count Exceeded");}
    else{
        console.log(path.resolve(__dirname,"player.html"));
        res.sendFile(path.resolve(__dirname,"player.html"));
        playerCount += 1;
    }
});

// app.get("/typeCheck", function(req, res){
//     console.log("server typeCheck = " + calcType);
//
//     res.json({type:calcType});
// });
// app.get("/typeChange", function(req, res){
//     if (req.query.type == 'Area')
//     {
//         calcType = 0;
//     }
//     else
//     {
//         calcType = 1;
//     }
//     console.log("server typeChange = " + calcType);
//     res.json({});
// });
//
// app.get("/calculate", function(req, res){
//     console.log(req.query.len1 + " " + req.query.len2 + " " + req.query.shape);
//     if (calcType == 0)
//     {
//         if (req.query.shape == 'square')
//         {
//             let area = req.query.len1 * req.query.len1;
//             res.json({type:0,val:area});
//         }
//         else
//         {
//             let area = req.query.len1 * req.query.len2;
//             res.json({type:0,val:area});
//         }
//     }
//     else
//     {
//         if (req.query.shape == 'square')
//         {
//             let perim = 4*req.query.len1;
//             res.json({type:1,val:perim});
//         }
//         else
//         {
//             let perim = 2*(parseInt(req.query.len1) + parseInt(req.query.len2));
//             res.json({type:1,val:perim});
//         }
//     }
// });
app.listen(4005,function(){
    console.log("started on port 4005");
});
