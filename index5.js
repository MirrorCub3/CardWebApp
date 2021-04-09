let express = require('express');
let path = require("path");
let app = express();
let playerCount = 0;

app.get("/",function(req,res) {
    res.sendFile(path.resolve(__dirname,"index.html"));
});
app.get("/player",function(req,res) {
    res.sendFile(path.resolve(__dirname,"player.html"));
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
app.listen(3000,function() {
    console.log("started on port 3000");
});
