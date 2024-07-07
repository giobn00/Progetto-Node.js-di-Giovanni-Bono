var express = require("express");
var productRouter = require("./product");
var userRouter = require("./user");
var orderRouter = require("./order");

var app = express();
app.use("/product/", productRouter);
app.use("/user/", userRouter);
app.use("/order/", orderRouter);

module.exports = app;