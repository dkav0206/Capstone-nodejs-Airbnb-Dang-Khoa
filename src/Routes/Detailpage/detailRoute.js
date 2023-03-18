const express = require("express");
const imageRoute = require("./imageRoute");
const commentRoute = require("./commentRoute");
const saveRoute = require("./saveRoute");

const detailRoute = express.Router();

detailRoute.use("/image", imageRoute);
detailRoute.use("/comment", commentRoute);
detailRoute.use("/save", saveRoute);

module.exports = detailRoute;

