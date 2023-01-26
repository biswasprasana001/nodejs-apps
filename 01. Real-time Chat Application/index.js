var express = require("express");
// express app instance
var app = express();
// port set to 3700
var port = process.env.PORT || 3700;

// views folder is set
app.set("views", __dirname + "/views");
// jade as view engine is set
app.set("view engine", "pug");
// jade view engine is set for this app
app.engine("pug", require("pug").__express);
// page.jade will be accessed via '/'
app.get("/", function (req, res) {
  res.render("page");
});

// use our public/chat.js file as listener
// serves all files in public as static files that can be accessed by client
app.use(express.static(__dirname + "/public"));
// midPort server starts listening and displays the msg
var midPort = app.listen(port, function () {
  console.log("Node.js listening on port " + port);
});

//socket.io is required & listens for socket connections on midport server
var io = require("socket.io").listen(midPort);
// The function passed to the method is executed every time a new client connects
io.sockets.on("connection", function (socket) {
  socket.emit("message", { message: "Welcome to the Real Time Web Chat" });
  //  When it receives the 'send' event, it performs a function which emits the message
  socket.on("send", function (data) {
    io.sockets.emit("message", data);
  });
});
