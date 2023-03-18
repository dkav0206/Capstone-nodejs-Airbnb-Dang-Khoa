const express = require("express");
const { verifyToken } = require("../../config/jwt");
const { checkToken } = require("../../controllers/authController");
const imageRoute = express.Router();

const {getImage, getImagebyName} = require("../../controllers/imageController");

imageRoute.get("/getImage", checkToken, getImage);

imageRoute.get("/getImage/:name", checkToken, getImagebyName);

module.exports = imageRoute; 