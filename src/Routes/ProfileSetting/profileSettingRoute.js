const express = require("express");
const userRoute = require("./userRoute");
const profileSettingRoute = express.Router();

profileSettingRoute.use("/user", userRoute);

module.exports = profileSettingRoute;

