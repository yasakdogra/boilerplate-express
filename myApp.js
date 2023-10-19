let express = require("express");
let app = express();
require("dotenv").config();

console.log("Hello World");

app.use("/public", express.static(__dirname + "/public"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/json", function (req, res) {
  var msg = "Hello json";
  if (process.env.MESSAGE_STYLE == "uppercase") msg = msg.toUpperCase();
  res.json({ message: msg });
});

module.exports = app;
