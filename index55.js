let express = require('express');
let path = require("path");
let app = express();
var bodyParser = require('body-parser');
var routes = require("./routes");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static("./public"));

app.use(routes);


app.listen(4055,function(){
    console.log("started on port " + 4055);
});
