//get libraries 
const express = require('express');
const path = require('path');

//create Express web-app
var app = express();
var router = express.Router();

app.use(express.static("public"));
app.use("/modules", express.static(path.join(__dirname, "/node_modules")));
//app.use("scripts", express.static(path.join(__dirname, "/controllers")))
app.use('/truffle', express.static(path.join(__dirname, '/build/contracts')));
app.set("view engine", "ejs");
app.set("views", "./views");

var server = require('http').Server(app);

var io = require('socket.io')(server);

server.listen(8000);

app.get("/home", function(req, res) {
    res.render("home");
});