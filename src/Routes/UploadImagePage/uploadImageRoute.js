const express = require("express");
const imageRoute = require("./imageRoute");

const uploadImageRoute = express.Router();

uploadImageRoute.use("/image", imageRoute);

module.exports = uploadImageRoute;

