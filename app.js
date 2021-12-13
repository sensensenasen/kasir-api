var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
require("dotenv").config();
var cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger_output.json");

// var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var doorRouter = require("./routes/door");
var productsRouter = require("./routes/products");

var app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// app.use("/", indexRouter);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use("/users", usersRouter);
app.use("/gate", doorRouter);
app.use("/products", productsRouter);
app.use("/uploads", express.static("./uploads"));

module.exports = app;
