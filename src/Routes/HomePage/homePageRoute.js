const express = require("express");
const imageRoute = require("./imageRoute");

const homePageRoute = express.Router();

homePageRoute.use("/image", imageRoute);

module.exports = homePageRoute;

