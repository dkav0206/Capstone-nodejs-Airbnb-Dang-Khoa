const express = require("express");
const userRoute = require("./userRoute");
const imageRoute = require("./imageRoute");
const saveRoute = require("./saveRoute");

const imageSettingRoute = express.Router();

imageSettingRoute.use("/user", userRoute);
imageSettingRoute.use("/image", imageRoute);
imageSettingRoute.use("/save", saveRoute);

module.exports = imageSettingRoute;

