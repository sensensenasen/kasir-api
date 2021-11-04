var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
require("dotenv").config();
var cors = require("cors");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
// var logsRouter = require("./routes/logs");
// var atmRouter = require("./routes/atm");
// var resetRouter = require("./routes/reset");

var app = express();

app.use(cors);
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
// app.use("/logs", logsRouter);
// app.use("/atm", atmRouter);
// app.use("/reset", resetRouter);

module.exports = app;
