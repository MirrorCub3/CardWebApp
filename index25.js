let express = require('express');
let path = require("path");
let app = express();
var bodyParser = require('body-parser');
var routes = require("./routes");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static("./public"));

app.use(routes);


app.listen(4025,function(){
<<<<<<< HEAD
    console.log("started on port 4025");
=======
    console.log("started on port " + 4025);
>>>>>>> 1e933e0c4577eea1baa7539526f8eedd261bf229
});
