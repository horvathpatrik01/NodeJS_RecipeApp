const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
var app = express();

app.set("view engine", "ejs");

app.use(
  session({
    secret: "keyboard cat",
    cookie: {
      maxAge: 60000,
    },
    resave: true,
    saveUninitialized: false,
  })
);

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

app.use(express.static("static"));

// Load routing
require("./route/index")(app);

app.use((err, req, res, next) => {
  res.end("Problem...");
  console.log(err);
});

var server = app.listen(3000, () => {
  console.log("On :3000");
});
