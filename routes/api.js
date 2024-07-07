var express = require("express");
var productRouter = require("./product");
var userRouter = require("./user");

var app = express();
app.use("/product/", productRouter);
app.use("/user/", userRouter);

module.exports = app;