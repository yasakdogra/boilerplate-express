let express = require("express");
let app = express();
require("dotenv").config();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));

console.log("Hello World");

app.use(function (req, res, next) {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

app.use("/public", express.static(__dirname + "/public"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/json", function (req, res) {
  var msg = "Hello json";
  if (process.env.MESSAGE_STYLE == "uppercase") msg = msg.toUpperCase();
  res.json({ message: msg });
});

app.get(
  "/now",
  function (req, res, next) {
    req.time = new Date().toString();
    next();
  },
  function (req, res) {
    res.json({ time: req.time });
  },
);

app.get("/:word/echo", function (req, res) {
  res.json({ echo: req.params.word });
});

app
  .route("/name")
  .get(function (req, res) {
    res.json({ name: `${req.query.first} ${req.query.last}` });
  })
  .post(function (req, res) {
    res.json({ name: `${req.body.first} ${req.body.last}` });
  });

module.exports = app;
